import { Route, Routes } from 'react-router';

import { AppLayout } from '@/layouts/AppLayout';

export const AppPrivate = () => (
    <Routes>
        <Route element={<AppLayout />}>
            <Route element={<div>Inicio</div>} path="*" />
        </Route>
    </Routes>
);
