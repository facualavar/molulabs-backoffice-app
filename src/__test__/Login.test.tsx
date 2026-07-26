import { LoginPage } from '@/pages/Login';
import { screen } from '@testing-library/react';

import { renderScreen } from './shared/helpers/renderScreen.helper';

describe('LoginPage', () => {
    it('muestra el título de la página', () => {
        renderScreen(<LoginPage />);

        expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    });
});
