export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationMeta;
}

export interface PaginationMeta {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
}
