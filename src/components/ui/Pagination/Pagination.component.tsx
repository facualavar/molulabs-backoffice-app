import { Pagination as DsPagination } from '@molulabs/ds';

import { DEFAULT_ITEMS_PER_PAGE } from '@/domain/constants/pagination.constant';

interface PaginationProps {
    currentPage: number;
    /** Blocks page changes while the next page is being fetched */
    disabled?: boolean;
    onPageChange: (page: number) => void;
    pageSize?: number;
    totalItems: number;
}

// Pager under a DataTable, inside the same Card
export const Pagination = ({
    currentPage,
    disabled,
    onPageChange,
    pageSize = DEFAULT_ITEMS_PER_PAGE,
    totalItems
}: PaginationProps) => {
    if (totalItems === 0) return null;

    return (
        <DsPagination
            onPage={onPageChange}
            page={currentPage}
            pageSize={pageSize}
            style={disabled ? { opacity: 0.6, pointerEvents: 'none' } : undefined}
            total={totalItems}
        />
    );
};
