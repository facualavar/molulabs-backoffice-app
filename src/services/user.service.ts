import { api } from '@/infrastructure/interceptors/api.interceptor';

import type { CurrentUser, User } from '@/domain/models/user.model';

export const getCurrentUser = async (): Promise<CurrentUser> => {
    const { data } = await api.get<CurrentUser>('/me');

    return data;
};

export interface UpdateProfilePayload {
    email: string;
    firstname: string;
    lastname: string;
}

export const updateProfile = async (payload: UpdateProfilePayload): Promise<CurrentUser> => {
    const { data } = await api.put<CurrentUser>('/profile', payload);

    return data;
};

export interface UserPayload {
    companyId: number;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    role: string;
}

export const getUsers = async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');

    return data;
};

export const createUser = async (payload: UserPayload): Promise<User> => {
    const { data } = await api.post<User>('/users', payload);

    return data;
};

export const updateUser = async (id: number, payload: UserPayload): Promise<User> => {
    const { data } = await api.put<User>(`/users/${id}`, payload);

    return data;
};

export const deleteUser = async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
};
