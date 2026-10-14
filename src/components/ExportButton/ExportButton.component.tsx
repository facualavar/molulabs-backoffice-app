import { useState } from 'react';

import { Button } from '@molulabs/ds';
import { useMutation } from '@tanstack/react-query';

import { useDownloadExportFile, useExportJob } from '@/hooks';

import { Box, Text } from '@/components/ui';

import type { ExportJob } from '@/domain/models/export.model';
import { EXPORT_STATUS } from '@/domain/models/export.model';

interface ExportButtonProps {
    'data-testid': string;
    /** Starts the export job with the list's current filters */
    onExport: () => Promise<ExportJob>;
}

// Export button of a table toolbar: starts the job, waits for the file and then offers to download it.
// Give it a key built from the filters so a filter change drops a file made with the old ones.
export const ExportButton = ({ 'data-testid': testId, onExport }: ExportButtonProps) => {
    const [jobId, setJobId] = useState<null | number>(null);
    const { isPending: isCreating, mutate: createExport } = useMutation({ mutationFn: onExport });
    const { data: job } = useExportJob(jobId);
    const { isPending: isDownloading, mutate: downloadFile } = useDownloadExportFile();

    const status = job?.status;
    const isPreparing =
        isCreating || status === EXPORT_STATUS.PENDING || status === EXPORT_STATUS.PROCESSING;
    const isReady = status === EXPORT_STATUS.READY;
    const isFailed = status === EXPORT_STATUS.FAILED;

    const handleClick = () => {
        if (isReady && job) {
            downloadFile({ filename: `${job.type}.xlsx`, id: job.id });
            setJobId(null);
            return;
        }

        createExport(undefined, { onSuccess: (data) => setJobId(data.id) });
    };

    const label = isReady ? 'Descargar archivo' : isPreparing ? 'Exportando...' : 'Exportar';

    return (
        <Box>
            <Button
                data-testid={testId}
                disabled={isPreparing || isDownloading}
                icon={isReady ? 'ti-file-download' : 'ti-download'}
                onClick={handleClick}
                size="sm"
                tone="secondary"
            >
                {label}
            </Button>
            {isFailed ? (
                <Text style={{ marginTop: '0.5rem' }} variant="error">
                    No se pudo generar el archivo. Intentá nuevamente.
                </Text>
            ) : null}
        </Box>
    );
};
