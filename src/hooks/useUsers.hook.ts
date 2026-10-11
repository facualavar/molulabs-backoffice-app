import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { UserListParams } from '@/services/user.service';
import { getUsers } from '@/services/user.service';

export const useUsers = (params: UserListParams = {}, enabled = true) =>
    useQuery({
        enabled,
        placeholderData: keepPreviousData,
        queryFn: () => getUsers(params),
        queryKey: ['users', params]
    });
