import { SUPERADMIN_ROLE, USER_ROLE } from '@/domain/models/usuario.model';

export const EXCLUDED_AUTH_URL: Array<string> = ['/login', '/auth/refresh'];

export const PUBLIC_ROUTES = {
    LOGIN: '/login'
} as const;

export const PRIVATE_ROUTES = {
    COMPANIES: '/companies',
    COMPANIES_EDIT: '/companies/:id/edit',
    COMPANIES_NEW: '/companies/new',
    HOME: '/',
    MY_COMPANY: '/my-company',
    PROFILE: '/profile',
    PROFILE_PASSWORD: '/profile/password',
    USERS: '/users',
    USERS_EDIT: '/users/:id/edit',
    USERS_NEW: '/users/new'
} as const;

export const ROLES_ROUTES: Record<string, Array<string>> = {
    [PRIVATE_ROUTES.COMPANIES]: [SUPERADMIN_ROLE],
    [PRIVATE_ROUTES.COMPANIES_EDIT]: [SUPERADMIN_ROLE],
    [PRIVATE_ROUTES.COMPANIES_NEW]: [SUPERADMIN_ROLE],
    [PRIVATE_ROUTES.HOME]: [SUPERADMIN_ROLE, USER_ROLE.ADMIN],
    [PRIVATE_ROUTES.MY_COMPANY]: [USER_ROLE.ADMIN],
    [PRIVATE_ROUTES.PROFILE]: [SUPERADMIN_ROLE, USER_ROLE.ADMIN, USER_ROLE.USER],
    [PRIVATE_ROUTES.PROFILE_PASSWORD]: [SUPERADMIN_ROLE, USER_ROLE.ADMIN, USER_ROLE.USER],
    [PRIVATE_ROUTES.USERS]: [SUPERADMIN_ROLE, USER_ROLE.ADMIN],
    [PRIVATE_ROUTES.USERS_EDIT]: [SUPERADMIN_ROLE, USER_ROLE.ADMIN],
    [PRIVATE_ROUTES.USERS_NEW]: [SUPERADMIN_ROLE, USER_ROLE.ADMIN]
};
