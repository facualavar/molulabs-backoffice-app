import { api } from '@/infrastructure/interceptors/api.interceptor';

import type { PaginatedResponse } from '@/domain/models/pagination.model';
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

export interface UpdatePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

export const updatePassword = async (payload: UpdatePasswordPayload): Promise<void> => {
    await api.put('/profile/password', payload);
};

export interface UserListParams {
    limit?: number;
    name?: string;
    page?: number;
    role?: string;
}

export interface UserPayload {
    companyId: null | number;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    role: string;
}

export const getUsers = async (params: UserListParams = {}): Promise<PaginatedResponse<User>> => {
    const { data } = await api.get<PaginatedResponse<User>>('/users', { params });

    return data;
};

export const getUser = async (id: number): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);

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
