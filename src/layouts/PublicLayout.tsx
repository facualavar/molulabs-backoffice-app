import { Outlet } from 'react-router';
import { styled } from 'styled-system/jsx';

import { Box, Text } from '@/components/ui';

import bgImage from '@/assets/bg-01.jpg';
import logo from '@/assets/react.svg';

const currentYear = new Date().getFullYear();

const Logo = styled('img');

export const PublicLayout = () => (
    <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} height="100vh">
        <Box
            alignItems="center"
            backgroundPosition="center"
            backgroundSize="cover"
            display={{ base: 'none', md: 'flex' }}
            height="100vh"
            justifyContent="center"
            position="relative"
            style={{ backgroundImage: `url(${bgImage})` }}
            width={{ lg: '50%', md: '40%' }}
        >
            <Box
                alignItems="center"
                aspectRatio="3 / 5"
                borderColor="primary"
                borderRadius="80px"
                borderStyle="solid"
                borderWidth="14px"
                boxShadow="lg"
                display="flex"
                flexDirection="column"
                gap="4"
                justifyContent="center"
                maxWidth="460px"
                padding="5vh"
                width="80%"
            >
                <Logo alt="Backoffice" src={logo} width="160px" />
                <Text color="white" variant="label">
                    Backoffice
                </Text>
            </Box>
        </Box>

        <Box
            alignItems="center"
            display="flex"
            flex="1"
            height="100vh"
            justifyContent="center"
            padding={{ base: '10', md: '0' }}
            position="relative"
            width={{ base: '100%', lg: '50%', md: '60%' }}
        >
            <Outlet />
            <Box bottom="6" position="absolute" right="6">
                <Text variant="caption">© {currentYear}</Text>
            </Box>
        </Box>
    </Box>
);
