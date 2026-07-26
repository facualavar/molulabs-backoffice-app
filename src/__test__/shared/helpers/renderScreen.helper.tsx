import type { ReactElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { store } from '@/app/store';

import { ModalProvider } from '@/styles/providers/ModalProvider';

export const renderScreen = (ui: ReactElement) => {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } }
    });

    return render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ModalProvider>
                    <BrowserRouter>{ui}</BrowserRouter>
                </ModalProvider>
            </QueryClientProvider>
        </Provider>
    );
};
