import { CompaniesPage, CompanyCreatePage, CompanyEditPage } from '@/pages/Companies';
import { MyCompanyPage } from '@/pages/MyCompany';
import { NotFoundPage } from '@/pages/NotFound';
import { ChangePasswordPage, ProfilePage } from '@/pages/Profile';
import { UserCreatePage, UserEditPage, UsersPage } from '@/pages/Users';
import { Route, Routes } from 'react-router';

import { RoleRoute } from '@/app/RoleRoute';

import { AppLayout } from '@/layouts/AppLayout';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { SUPERADMIN_ROLE, USER_ROLE } from '@/domain/models/usuario.model';

const ADMIN_ROLES = [USER_ROLE.ADMIN, SUPERADMIN_ROLE];

export const AppPrivate = () => (
    <Routes>
        <Route element={<AppLayout />}>
            <Route element={<div>Inicio</div>} path={PRIVATE_ROUTES.HOME} />
            <Route element={<ProfilePage />} path={PRIVATE_ROUTES.PROFILE} />
            <Route element={<ChangePasswordPage />} path={PRIVATE_ROUTES.PROFILE_PASSWORD} />
            <Route
                element={
                    <RoleRoute roles={[SUPERADMIN_ROLE]}>
                        <CompaniesPage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.COMPANIES}
            />
            <Route
                element={
                    <RoleRoute roles={[SUPERADMIN_ROLE]}>
                        <CompanyCreatePage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.COMPANIES_NEW}
            />
            <Route
                element={
                    <RoleRoute roles={[SUPERADMIN_ROLE]}>
                        <CompanyEditPage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.COMPANIES_EDIT}
            />
            <Route
                element={
                    <RoleRoute roles={ADMIN_ROLES}>
                        <UsersPage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.USERS}
            />
            <Route
                element={
                    <RoleRoute roles={ADMIN_ROLES}>
                        <UserCreatePage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.USERS_NEW}
            />
            <Route
                element={
                    <RoleRoute roles={ADMIN_ROLES}>
                        <UserEditPage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.USERS_EDIT}
            />
            <Route
                element={
                    <RoleRoute roles={ADMIN_ROLES}>
                        <MyCompanyPage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.MY_COMPANY}
            />
            <Route element={<NotFoundPage />} path="*" />
        </Route>
    </Routes>
);
