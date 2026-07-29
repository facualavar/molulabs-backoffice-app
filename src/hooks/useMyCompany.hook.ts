import { useQuery } from '@tanstack/react-query';

import { getMyCompany } from '@/services/company.service';

export const useMyCompany = () =>
    useQuery({
        queryFn: getMyCompany,
        queryKey: ['myCompany']
    });
