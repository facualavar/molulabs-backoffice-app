import { Suspense, lazy } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router';

import { AppPrivate } from '@/app/AppPrivate';
import { PrivateRoute } from '@/app/PrivateRoute';

import { PublicLayout } from '@/layouts/PublicLayout';

import { LoadingScreen } from '@/components/LoadingScreen';

const LoginPage = lazy(() =>
    import('@/pages/Login').then((module) => ({ default: module.LoginPage }))
);

export const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<PublicLayout />}>
                <Route
                    element={
                        <Suspense fallback={<LoadingScreen />}>
                            <LoginPage />
                        </Suspense>
                    }
                    path="/login"
                />
            </Route>
            <Route
                element={
                    <PrivateRoute>
                        <AppPrivate />
                    </PrivateRoute>
                }
                path="*"
            />
        </Routes>
    </BrowserRouter>
);
