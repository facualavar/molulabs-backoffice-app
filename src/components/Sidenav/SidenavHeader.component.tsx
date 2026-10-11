import { ChevronsLeft, LayoutGrid } from 'lucide-react';

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
            display="flex"
            gap="3"
            justifyContent="space-between"
            paddingBottom="4"
            paddingTop="30px"
            paddingX="20px"
        >
            <Box alignItems="center" display="flex" gap="3" minWidth="0">
                <img alt="Backoffice" src={logo} style={{ flexShrink: 0, width: '28px' }} />
                {isExpanded ? (
                    <Text as="span" style={{ whiteSpace: 'nowrap' }} variant="heading">
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
                    {isFixed ? <ChevronsLeft size={16} /> : <LayoutGrid size={16} />}
                </Box>
            ) : null}
        </Box>
    );
};
