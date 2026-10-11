import { Link } from 'react-router';

import { Box, Text } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';

export const NotFoundPage = () => (
    <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        gap="4"
        paddingTop="20"
        textAlign="center"
    >
        <Text variant="title">404</Text>
        <Text variant="body">La página que buscás no existe.</Text>
        <Box
            as={Link}
            backgroundColor="primary"
            borderRadius="md"
            color="onPrimary"
            fontSize="sm"
            fontWeight="semibold"
            padding="2"
            to={PRIVATE_ROUTES.HOME}
        >
            Volver al inicio
        </Box>
    </Box>
);
