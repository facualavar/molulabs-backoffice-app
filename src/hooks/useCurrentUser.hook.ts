import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import type { AppStore } from '@/store/domain/models/store.model';

import { getCurrentUser } from '@/services/user.service';

export const useCurrentUser = () => {
    const isAuthenticated = useSelector((state: AppStore) => state.auth.isAuthenticated);

    return useQuery({
        enabled: isAuthenticated,
        queryFn: getCurrentUser,
        queryKey: ['currentUser']
    });
};
