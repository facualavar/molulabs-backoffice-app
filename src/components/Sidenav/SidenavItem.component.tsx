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
            _hover={{ textDecoration: 'underline' }}
            as={Link}
            borderRadius="md"
            display="block"
            padding="2"
            to={item.path}
        >
            <Text
                color={isActive ? 'sidenav.active' : 'text'}
                style={{
                    fontSize: '15px',
                    fontWeight: isActive ? 600 : 400,
                    textDecoration: isActive ? 'underline' : undefined
                }}
                variant="label"
            >
                {item.title}
            </Text>
        </Box>
    );
};
