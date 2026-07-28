import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { CompanyListParams } from '@/services/company.service';
import { getCompanies } from '@/services/company.service';

export const useCompanies = (params: CompanyListParams = {}, enabled = true) =>
    useQuery({
        enabled,
        placeholderData: keepPreviousData,
        queryFn: () => getCompanies(params),
        queryKey: ['companies', params]
    });
