import { useEffect, useState } from 'react';

import { Plus } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';

import { useDeleteUser, useUsers } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Input, Pagination, Text } from '@/components/ui';

import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '@/domain/constants/pagination.constant';
import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { MIN_SEARCH_CHARS } from '@/domain/constants/search.constant';
import type { User } from '@/domain/models/user.model';

import { UsersTable } from './components/UsersTable';

export const UsersPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || DEFAULT_PAGE;
    const nameFilter = searchParams.get('name') ?? '';
    const [nameInput, setNameInput] = useState(nameFilter);

    useEffect(() => {
        if (nameInput === nameFilter) return;
        if (nameInput.length > 0 && nameInput.length < MIN_SEARCH_CHARS) return;

        const timeout = setTimeout(() => {
            setSearchParams((previous) => {
                const next = new URLSearchParams(previous);

                if (nameInput) {
                    next.set('name', nameInput);
                } else {
                    next.delete('name');
                }
                next.set('page', String(DEFAULT_PAGE));

                return next;
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [nameFilter, nameInput, setSearchParams]);

    const { data, isFetching, isLoading } = useUsers({
        limit: DEFAULT_ITEMS_PER_PAGE,
        name: nameFilter || undefined,
        page: currentPage
    });
    const { mutate: deleteUser } = useDeleteUser();

    const handleDelete = (user: User) => {
        const confirmed = window.confirm(`¿Eliminar a ${user.firstname} ${user.lastname}?`);

        if (confirmed) {
            deleteUser(user.id);
        }
    };

    const handlePageChange = (page: number) => {
        setSearchParams((previous) => {
            const next = new URLSearchParams(previous);
            next.set('page', String(page));

            return next;
        });
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
                onPageChange={handlePageChange}
                resultsPerPage={data.meta.limit}
                totalItems={data.meta.total}
                totalPages={data.meta.totalPages}
            />
        </Box>
    );
};
