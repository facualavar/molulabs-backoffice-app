import type { Auth } from '@/domain/models/auth.model';

export type StorageType = 'local' | 'session';

const TOKEN_KEY = 'backoffice_token';
const REFRESH_TOKEN_KEY = 'backoffice_refresh_token';

const getStorageInstance = (type: StorageType): Storage =>
    type === 'local' ? localStorage : sessionStorage;

export const getToken = (): null | string =>
    localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY);

export const getRefreshToken = (): null | string =>
    localStorage.getItem(REFRESH_TOKEN_KEY) ?? sessionStorage.getItem(REFRESH_TOKEN_KEY);

export const detectStorageType = (): StorageType =>
    localStorage.getItem(TOKEN_KEY) ? 'local' : 'session';

export const clearAllStorage = (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const saveTokens = (data: Auth, type: StorageType): void => {
    clearAllStorage();
    const storage = getStorageInstance(type);
    storage.setItem(TOKEN_KEY, data.token);
    storage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
};
