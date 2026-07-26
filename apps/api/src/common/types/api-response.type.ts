export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?:
    | T
    | {
        item: T;
        meta: {
          total: number;
          page: number;
          limit: number;
          pageSize: number;
        };
      };
  statusCode?: number;
  error?: {
    code: string;
    errors?: { [key: string]: { message: string } };
  };
};
