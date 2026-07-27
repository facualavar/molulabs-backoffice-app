import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { css } from 'styled-system/css';

import type { AppDispatch } from '@/app/store';

import type { AppStore } from '@/store/domain/models/store.model';
import { loginThunk } from '@/store/thunks/auth.thunk';

import { LoginForm } from './components/LoginForm';
import type { LoginFormValues } from './components/LoginForm/LoginForm.schema';

export const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, loginError, loginLoading } = useSelector(
        (state: AppStore) => state.auth
    );

    if (!loginLoading && isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    const handleSubmit = (values: LoginFormValues) => {
        dispatch(loginThunk(values));
    };

    return (
        <div className={css({ maxWidth: '416px', width: '100%' })}>
            <LoginForm errors={loginError} loading={loginLoading} onSubmit={handleSubmit} />
        </div>
    );
};
