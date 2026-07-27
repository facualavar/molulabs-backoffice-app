import { Link, useMatch } from 'react-router';

import { Box, Text } from '@/components/ui';

import type { SidenavItem as SidenavItemType } from './Sidenav.config';

interface SidenavItemProps {
    item: SidenavItemType;
}

export const SidenavItem = ({ item }: SidenavItemProps) => {
    const isActive = Boolean(useMatch({ end: false, path: `${item.path}/*` }));

    return (
        <Box
            as={Link}
            backgroundColor={isActive ? 'sidenav.hover' : undefined}
            borderRadius="md"
            display="block"
            padding="2"
            to={item.path}
        >
            <Text color={isActive ? 'white' : 'sidenav.textMuted'} variant="label">
                {item.title}
            </Text>
        </Box>
    );
};
