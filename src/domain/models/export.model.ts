export const EXPORT_STATUS = {
    FAILED: 'failed',
    PENDING: 'pending',
    PROCESSING: 'processing',
    READY: 'ready'
} as const;

export interface ExportJob {
    completedAt: null | string;
    createdAt: string;
    errorMessage: null | string;
    id: number;
    status: ExportStatusValue;
    type: string;
}

export type ExportStatusValue = (typeof EXPORT_STATUS)[keyof typeof EXPORT_STATUS];
