import { HttpException, HttpStatus } from '@nestjs/common';

import { ERROR_CODES, ErrorCode } from '../constants';

/**
 * Base custom exception class for all application exceptions
 */
export class AppException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, statusCode: HttpStatus) {
    super(
      {
        statusCode,
        errorCode,
        message,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}

/**
 * Exception thrown when a requested resource is not found
 */
export class ResourceNotFoundException extends AppException {
  constructor(resourceName: string) {
    super(
      `${resourceName} not found`,
      ERROR_CODES.NOT_FOUND,
      HttpStatus.NOT_FOUND,
    );
  }
}

/**
 * Exception thrown when a resource already exists
 */
export class ResourceConflictException extends AppException {
  constructor(resourceName: string, identifier: string = '') {
    const message = identifier
      ? `${resourceName} with ${identifier} already exists`
      : `${resourceName} already exists`;

    super(message, ERROR_CODES.CONFLICT, HttpStatus.CONFLICT);
  }
}

/**
 * Exception thrown when authentication fails
 */
export class AuthenticationException extends AppException {
  constructor(message = 'Authentication failed') {
    super(message, ERROR_CODES.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}

/**
 * Exception thrown when user lacks required permissions
 */
export class AuthorizationException extends AppException {
  constructor(message = 'Insufficient permissions') {
    super(message, ERROR_CODES.FORBIDDEN, HttpStatus.FORBIDDEN);
  }
}

/**
 * Exception thrown when request data is invalid
 */
export class ValidationException extends AppException {
  constructor(
    message: string,
    public readonly errors?: Record<string, string[]>,
  ) {
    super(message, ERROR_CODES.VALIDATION_ERROR, HttpStatus.BAD_REQUEST);
  }
}

/**
 * Exception thrown for malformed requests
 */
export class BadRequestException extends AppException {
  constructor(message: string) {
    super(message, ERROR_CODES.BAD_REQUEST, HttpStatus.BAD_REQUEST);
  }
}

/**
 * Exception thrown when business logic validation fails
 */
export class UnprocessableEntityException extends AppException {
  constructor(message: string) {
    super(
      message,
      ERROR_CODES.UNPROCESSABLE_ENTITY,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

/**
 * Exception thrown when a service is temporarily unavailable
 */
export class ServiceUnavailableException extends AppException {
  constructor(serviceName: string = 'Service') {
    super(
      `${serviceName} is temporarily unavailable`,
      ERROR_CODES.SERVICE_UNAVAILABLE,
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}

/**
 * Exception thrown for unexpected server errors
 */
export class InternalServerException extends AppException {
  constructor(message = 'An unexpected error occurred') {
    super(
      message,
      ERROR_CODES.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
