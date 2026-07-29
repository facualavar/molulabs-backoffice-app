import { useMutation } from '@tanstack/react-query';

import { exportUsers } from '@/services/user.service';

export const useCreateUserExport = () => useMutation({ mutationFn: exportUsers });
