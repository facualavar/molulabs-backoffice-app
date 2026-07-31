import { useMutation } from '@tanstack/react-query';

import { exportCompanies } from '@/services/company.service';

export const useCreateCompanyExport = () => useMutation({ mutationFn: exportCompanies });
