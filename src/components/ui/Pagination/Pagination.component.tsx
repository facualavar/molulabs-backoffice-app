import { ChevronLeft, ChevronRight } from 'lucide-react';
import { css } from 'styled-system/css';

import { Box, Text } from '@/components/ui';

interface PaginationProps {
    currentPage: number;
    disabled?: boolean;
    onPageChange: (page: number) => void;
    resultsPerPage: number;
    totalItems: number;
    totalPages: number;
}

const buttonClass = css({
    _disabled: { cursor: 'not-allowed', opacity: 0.4 },
    alignItems: 'center',
    background: 'none',
    border: '1px solid',
    borderColor: 'border',
    borderRadius: 'md',
    color: 'text',
    cursor: 'pointer',
    display: 'flex',
    padding: '1'
});

export const Pagination = ({
    currentPage,
    disabled,
    onPageChange,
    resultsPerPage,
    totalItems,
    totalPages
}: PaginationProps) => {
    if (totalItems === 0) return null;

    const firstItem = (currentPage - 1) * resultsPerPage + 1;
    const lastItem = Math.min(currentPage * resultsPerPage, totalItems);

    return (
        <Box alignItems="center" display="flex" justifyContent="space-between" paddingTop="4">
            <Text variant="caption">
                {firstItem}–{lastItem} de {totalItems}
            </Text>
            <Box alignItems="center" display="flex" gap="3">
                <button
                    aria-label="Página anterior"
                    className={buttonClass}
                    disabled={disabled || currentPage <= 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    type="button"
                >
                    <ChevronLeft size={16} />
                </button>
                <Text variant="caption">
                    Página {currentPage} de {totalPages}
                </Text>
                <button
                    aria-label="Página siguiente"
                    className={buttonClass}
                    disabled={disabled || currentPage >= totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    type="button"
                >
                    <ChevronRight size={16} />
                </button>
            </Box>
        </Box>
    );
};
