import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { hydrateAuthThunk, loginThunk } from '@/store/thunks/auth.thunk';

import type { SerializableError } from '@/domain/models/error.model';

export interface AuthState {
    hydrated: boolean;
    isAuthenticated: boolean;
    loginError: null | SerializableError;
    loginLoading: boolean;
    token: null | string;
}

export const EmptyAuthState: AuthState = {
    hydrated: false,
    isAuthenticated: false,
    loginError: null,
    loginLoading: false,
    token: null
};

const authSlice = createSlice({
    extraReducers: (builder) => {
        builder
            .addCase(hydrateAuthThunk.fulfilled, (state, action) => {
                state.isAuthenticated = Boolean(action.payload);
                state.token = action.payload;
                state.hydrated = true;
            })
            .addCase(hydrateAuthThunk.rejected, (state) => {
                state.hydrated = true;
            })
            .addCase(loginThunk.pending, (state) => {
                state.loginLoading = true;
                state.loginError = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loginLoading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loginLoading = false;
                state.loginError = action.payload ?? { message: 'Ocurrió un error inesperado' };
            });
    },
    initialState: EmptyAuthState,
    name: 'auth',
    reducers: {
        markAuthenticated: (state, action: PayloadAction<{ token: string }>) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
        },
        resetAuth: () => EmptyAuthState,
        updateAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
            Object.assign(state, action.payload);
        }
    }
});

export const { markAuthenticated, resetAuth, updateAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
