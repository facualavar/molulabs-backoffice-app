import type { LoginFormValues } from '@/pages/Login/components/LoginForm/LoginForm.schema';

import { api } from '@/infrastructure/interceptors/api.interceptor';

import type { Auth } from '@/domain/models/auth.model';

interface LoginApiResponse {
    refresh_token: string;
    token: string;
}

export const login = async (credentials: LoginFormValues): Promise<Auth> => {
    const { data } = await api.post<LoginApiResponse>('/login', {
        email: credentials.email,
        password: credentials.contrasena
    });

    return { refreshToken: data.refresh_token, token: data.token };
};
