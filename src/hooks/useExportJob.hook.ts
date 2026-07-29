import { useQuery } from '@tanstack/react-query';

import { getExportJob } from '@/services/export.service';

import { EXPORT_STATUS } from '@/domain/models/export.model';

const POLL_INTERVAL_MS = 1500;

export const useExportJob = (jobId: null | number) =>
    useQuery({
        enabled: jobId !== null,
        queryFn: () => getExportJob(jobId as number),
        queryKey: ['exportJob', jobId],
        refetchInterval: (query) => {
            const status = query.state.data?.status;

            return status === EXPORT_STATUS.READY || status === EXPORT_STATUS.FAILED
                ? false
                : POLL_INTERVAL_MS;
        }
    });
