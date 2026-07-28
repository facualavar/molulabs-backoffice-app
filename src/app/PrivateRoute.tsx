import type { ReactNode } from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import type { AppStore } from '@/store/domain/models/store.model';
import { selectAuthHydrated, selectIsAuthenticated } from '@/store/selectors/auth.selector';

import { LoadingScreen } from '@/components/LoadingScreen';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = useSelector((state: AppStore) => selectIsAuthenticated(state));
    const hydrated = useSelector((state: AppStore) => selectAuthHydrated(state));

    if (!hydrated) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return <Navigate replace to="/login" />;
    }

    return children;
};
