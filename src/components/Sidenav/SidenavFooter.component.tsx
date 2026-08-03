import { useEffect, useRef, useState } from 'react';

import { KeyRound, LogOut, MoreVertical, UserCog } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import type { AppDispatch } from '@/app/store';

import { logoutThunk } from '@/store/thunks/auth.thunk';

import { useCurrentUser } from '@/hooks';

import { Box, Text } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';

import { useSidenav } from './Sidenav.context';

export const SidenavFooter = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
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

    const handleEditUser = () => {
        setIsMenuOpen(false);
        navigate(PRIVATE_ROUTES.PROFILE);
    };

    const handleChangePassword = () => {
        setIsMenuOpen(false);
        navigate(PRIVATE_ROUTES.PROFILE_PASSWORD);
    };

    const fullName = currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : '';

    return (
        <Box
            borderColor="sidenav.border"
            borderTop="1px solid"
            padding="4"
            position="relative"
            ref={containerRef}
        >
            {isMenuOpen ? (
                <Box
                    backgroundColor="sidenav.hover"
                    border="1px solid"
                    borderColor="sidenav.hover"
                    borderRadius="md"
                    bottom="100%"
                    boxShadow="lg"
                    left="4"
                    marginBottom="2"
                    overflow="hidden"
                    position="absolute"
                    right="4"
                    zIndex="10"
                >
                    <Box
                        _hover={{ backgroundColor: 'white/10' }}
                        alignItems="center"
                        as="button"
                        color="danger"
                        cursor="pointer"
                        display="flex"
                        gap="3"
                        onClick={handleLogout}
                        padding="3"
                        style={{ background: 'none', border: 'none', width: '100%' }}
                    >
                        <LogOut size={16} style={{ flexShrink: 0 }} />
                        <Text color="danger" variant="label">
                            Cerrar sesión
                        </Text>
                    </Box>
                    <Box backgroundColor="gray.600" height="1px" marginX="3" marginY="1" />
                    <Box
                        _hover={{ backgroundColor: 'white/10' }}
                        alignItems="center"
                        as="button"
                        color="sidenav.text"
                        cursor="pointer"
                        display="flex"
                        gap="3"
                        onClick={handleEditUser}
                        padding="3"
                        style={{ background: 'none', border: 'none', width: '100%' }}
                    >
                        <UserCog size={16} style={{ flexShrink: 0 }} />
                        <Text color="sidenav.text" variant="label">
                            Configurar usuario
                        </Text>
                    </Box>
                    <Box
                        _hover={{ backgroundColor: 'white/10' }}
                        alignItems="center"
                        as="button"
                        color="sidenav.text"
                        cursor="pointer"
                        display="flex"
                        gap="3"
                        onClick={handleChangePassword}
                        padding="3"
                        style={{ background: 'none', border: 'none', width: '100%' }}
                    >
                        <KeyRound size={16} style={{ flexShrink: 0 }} />
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
                    color="sidenav.textMuted"
                    cursor="pointer"
                    display="flex"
                    flexShrink={0}
                    justifyContent="center"
                    onClick={() => setIsMenuOpen((open) => !open)}
                    padding="2"
                    style={{ background: 'none', border: 'none' }}
                    title="Acciones de usuario"
                >
                    <MoreVertical size={20} style={{ flexShrink: 0 }} />
                </Box>
            </Box>
        </Box>
    );
};
