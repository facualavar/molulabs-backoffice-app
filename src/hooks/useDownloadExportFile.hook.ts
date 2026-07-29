import { useMutation } from '@tanstack/react-query';

import { downloadExportFile } from '@/services/export.service';

import { triggerBlobDownload } from '@/shared/utilities/download.utility';

interface DownloadExportFileParams {
    filename: string;
    id: number;
}

export const useDownloadExportFile = () =>
    useMutation({
        mutationFn: async ({ filename, id }: DownloadExportFileParams) => {
            const blob = await downloadExportFile(id);

            triggerBlobDownload(blob, filename);
        }
    });
