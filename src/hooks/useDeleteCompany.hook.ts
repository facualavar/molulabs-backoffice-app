import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteCompany } from '@/services/company.service';

export const useDeleteCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        }
    });
};
