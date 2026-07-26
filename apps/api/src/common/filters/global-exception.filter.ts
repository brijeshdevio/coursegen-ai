import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

import { ERROR_CODES } from '../constants';
import { apiErrorResponse } from '../helpers/api-response.helper';

const PRISMA_ERROR_MAP: Record<
  string,
  { statusCode: number; errorCode: string; message: string }
> = {
  P2025: {
    statusCode: 404,
    errorCode: ERROR_CODES.NOT_FOUND,
    message: 'The requested resource was not found',
  },
  P2002: {
    statusCode: 409,
    errorCode: ERROR_CODES.CONFLICT,
    message: 'A unique constraint was violated',
  },
  P2003: {
    statusCode: 400,
    errorCode: ERROR_CODES.BAD_REQUEST,
    message: 'Foreign key constraint failed',
  },
  P2014: {
    statusCode: 409,
    errorCode: ERROR_CODES.CONFLICT,
    message: 'Required relation violation',
  },
  P2015: {
    statusCode: 404,
    errorCode: ERROR_CODES.NOT_FOUND,
    message: 'A related record could not be found',
  },
};

/**
 * Global exception filter that catches all exceptions and formats them consistently
 * Handles NestJS HTTP exceptions, Prisma errors, and unexpected errors
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let statusCode = 500;
    let errorCode = ERROR_CODES.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';
    let errors: { [key: string]: { message: string } } | undefined;

    // Handle NestJS HTTP Exception
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse() as any;

      message = exceptionResponse.message || exception.message;
      errorCode =
        exceptionResponse.code || exceptionResponse.error || 'HTTP_ERROR';
      errors = exceptionResponse.errors;

      this.logException(request, statusCode, errorCode, message, exception);

      return response.status(statusCode).json(
        apiErrorResponse({
          message,
          statusCode,
          code: errorCode,
        }),
      );
    }

    // Handle Prisma Known Request Error
    if (exception instanceof PrismaClientKnownRequestError) {
      const prismaError = PRISMA_ERROR_MAP[exception.code];

      if (prismaError) {
        statusCode = prismaError.statusCode;
        message = prismaError.message;
      } else {
        // Unknown Prisma error - log it
        this.logger.error(
          `Unknown Prisma error code: ${exception.code}`,
          exception,
          { request: this.sanitizeRequest(request) },
        );
      }

      this.logException(request, statusCode, errorCode, message, exception);

      return response.status(statusCode).json(
        apiErrorResponse({
          message,
          statusCode,
          code: errorCode,
        }),
      );
    }

    // Handle regular Error objects
    if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack, {
        request: this.sanitizeRequest(request),
      });
    } else {
      // Unknown exception type
      this.logger.error('Unknown exception type', String(exception), {
        request: this.sanitizeRequest(request),
      });
    }

    // Return generic error response in production
    response.status(statusCode).json(
      apiErrorResponse({
        message,
        statusCode,
        code: errorCode,
      }),
    );
  }

  /**
   * Logs exception details appropriately based on environment
   */
  private logException(
    request: any,
    statusCode: number,
    errorCode: string,
    message: string,
    exception: unknown,
  ): void {
    const logContext = {
      method: request.method,
      path: request.path,
      statusCode,
      errorCode,
      message,
      timestamp: new Date().toISOString(),
    };

    if (statusCode >= 500) {
      this.logger.error(
        `[${errorCode}] ${message}`,
        exception instanceof Error ? exception.stack : String(exception),
        logContext,
      );
    } else if (statusCode >= 400) {
      this.logger.warn(`[${errorCode}] ${message}`, logContext);
    }
  }

  /**
   * Removes sensitive information from request for logging
   */
  private sanitizeRequest(request: any): object {
    return {
      method: request.method,
      path: request.path,
      ip: request.ip,
      userAgent: request.get('user-agent'),
    };
  }
}
