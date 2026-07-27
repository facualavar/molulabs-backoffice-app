import { api } from '@/infrastructure/interceptors/api.interceptor';

import type { CurrentUser } from '@/domain/models/user.model';

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
