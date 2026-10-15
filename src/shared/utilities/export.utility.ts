import type { ExportJob } from '@/domain/models/export.model';

import { formatFileDate } from './date.utility';

const EXPORT_FILE_LABELS: Record<string, string> = {
    companies: 'empresas',
    users: 'usuarios'
};

/** The name the user sees when saving an export, e.g. usuarios_2026-10-15.xlsx */
export const getExportFilename = ({
    createdAt,
    type
}: Pick<ExportJob, 'createdAt' | 'type'>): string =>
    `${EXPORT_FILE_LABELS[type] ?? type}_${formatFileDate(createdAt)}.xlsx`;
