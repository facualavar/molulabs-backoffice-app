import { useState } from 'react';

import { css } from 'styled-system/css';

import { useCreateUserExport, useDownloadExportFile, useExportJob } from '@/hooks';

import { Box, Button, Text } from '@/components/ui';

import { EXPORT_STATUS } from '@/domain/models/export.model';

const exportButtonClass = css({ fontSize: 'sm' });

interface UsersExportProps {
    name?: string;
    role?: string;
}

export const UsersExport = ({ name, role }: UsersExportProps) => {
    const [jobId, setJobId] = useState<null | number>(null);
    const { isPending: isCreating, mutate: createExport } = useCreateUserExport();
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

        createExport({ name, role }, { onSuccess: (data) => setJobId(data.id) });
    };

    const label = isReady ? 'Descargar archivo' : isPreparing ? 'Exportando...' : 'Exportar';

    return (
        <Box>
            <Button
                className={exportButtonClass}
                data-testid="users-export-action-export"
                disabled={isPreparing || isDownloading}
                label={label}
                loading={isPreparing}
                onClick={handleClick}
                variant="secondary"
            />
            {isFailed ? (
                <Text style={{ marginTop: '0.5rem' }} variant="error">
                    No se pudo generar el archivo. Intentá nuevamente.
                </Text>
            ) : null}
        </Box>
    );
};
