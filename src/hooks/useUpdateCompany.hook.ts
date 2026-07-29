import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CompanyPayload } from '@/services/company.service';
import { updateCompany } from '@/services/company.service';

interface UpdateCompanyVariables {
    id: number;
    payload: CompanyPayload;
}

export const useUpdateCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: UpdateCompanyVariables) => updateCompany(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['companies'] });
        }
    });
};
