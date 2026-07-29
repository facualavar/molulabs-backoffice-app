import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMyCompany } from '@/services/company.service';

export const useUpdateMyCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateMyCompany,
        onSuccess: (data) => {
            queryClient.setQueryData(['myCompany'], data);
        }
    });
};
