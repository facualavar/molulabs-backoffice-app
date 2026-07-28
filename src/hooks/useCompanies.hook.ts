import { useQuery } from '@tanstack/react-query';

import { getCompanies } from '@/services/company.service';

export const useCompanies = () =>
    useQuery({
        queryFn: getCompanies,
        queryKey: ['companies']
    });
