import type { GetUserMe } from "@/features/user/user.types";

export type ListParams = {
  page?: number;
  limit?: number;
  search?: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type AuthCTX = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: GetUserMe | null;
};
