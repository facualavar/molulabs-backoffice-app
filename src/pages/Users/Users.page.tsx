import { useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router';

import { useCurrentUser, useDeleteUser, useNameSearch, useUsers } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Button, Input, Pagination, Select, Text, toast } from '@/components/ui';

import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '@/domain/constants/pagination.constant';
import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { MIN_SEARCH_CHARS } from '@/domain/constants/search.constant';
import type { User } from '@/domain/models/user.model';
import { getRoleOptions } from '@/domain/models/usuario.model';

import { UsersExport } from './components/UsersExport';
import { UsersTable } from './components/UsersTable';

export const UsersPage = () => {
    const navigate = useNavigate();
    const { data: currentUser } = useCurrentUser();
    const roleFilterOptions = getRoleOptions(currentUser?.role);
    const { nameFilter, nameInput, page, setNameInput, setPage } = useNameSearch();
    const [searchParams, setSearchParams] = useSearchParams();
    const roleFilter = searchParams.get('role') ?? '';
    const documentNumberFilter = searchParams.get('documentNumber') ?? '';
    const [documentNumberInput, setDocumentNumberInput] = useState(documentNumberFilter);

    const handleRoleChange = (value: string) => {
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

    useEffect(() => {
        if (documentNumberInput === documentNumberFilter) return;
        if (documentNumberInput.length > 0 && documentNumberInput.length < MIN_SEARCH_CHARS) return;

        const timeout = setTimeout(() => {
            setSearchParams((previous) => {
                const next = new URLSearchParams(previous);

                if (documentNumberInput) {
                    next.set('documentNumber', documentNumberInput);
                } else {
                    next.delete('documentNumber');
                }
                next.set('page', String(DEFAULT_PAGE));

                return next;
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [documentNumberFilter, documentNumberInput, setSearchParams]);

    const { data, isFetching, isLoading } = useUsers({
        documentNumber: documentNumberFilter || undefined,
        limit: DEFAULT_ITEMS_PER_PAGE,
        name: nameFilter || undefined,
        page,
        role: roleFilter || undefined
    });
    const { mutate: deleteUser } = useDeleteUser();

    const handleDelete = (user: User) => {
        const confirmed = window.confirm(`¿Eliminar a ${user.firstname} ${user.lastname}?`);

        if (confirmed) {
            deleteUser(user.id, {
                onError: () => toast.error('No se pudo eliminar el usuario'),
                onSuccess: () => toast.success('Usuario eliminado correctamente')
            });
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
                    <Button
                        label="Nuevo usuario"
                        onClick={() => navigate(PRIVATE_ROUTES.USERS_NEW)}
                        size="sm"
                    />
                </Box>
            </Box>

            <Box display="flex" gap="4" marginBottom="4">
                <Box maxWidth="320px" width="100%">
                    <Input
                        data-testid="users-filter-input-name"
                        label="Nombre"
                        onChange={(event) => setNameInput(event.target.value)}
                        placeholder="Buscar por nombre o apellido..."
                        value={nameInput}
                    />
                </Box>
                <Box maxWidth="220px" width="100%">
                    <Select
                        data-testid="users-filter-select-role"
                        label="Filtrar por rol"
                        onChange={handleRoleChange}
                        options={roleFilterOptions}
                        placeholder="Todos los roles"
                        value={roleFilter}
                    />
                </Box>
                <Box maxWidth="220px" width="100%">
                    <Input
                        data-testid="users-filter-input-document-number"
                        label="N° de documento"
                        onChange={(event) => setDocumentNumberInput(event.target.value)}
                        placeholder="Buscar por documento..."
                        value={documentNumberInput}
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
