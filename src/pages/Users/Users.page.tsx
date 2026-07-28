import { Plus } from 'lucide-react';
import { Link } from 'react-router';

import { useDeleteUser, useUsers } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Text } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import type { User } from '@/domain/models/user.model';

import { UsersTable } from './components/UsersTable';

export const UsersPage = () => {
    const { data: users, isLoading } = useUsers();
    const { mutate: deleteUser } = useDeleteUser();

    const handleDelete = (user: User) => {
        const confirmed = window.confirm(`¿Eliminar a ${user.firstname} ${user.lastname}?`);

        if (confirmed) {
            deleteUser(user.id);
        }
    };

    if (isLoading || !users) {
        return <LoadingScreen />;
    }

    return (
        <Box>
            <Box alignItems="center" display="flex" justifyContent="space-between" marginBottom="6">
                <Text variant="heading">Usuarios</Text>
                <Box
                    alignItems="center"
                    as={Link}
                    backgroundColor="primary"
                    borderRadius="md"
                    color="white"
                    display="flex"
                    fontSize="sm"
                    fontWeight="medium"
                    gap="2"
                    padding="2"
                    to={PRIVATE_ROUTES.USERS_NEW}
                >
                    <Plus size={16} />
                    Nuevo usuario
                </Box>
            </Box>
            <UsersTable onDelete={handleDelete} users={users} />
        </Box>
    );
};
