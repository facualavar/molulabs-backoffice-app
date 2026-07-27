import { LoginPage } from '@/pages/Login';
import { screen } from '@testing-library/react';

import { renderScreen } from './shared/helpers/renderScreen.helper';

describe('LoginPage', () => {
    it('muestra el formulario de login', () => {
        renderScreen(<LoginPage />);

        expect(screen.getByTestId('login-form-input-email')).toBeInTheDocument();
        expect(screen.getByTestId('login-form-input-contrasena')).toBeInTheDocument();
        expect(screen.getByTestId('login-form-input-recordar')).toBeInTheDocument();
        expect(screen.getByTestId('login-form-action-submit')).toBeInTheDocument();
    });
});
