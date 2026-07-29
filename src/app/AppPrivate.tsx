import { CompaniesPage, CompanyCreatePage, CompanyEditPage } from '@/pages/Companies';
import { ProfilePage } from '@/pages/Profile';
import { UserCreatePage, UserEditPage, UsersPage } from '@/pages/Users';
import { Route, Routes } from 'react-router';

import { AppLayout } from '@/layouts/AppLayout';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';

export const AppPrivate = () => (
    <Routes>
        <Route element={<AppLayout />}>
            <Route element={<ProfilePage />} path={PRIVATE_ROUTES.PROFILE} />
            <Route element={<CompaniesPage />} path={PRIVATE_ROUTES.COMPANIES} />
            <Route element={<CompanyCreatePage />} path={PRIVATE_ROUTES.COMPANIES_NEW} />
            <Route element={<CompanyEditPage />} path={PRIVATE_ROUTES.COMPANIES_EDIT} />
            <Route element={<UsersPage />} path={PRIVATE_ROUTES.USERS} />
            <Route element={<UserCreatePage />} path={PRIVATE_ROUTES.USERS_NEW} />
            <Route element={<UserEditPage />} path={PRIVATE_ROUTES.USERS_EDIT} />
            <Route element={<div>Inicio</div>} path="*" />
        </Route>
    </Routes>
);
