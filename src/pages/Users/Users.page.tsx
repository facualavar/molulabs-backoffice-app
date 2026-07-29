import type { ChangeEvent } from 'react';

import { Link, useSearchParams } from 'react-router';

import { useDeleteUser, useNameSearch, useUsers } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Input, Pagination, Select, Text } from '@/components/ui';

import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '@/domain/constants/pagination.constant';
import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import type { User } from '@/domain/models/user.model';
import { SUPERADMIN_ROLE, USER_ROLE, USER_ROLE_LABEL } from '@/domain/models/usuario.model';

import { UsersExport } from './components/UsersExport';
import { UsersTable } from './components/UsersTable';

const ROLE_FILTER_OPTIONS = [USER_ROLE.ADMIN, USER_ROLE.USER, SUPERADMIN_ROLE].map((role) => ({
    label: USER_ROLE_LABEL[role],
    value: role
}));

export const UsersPage = () => {
    const { nameFilter, nameInput, page, setNameInput, setPage } = useNameSearch();
    const [searchParams, setSearchParams] = useSearchParams();
    const roleFilter = searchParams.get('role') ?? '';

    const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);

            if (value) {
                next.set('role', value);
            } else {
                next.delete('role');
            }
            next.set('page', String(DEFAULT_PAGE));

            return next;
        });
    };

    const { data, isFetching, isLoading } = useUsers({
        limit: DEFAULT_ITEMS_PER_PAGE,
        name: nameFilter || undefined,
        page,
        role: roleFilter || undefined
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
                <Box alignItems="center" display="flex" gap="3">
                    <UsersExport
                        key={`${nameFilter}-${roleFilter}`}
                        name={nameFilter || undefined}
                        role={roleFilter || undefined}
                    />
                    <Box
                        alignItems="center"
                        as={Link}
                        backgroundColor="primary"
                        borderRadius="md"
                        color="white"
                        display="flex"
                        fontSize="sm"
                        fontWeight="medium"
                        padding="2"
                        to={PRIVATE_ROUTES.USERS_NEW}
                    >
                        Nuevo usuario
                    </Box>
                </Box>
            </Box>

            <Box display="flex" gap="4" marginBottom="4">
                <Box maxWidth="320px" width="100%">
                    <Input
                        data-testid="users-filter-input-name"
                        label="Buscar por nombre"
                        onChange={(event) => setNameInput(event.target.value)}
                        placeholder="Nombre o apellido"
                        value={nameInput}
                    />
                </Box>
                <Box maxWidth="220px" width="100%">
                    <Select
                        data-testid="users-filter-select-role"
                        label="Filtrar por rol"
                        onChange={handleRoleChange}
                        options={ROLE_FILTER_OPTIONS}
                        placeholder="Todos los roles"
                        value={roleFilter}
                    />
                </Box>
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
