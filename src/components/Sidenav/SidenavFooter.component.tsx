import { useEffect, useRef, useState } from 'react';

import { MoreHorizontal } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router';

import type { AppDispatch } from '@/app/store';

import { logoutThunk } from '@/store/thunks/auth.thunk';

import { useCurrentUser } from '@/hooks';

import { Box, Text } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';

import { useSidenav } from './Sidenav.context';

export const SidenavFooter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isExpanded } = useSidenav();
    const { data: currentUser } = useCurrentUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [wasExpanded, setWasExpanded] = useState(isExpanded);
    const containerRef = useRef<HTMLDivElement>(null);

    if (isExpanded !== wasExpanded) {
        setWasExpanded(isExpanded);
        if (!isExpanded) setIsMenuOpen(false);
    }

    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    const handleLogout = () => {
        setIsMenuOpen(false);
        dispatch(logoutThunk());
    };

    const closeMenu = () => setIsMenuOpen(false);

    const fullName = currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : '';

    return (
        <Box
            borderTopColor="sidenav.border"
            borderTopStyle="solid"
            borderTopWidth="1px"
            paddingBottom="30px"
            paddingTop="4"
            paddingX="20px"
            position="relative"
            ref={containerRef}
        >
            {isMenuOpen ? (
                <Box
                    backgroundColor="divider"
                    borderColor="sidenav.border"
                    borderRadius="lg"
                    borderStyle="solid"
                    borderWidth="1px"
                    bottom="100%"
                    boxShadow="lg"
                    left="20px"
                    marginBottom="2"
                    overflow="hidden"
                    position="absolute"
                    right="20px"
                    zIndex="10"
                >
                    <Box
                        _hover={{ backgroundColor: 'sidenav.hover' }}
                        alignItems="center"
                        as="button"
                        backgroundColor="transparent"
                        border="none"
                        color="danger"
                        cursor="pointer"
                        display="flex"
                        onClick={handleLogout}
                        padding="3"
                        width="100%"
                    >
                        <Text color="danger" variant="label">
                            Cerrar sesión
                        </Text>
                    </Box>
                    <Box backgroundColor="sidenav.border" height="1px" marginX="3" marginY="1" />
                    <Box
                        _hover={{ backgroundColor: 'sidenav.hover' }}
                        alignItems="center"
                        as={Link}
                        color="sidenav.text"
                        display="flex"
                        onClick={closeMenu}
                        padding="3"
                        to={PRIVATE_ROUTES.PROFILE}
                    >
                        <Text color="sidenav.text" variant="label">
                            Configurar usuario
                        </Text>
                    </Box>
                    <Box
                        _hover={{ backgroundColor: 'sidenav.hover' }}
                        alignItems="center"
                        as={Link}
                        color="sidenav.text"
                        display="flex"
                        onClick={closeMenu}
                        padding="3"
                        to={PRIVATE_ROUTES.PROFILE_PASSWORD}
                    >
                        <Text color="sidenav.text" variant="label">
                            Cambiar mi contraseña
                        </Text>
                    </Box>
                </Box>
            ) : null}
            <Box alignItems="center" display="flex" gap="2" justifyContent="space-between">
                {isExpanded && fullName ? (
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
                ) : null}
                <Box
                    alignItems="center"
                    aria-label="Acciones de usuario"
                    as="button"
                    borderRadius="md"
                    color="sidenav.text"
                    cursor="pointer"
                    display="flex"
                    flexShrink={0}
                    justifyContent="center"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    padding="2"
                    style={{ background: 'none', border: 'none' }}
                    title="Acciones de usuario"
                >
                    <MoreHorizontal size={20} style={{ flexShrink: 0 }} />
                </Box>
            </Box>
        </Box>
    );
};
