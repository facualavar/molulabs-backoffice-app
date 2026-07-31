import { useState } from 'react';

import { css } from 'styled-system/css';

import { useCreateCompanyExport, useDownloadExportFile, useExportJob } from '@/hooks';

import { Box, Button, Text } from '@/components/ui';

import { EXPORT_STATUS } from '@/domain/models/export.model';

const exportButtonClass = css({ fontSize: 'sm' });

interface CompaniesExportProps {
    name?: string;
}

export const CompaniesExport = ({ name }: CompaniesExportProps) => {
    const [jobId, setJobId] = useState<null | number>(null);
    const { isPending: isCreating, mutate: createExport } = useCreateCompanyExport();
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

        createExport({ name }, { onSuccess: (data) => setJobId(data.id) });
    };

    const label = isReady ? 'Descargar archivo' : isPreparing ? 'Exportando...' : 'Exportar';

    return (
        <Box>
            <Button
                className={exportButtonClass}
                data-testid="companies-export-action-export"
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
