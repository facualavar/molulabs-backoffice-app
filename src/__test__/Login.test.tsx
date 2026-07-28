import { LoginPage } from '@/pages/Login';
import { screen } from '@testing-library/react';

import { store } from '@/app/store';

import { updateAuth } from '@/store/slices/auth.slice';

import { renderScreen } from './shared/helpers/renderScreen.helper';

describe('LoginPage', () => {
    it('muestra el formulario de login', () => {
        store.dispatch(updateAuth({ hydrated: true }));

        renderScreen(<LoginPage />);

        expect(screen.getByTestId('login-form-input-email')).toBeInTheDocument();
        expect(screen.getByTestId('login-form-input-password')).toBeInTheDocument();
        expect(screen.getByTestId('login-form-input-remember-me')).toBeInTheDocument();
        expect(screen.getByTestId('login-form-action-submit')).toBeInTheDocument();
    });
});
