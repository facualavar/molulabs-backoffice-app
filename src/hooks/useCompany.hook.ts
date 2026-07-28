import { useQuery } from '@tanstack/react-query';

import { getCompany } from '@/services/company.service';

export const useCompany = (id: number) =>
    useQuery({
        enabled: Number.isFinite(id),
        queryFn: () => getCompany(id),
        queryKey: ['companies', id]
    });
