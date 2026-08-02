import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { AppRoutes } from '@/app/AppRoutes';
import { AuthBoot } from '@/app/AuthBoot';
import { store } from '@/app/store';

import { Toaster } from '@/components/ui';

import { ModalProvider } from '@/styles/providers/ModalProvider';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            const onError = query.meta?.onError as ((err: unknown) => void) | undefined;
            onError?.(error);
        }
    })
});

declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__?: QueryClient;
    }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export const App = () => (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                <AuthBoot>
                    <AppRoutes />
                </AuthBoot>
                <Toaster />
            </ModalProvider>
        </QueryClientProvider>
    </Provider>
);
