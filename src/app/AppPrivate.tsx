import { CompaniesPage, CompanyCreatePage, CompanyEditPage } from '@/pages/Companies';
import { HomePage } from '@/pages/Home';
import { MyCompanyPage } from '@/pages/MyCompany';
import { NotFoundPage } from '@/pages/NotFound';
import { ChangePasswordPage, ProfilePage } from '@/pages/Profile';
import { UserCreatePage, UserEditPage, UsersPage } from '@/pages/Users';
import { Route, Routes } from 'react-router';

import { RoleRoute } from '@/app/RoleRoute';

import { AppLayout } from '@/layouts/AppLayout';

import { PRIVATE_ROUTES, ROLES_ROUTES } from '@/domain/constants/routes.constant';

export const AppPrivate = () => (
    <Routes>
        <Route element={<AppLayout />}>
            <Route element={<HomePage />} path={PRIVATE_ROUTES.HOME} />
            <Route element={<ProfilePage />} path={PRIVATE_ROUTES.PROFILE} />
            <Route element={<ChangePasswordPage />} path={PRIVATE_ROUTES.PROFILE_PASSWORD} />
            <Route
                element={
                    <RoleRoute roles={ROLES_ROUTES[PRIVATE_ROUTES.COMPANIES]}>
                        <CompaniesPage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.COMPANIES}
            />
            <Route
                element={
                    <RoleRoute roles={ROLES_ROUTES[PRIVATE_ROUTES.COMPANIES_NEW]}>
                        <CompanyCreatePage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.COMPANIES_NEW}
            />
            <Route
                element={
                    <RoleRoute roles={ROLES_ROUTES[PRIVATE_ROUTES.COMPANIES_EDIT]}>
                        <CompanyEditPage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.COMPANIES_EDIT}
            />
            <Route
                element={
                    <RoleRoute roles={ROLES_ROUTES[PRIVATE_ROUTES.USERS]}>
                        <UsersPage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.USERS}
            />
            <Route
                element={
                    <RoleRoute roles={ROLES_ROUTES[PRIVATE_ROUTES.USERS_NEW]}>
                        <UserCreatePage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.USERS_NEW}
            />
            <Route
                element={
                    <RoleRoute roles={ROLES_ROUTES[PRIVATE_ROUTES.USERS_EDIT]}>
                        <UserEditPage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.USERS_EDIT}
            />
            <Route
                element={
                    <RoleRoute roles={ROLES_ROUTES[PRIVATE_ROUTES.MY_COMPANY]}>
                        <MyCompanyPage />
                    </RoleRoute>
                }
                path={PRIVATE_ROUTES.MY_COMPANY}
            />
            <Route element={<NotFoundPage />} path="*" />
        </Route>
    </Routes>
);
