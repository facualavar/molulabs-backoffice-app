export const USER_ROLE = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const USER_ROLE_LABEL: Record<string, string> = {
    ROLE_ADMIN: 'Administrador',
    ROLE_SUPERADMIN: 'Superadmin',
    ROLE_USER: 'Usuario'
};

export const SUPERADMIN_ROLE = 'ROLE_SUPERADMIN';

export interface Usuario {
    email: string;
    firstname: string;
    id: number;
    lastname: string;
    roles: Array<UserRole>;
}
