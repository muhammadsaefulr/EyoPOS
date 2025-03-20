export type PaginationTypes = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
}

export type BaseApiResponse<T> = {
  message: string;
  data: T;
  pagination?: PaginationTypes;
};