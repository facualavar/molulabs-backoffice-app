import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Box, Button, Text } from '@/components/ui';

interface PaginationProps {
    currentPage: number;
    disabled?: boolean;
    onPageChange: (page: number) => void;
    resultsPerPage: number;
    totalItems: number;
    totalPages: number;
}

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
                <Button
                    disabled={disabled || currentPage <= 1}
                    icon={<ChevronLeft size={16} />}
                    label="Página anterior"
                    onClick={() => onPageChange(currentPage - 1)}
                    size="xs"
                    type="button"
                    variant="secondary"
                />
                <Text variant="caption">
                    Página {currentPage} de {totalPages}
                </Text>
                <Button
                    disabled={disabled || currentPage >= totalPages}
                    icon={<ChevronRight size={16} />}
                    label="Página siguiente"
                    onClick={() => onPageChange(currentPage + 1)}
                    size="xs"
                    type="button"
                    variant="secondary"
                />
            </Box>
        </Box>
    );
};
