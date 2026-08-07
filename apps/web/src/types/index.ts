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
