import type { ReactNode } from 'react';

import { NotFoundPage } from '@/pages/NotFound';

import { useCurrentUser } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';

interface RoleRouteProps {
    children: ReactNode;
    roles: string[];
}

export const RoleRoute = ({ children, roles }: RoleRouteProps) => {
    const { data: currentUser, isLoading } = useCurrentUser();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!currentUser || !roles.includes(currentUser.role)) {
        return <NotFoundPage />;
    }

    return children;
};
