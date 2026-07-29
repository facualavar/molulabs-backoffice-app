import type { LoginFormValues } from '@/pages/Login/components/LoginForm/LoginForm.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { login, logout } from '@/services/auth.service';

import type { Auth } from '@/domain/models/auth.model';
import type { SerializableError } from '@/domain/models/error.model';
import { toSerializableError } from '@/domain/models/error.model';

import {
    clearAllStorage,
    getRefreshToken,
    getToken,
    saveTokens
} from '@/shared/utilities/storage.utility';

export const hydrateAuthThunk = createAsyncThunk('auth/hydrate', async () => getToken());

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
        try {
            await logout(refreshToken);
        } catch {
            // Ignore backend errors, the local session is cleared regardless.
        }
    }

    clearAllStorage();
});

export const loginThunk = createAsyncThunk<
    Auth,
    LoginFormValues,
    { rejectValue: SerializableError }
>('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const auth = await login(credentials);
        saveTokens(auth, credentials.rememberMe ? 'local' : 'session');
        return auth;
    } catch (error) {
        return rejectWithValue(toSerializableError(error));
    }
});
