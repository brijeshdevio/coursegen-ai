import {
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import type { ZodSchema } from 'zod';

import { ERROR_CODES } from '../constants';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const formattedErrors = result.error.issues.reduce<
        Record<string, { message: string }>
      >((acc, err) => {
        const field = err.path.join('.');

        acc[field] = {
          message: err.message,
        };

        return acc;
      }, {});

      throw new BadRequestException({
        success: false,
        message: 'Validation failed',
        statusCode: 400,
        error: {
          code: ERROR_CODES.BAD_REQUEST,
          errors: formattedErrors,
        },
      });
    }

    return result.data;
  }
}
