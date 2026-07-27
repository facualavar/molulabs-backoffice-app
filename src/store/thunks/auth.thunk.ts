import type { LoginFormValues } from '@/pages/Login/components/LoginForm/LoginForm.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { login } from '@/services/auth.service';

import type { Auth } from '@/domain/models/auth.model';
import type { SerializableError } from '@/domain/models/error.model';
import { toSerializableError } from '@/domain/models/error.model';

import { getToken, saveTokens } from '@/shared/utilities/storage.utility';

export const hydrateAuthThunk = createAsyncThunk('auth/hydrate', async () => getToken());

export const loginThunk = createAsyncThunk<
    Auth,
    LoginFormValues,
    { rejectValue: SerializableError }
>('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const auth = await login(credentials);
        saveTokens(auth, credentials.recordar ? 'local' : 'session');
        return auth;
    } catch (error) {
        return rejectWithValue(toSerializableError(error));
    }
});
