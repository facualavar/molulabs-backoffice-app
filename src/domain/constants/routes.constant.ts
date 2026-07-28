import type { UserRole } from '@/domain/models/usuario.model';
import { USER_ROLE } from '@/domain/models/usuario.model';

export const EXCLUDED_AUTH_URL: Array<string> = ['/login', '/auth/refresh'];

export const PUBLIC_ROUTES = {
    LOGIN: '/login'
} as const;

export const PRIVATE_ROUTES = {
    HOME: '/',
    PROFILE: '/profile',
    USERS: '/users',
    USERS_EDIT: '/users/:id/edit',
    USERS_NEW: '/users/new'
} as const;

export const ROLES_ROUTES: Record<string, Array<UserRole>> = {
    [PRIVATE_ROUTES.HOME]: [USER_ROLE.ADMIN, USER_ROLE.USER],
    [PRIVATE_ROUTES.PROFILE]: [USER_ROLE.ADMIN, USER_ROLE.USER],
    [PRIVATE_ROUTES.USERS]: [USER_ROLE.ADMIN]
};
