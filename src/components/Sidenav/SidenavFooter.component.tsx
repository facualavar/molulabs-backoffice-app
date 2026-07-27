import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/app/store';

import { resetAuth } from '@/store/slices/auth.slice';

import { Box, Text } from '@/components/ui';

import { clearAllStorage } from '@/shared/utilities/storage.utility';

import { useSidenav } from './Sidenav.context';

export const SidenavFooter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isExpanded } = useSidenav();

    const handleLogout = () => {
        clearAllStorage();
        dispatch(resetAuth());
    };

    return (
        <Box borderColor="sidenav.border" borderTop="1px solid" padding="2">
            <Box
                alignItems="center"
                as="button"
                borderRadius="md"
                color="sidenav.textMuted"
                cursor="pointer"
                display="flex"
                gap="3"
                onClick={handleLogout}
                padding="2"
                style={{ background: 'none', border: 'none', width: '100%' }}
                title={isExpanded ? undefined : 'Cerrar sesión'}
            >
                <LogOut size={20} style={{ flexShrink: 0 }} />
                {isExpanded ? (
                    <Text color="sidenav.textMuted" variant="label">
                        Cerrar sesión
                    </Text>
                ) : null}
            </Box>
        </Box>
    );
};
