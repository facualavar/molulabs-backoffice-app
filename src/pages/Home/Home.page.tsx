import { Navigate } from 'react-router';

import { useCurrentUser } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { USER_ROLE } from '@/domain/models/usuario.model';

export const HomePage = () => {
    const { data: currentUser, isLoading } = useCurrentUser();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (currentUser?.role === USER_ROLE.USER) {
        return <Navigate replace to={PRIVATE_ROUTES.PROFILE} />;
    }

    return <div>Inicio</div>;
};
