import { AxiosError } from "axios";
import { toast } from "sonner";

type ApiError = {
  success: boolean;
  message: string;
  statusCode: number;
  error?: {
    code: string;
    errors?: Record<
      string,
      {
        message: string;
      }
    >;
  };
};

export function notifyError(error: unknown) {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiError | undefined;

    // Validation errors
    if (data?.error?.errors) {
      Object.values(data.error.errors).forEach((err) => {
        toast.error(err.message);
      });
      return;
    }

    // API message
    if (data?.message) {
      toast.error(data.message);
      return;
    }
  }

  // Fallback
  toast.error("Something went wrong.");
}
