import { LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useMatch } from 'react-router';

import type { AppDispatch } from '@/app/store';

import { resetAuth } from '@/store/slices/auth.slice';

import { useCurrentUser } from '@/hooks';

import { Box, Text } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';

import { clearAllStorage } from '@/shared/utilities/storage.utility';

import { useSidenav } from './Sidenav.context';

export const SidenavFooter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isExpanded } = useSidenav();
    const { data: currentUser } = useCurrentUser();
    const isProfileActive = Boolean(useMatch(PRIVATE_ROUTES.PROFILE));

    const handleLogout = () => {
        clearAllStorage();
        dispatch(resetAuth());
    };

    const fullName = currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : '';

    return (
        <Box borderColor="sidenav.border" borderTop="1px solid" padding="2">
            {isExpanded && fullName ? (
                <Box
                    _hover={{ backgroundColor: 'sidenav.hover' }}
                    as={Link}
                    backgroundColor={isProfileActive ? 'sidenav.hover' : undefined}
                    borderRadius="md"
                    display="block"
                    overflow="hidden"
                    padding="2"
                    to={PRIVATE_ROUTES.PROFILE}
                >
                    <Text
                        color="sidenav.text"
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                        variant="label"
                    >
                        {fullName}
                    </Text>
                </Box>
            ) : null}
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
