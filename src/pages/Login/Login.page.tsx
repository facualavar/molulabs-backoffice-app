import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import type { AppDispatch } from '@/app/store';

import type { AppStore } from '@/store/domain/models/store.model';
import { loginThunk } from '@/store/thunks/auth.thunk';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, toast } from '@/components/ui';

import { LoginForm } from './components/LoginForm';
import type { LoginFormValues } from './components/LoginForm/LoginForm.schema';

export const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { hydrated, isAuthenticated, loginError, loginLoading } = useSelector(
        (state: AppStore) => state.auth
    );

    useEffect(() => {
        if (loginError) {
            toast.error('No se pudo iniciar sesión', { description: loginError.message });
        }
    }, [loginError]);

    if (!hydrated) {
        return <LoadingScreen />;
    }

    if (!loginLoading && isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    const handleSubmit = (values: LoginFormValues) => {
        dispatch(loginThunk(values));
    };

    return (
        <Box maxWidth="416px" width="100%">
            <LoginForm errors={loginError} loading={loginLoading} onSubmit={handleSubmit} />
        </Box>
    );
};
