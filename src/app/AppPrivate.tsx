import { Route, Routes } from 'react-router';

export const AppPrivate = () => (
    <Routes>
        <Route element={<div>Backoffice</div>} path="*" />
    </Routes>
);
