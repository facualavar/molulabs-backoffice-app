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
    PROFILE: '/profile',
    USERS: '/users',
    USERS_EDIT: '/users/:id/edit',
    USERS_NEW: '/users/new'
} as const;

export const ROLES_ROUTES: Record<string, Array<string>> = {
    [PRIVATE_ROUTES.COMPANIES]: [SUPERADMIN_ROLE],
    [PRIVATE_ROUTES.HOME]: [USER_ROLE.ADMIN, USER_ROLE.USER],
    [PRIVATE_ROUTES.PROFILE]: [USER_ROLE.ADMIN, USER_ROLE.USER],
    [PRIVATE_ROUTES.USERS]: [USER_ROLE.ADMIN, SUPERADMIN_ROLE]
};
