import { useQuery } from '@tanstack/react-query';

import { getUsers } from '@/services/user.service';

export const useUsers = () =>
    useQuery({
        queryFn: getUsers,
        queryKey: ['users']
    });
