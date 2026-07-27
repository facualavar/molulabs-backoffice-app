import { Outlet } from 'react-router';

import { Sidenav } from '@/components/Sidenav';
import { Box } from '@/components/ui';

export const AppLayout = () => (
    <Box display="flex" height="100vh">
        <Sidenav />
        <Box backgroundColor="surface" flex="1" overflowY="auto" padding="6">
            <Outlet />
        </Box>
    </Box>
);
