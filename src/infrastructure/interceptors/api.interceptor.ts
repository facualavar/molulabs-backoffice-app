import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { EXCLUDED_AUTH_URL } from '@/domain/constants/routes.constant';
import { ErrorResponse } from '@/domain/models/error.model';

import {
    clearAllStorage,
    detectStorageType,
    getRefreshToken,
    getToken,
    saveTokens
} from '@/shared/utilities/storage.utility';

interface ApiErrorBody {
    detail?: string;
    errors?: ApiFieldError[];
    message?: string;
}

interface ApiFieldError {
    field: string;
    message: string;
}

const toFieldsRecord = (errors?: ApiFieldError[]): Record<string, string> | undefined =>
    errors?.reduce<Record<string, string>>((fields, { field, message }) => {
        fields[field] = message;

        return fields;
    }, {});

interface RetryableConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

export const api = axios.create({
    baseURL: import.meta.env.BACKOFFICE_API_URL,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
    const isExcluded = EXCLUDED_AUTH_URL.some((url) => config.url?.includes(url));
    const token = getToken();

    if (!isExcluded && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

const refreshAccessToken = async (): Promise<string> => {
    const { data } = await axios.post<{ refreshToken: string; token: string }>(
        `${import.meta.env.BACKOFFICE_API_URL}/token/refresh`,
        { refreshToken: getRefreshToken() }
    );

    saveTokens(data, detectStorageType());

    return data.token;
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiErrorBody>) => {
        const config = error.config as RetryableConfig | undefined;
        const status = error.response?.status;
        const isExcluded = EXCLUDED_AUTH_URL.some((url) => config?.url?.includes(url));

        if (config && !isExcluded && (status === 401 || status === 403) && !config._retry) {
            config._retry = true;

            try {
                const token = await refreshAccessToken();
                config.headers.Authorization = `Bearer ${token}`;
                return api(config);
            } catch {
                clearAllStorage();
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }

        const body = error.response?.data;

        return Promise.reject(
            new ErrorResponse(
                body?.message ?? body?.detail ?? error.message,
                status,
                toFieldsRecord(body?.errors)
            )
        );
    }
);
