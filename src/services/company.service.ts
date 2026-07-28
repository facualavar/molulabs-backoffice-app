import { api } from '@/infrastructure/interceptors/api.interceptor';

import type { Company } from '@/domain/models/company.model';

export const getCompanies = async (): Promise<Company[]> => {
    const { data } = await api.get<Company[]>('/companies');

    return data;
};
