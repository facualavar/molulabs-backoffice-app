import { Outlet } from 'react-router';

import { Sidenav } from '@/components/Sidenav';
import { Box } from '@/components/ui';

export const AppLayout = () => (
    <Box data-density="compact" display="flex" height="100vh">
        <Sidenav />
        <Box
            backgroundColor="surface"
            flex="1"
            minWidth="0"
            overflowY="auto"
            // Holds the absolute bits with no positioned parent (the filters' hidden labels): without
            // it they hang off the page and give the whole window a second scrollbar
            position="relative"
            style={{ padding: 'var(--pad-screen)' }}
        >
            <Outlet />
        </Box>
    </Box>
);
