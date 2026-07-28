import { useQuery } from '@tanstack/react-query';

import { getUser } from '@/services/user.service';

export const useUser = (id: number) =>
    useQuery({
        enabled: Number.isFinite(id),
        queryFn: () => getUser(id),
        queryKey: ['users', id]
    });
