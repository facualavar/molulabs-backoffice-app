import { api } from '@/infrastructure/interceptors/api.interceptor';

import type { Company } from '@/domain/models/company.model';
import type { PaginatedResponse } from '@/domain/models/pagination.model';

export interface CompanyListParams {
    limit?: number;
    name?: string;
    page?: number;
}

export const getCompanies = async (
    params: CompanyListParams = {}
): Promise<PaginatedResponse<Company>> => {
    const { data } = await api.get<PaginatedResponse<Company>>('/companies', { params });

    return data;
};

export const getCompany = async (id: number): Promise<Company> => {
    const { data } = await api.get<Company>(`/companies/${id}`);

    return data;
};
