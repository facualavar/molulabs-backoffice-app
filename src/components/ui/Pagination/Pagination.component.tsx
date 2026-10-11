import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Box, Button, Text } from '@/components/ui';

interface PaginationProps {
    currentPage: number;
    disabled?: boolean;
    onPageChange: (page: number) => void;
    totalItems: number;
    totalPages: number;
}

export const Pagination = ({
    currentPage,
    disabled,
    onPageChange,
    totalItems,
    totalPages
}: PaginationProps) => {
    if (totalItems === 0) return null;

    return (
        <Box alignItems="center" display="flex" gap="4" paddingTop="4">
            <Button
                disabled={disabled || currentPage <= 1}
                icon={<ChevronLeft size={16} />}
                label="Página anterior"
                onClick={() => onPageChange(currentPage - 1)}
                size="xs"
                type="button"
                variant="secondary"
            />
            <Text color="text" style={{ fontSize: '13px', opacity: 0.65 }} variant="caption">
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
    );
};
