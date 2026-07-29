import { api } from '@/infrastructure/interceptors/api.interceptor';

import type { ExportJob } from '@/domain/models/export.model';

export const getExportJob = async (id: number): Promise<ExportJob> => {
    const { data } = await api.get<ExportJob>(`/exports/${id}`);

    return data;
};

export const downloadExportFile = async (id: number): Promise<Blob> => {
    const { data } = await api.get<Blob>(`/exports/${id}/download`, { responseType: 'blob' });

    return data;
};
