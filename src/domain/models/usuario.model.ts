export const USER_ROLE = {
    ADMIN: 'ROLE_ADMIN',
    USER: 'ROLE_USER'
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface Usuario {
    email: string;
    firstname: string;
    id: number;
    lastname: string;
    roles: Array<UserRole>;
}
