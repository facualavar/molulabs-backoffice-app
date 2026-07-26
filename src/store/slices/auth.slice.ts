import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { hydrateAuthThunk } from '@/store/thunks/auth.thunk';

export interface AuthState {
    hydrated: boolean;
    isAuthenticated: boolean;
    token: null | string;
}

export const EmptyAuthState: AuthState = {
    hydrated: false,
    isAuthenticated: false,
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
