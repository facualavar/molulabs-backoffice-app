import { useQuery } from '@tanstack/react-query';

import { getProfile } from '@/services/user.service';

export const useProfile = () =>
    useQuery({
        queryFn: getProfile,
        queryKey: ['profile']
    });
