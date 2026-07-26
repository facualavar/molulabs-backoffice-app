import type { ReactNode } from 'react';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import type { AppStore } from '@/store/domain/models/store.model';
import { selectIsAuthenticated } from '@/store/selectors/auth.selector';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const isAuthenticated = useSelector((state: AppStore) => selectIsAuthenticated(state));

    if (!isAuthenticated) {
        return <Navigate replace to="/login" />;
    }

    return children;
};
