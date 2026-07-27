import { Pin, PinOff } from 'lucide-react';

import { Box, Text } from '@/components/ui';

import logo from '@/assets/react.svg';

import { SidenavStatus } from './Sidenav.constant';
import { useSidenav } from './Sidenav.context';

export const SidenavHeader = () => {
    const { isExpanded, status, toggleFixed } = useSidenav();
    const isFixed = status === SidenavStatus.fixed;

    return (
        <Box
            alignItems="center"
            borderBottom="1px solid"
            borderColor="sidenav.border"
            display="flex"
            gap="3"
            justifyContent="space-between"
            padding="4"
        >
            <Box alignItems="center" display="flex" gap="3" minWidth="0">
                <img alt="Backoffice" src={logo} style={{ flexShrink: 0, width: '28px' }} />
                {isExpanded ? (
                    <Text color="white" style={{ whiteSpace: 'nowrap' }} variant="label">
                        Backoffice
                    </Text>
                ) : null}
            </Box>

            {isExpanded ? (
                <Box
                    alignItems="center"
                    aria-label={isFixed ? 'Desanclar menú' : 'Anclar menú'}
                    as="button"
                    color="sidenav.textMuted"
                    cursor="pointer"
                    display="flex"
                    onClick={toggleFixed}
                    style={{ background: 'none', border: 'none', flexShrink: 0, padding: 0 }}
                >
                    {isFixed ? <PinOff size={16} /> : <Pin size={16} />}
                </Box>
            ) : null}
        </Box>
    );
};
