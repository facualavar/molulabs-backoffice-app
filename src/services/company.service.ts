import { api } from '@/infrastructure/interceptors/api.interceptor';

import type { Company } from '@/domain/models/company.model';
import type { ExportJob } from '@/domain/models/export.model';
import type { PaginatedResponse } from '@/domain/models/pagination.model';

export interface CompanyExportParams {
    name?: string;
}

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

export const exportCompanies = async (params: CompanyExportParams = {}): Promise<ExportJob> => {
    const { data } = await api.post<ExportJob>('/companies/export', null, { params });

    return data;
};

export const getCompany = async (id: number): Promise<Company> => {
    const { data } = await api.get<Company>(`/companies/${id}`);

    return data;
};

export interface CompanyPayload {
    documentNumber: string;
    documentType: string;
    email: string;
    name: string;
    phone: string;
}

export const createCompany = async (payload: CompanyPayload): Promise<Company> => {
    const { data } = await api.post<Company>('/companies', payload);

    return data;
};

export const updateCompany = async (id: number, payload: CompanyPayload): Promise<Company> => {
    const { data } = await api.put<Company>(`/companies/${id}?XDEBUG_TRIGGER=1`, payload);

    return data;
};

export const deleteCompany = async (id: number): Promise<void> => {
    await api.delete(`/companies/${id}`);
};

export const getMyCompany = async (): Promise<Company> => {
    const { data } = await api.get<Company>('/profile/company');

    return data;
};

export const updateMyCompany = async (payload: CompanyPayload): Promise<Company> => {
    const { data } = await api.put<Company>('/profile/company', payload);

    return data;
};
