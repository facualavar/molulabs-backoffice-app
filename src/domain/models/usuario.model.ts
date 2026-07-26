export const USER_ROLE = {
    ADMIN: 'ADMIN',
    OPERADOR: 'OPERADOR'
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface Usuario {
    apellido: string;
    email: string;
    id: number;
    nombre: string;
    roles: Array<UserRole>;
}
