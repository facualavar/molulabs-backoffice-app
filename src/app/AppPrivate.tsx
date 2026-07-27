import { ProfilePage } from '@/pages/Profile';
import { Route, Routes } from 'react-router';

import { AppLayout } from '@/layouts/AppLayout';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';

export const AppPrivate = () => (
    <Routes>
        <Route element={<AppLayout />}>
            <Route element={<ProfilePage />} path={PRIVATE_ROUTES.PROFILE} />
            <Route element={<div>Inicio</div>} path="*" />
        </Route>
    </Routes>
);
