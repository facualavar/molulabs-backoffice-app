import { Plus } from 'lucide-react';
import { Link } from 'react-router';

import { useDeleteUser, useNameSearch, useUsers } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Input, Pagination, Text } from '@/components/ui';

import { DEFAULT_ITEMS_PER_PAGE } from '@/domain/constants/pagination.constant';
import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import type { User } from '@/domain/models/user.model';

import { UsersTable } from './components/UsersTable';

export const UsersPage = () => {
    const { nameFilter, nameInput, page, setNameInput, setPage } = useNameSearch();
    const { data, isFetching, isLoading } = useUsers({
        limit: DEFAULT_ITEMS_PER_PAGE,
        name: nameFilter || undefined,
        page
    });
    const { mutate: deleteUser } = useDeleteUser();

    const handleDelete = (user: User) => {
        const confirmed = window.confirm(`¿Eliminar a ${user.firstname} ${user.lastname}?`);

        if (confirmed) {
            deleteUser(user.id);
        }
    };

    if (isLoading || !data) {
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

            <Box marginBottom="4" maxWidth="320px">
                <Input
                    data-testid="users-filter-input-name"
                    label="Buscar por nombre"
                    onChange={(event) => setNameInput(event.target.value)}
                    placeholder="Nombre o apellido"
                    value={nameInput}
                />
            </Box>

            <UsersTable onDelete={handleDelete} users={data.data} />

            <Pagination
                currentPage={data.meta.page}
                disabled={isFetching}
                onPageChange={setPage}
                resultsPerPage={data.meta.limit}
                totalItems={data.meta.total}
                totalPages={data.meta.totalPages}
            />
        </Box>
    );
};
