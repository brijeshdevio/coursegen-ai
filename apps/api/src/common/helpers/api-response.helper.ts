import { ApiResponse } from '../types';

export const apiSuccessResponse = <T>({
  message,
  data,
}: {
  message?: string;
  data?: T;
}): ApiResponse<T> => ({
  success: true,
  message,
  data,
  statusCode: 200,
});

export const apiErrorResponse = ({
  message,
  code,
  statusCode,
  errors,
}: {
  message?: string;
  code: string;
  statusCode: number;
  errors?: { [key: string]: { message: string } };
}): ApiResponse<never> => ({
  success: false,
  message,
  statusCode,
  error: { code, errors },
});
