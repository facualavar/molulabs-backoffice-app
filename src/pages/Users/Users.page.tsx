import { useEffect, useState } from 'react';

import { Button, PageHeader, TableToolbar } from '@molulabs/ds';
import { useNavigate, useSearchParams } from 'react-router';

import { exportUsers } from '@/services/user.service';

import { useCurrentUser, useDeleteUser, useNameSearch, useUsers } from '@/hooks';

import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { ExportButton } from '@/components/ExportButton';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Input, Pagination, Select, toast } from '@/components/ui';

import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '@/domain/constants/pagination.constant';
import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { MIN_SEARCH_CHARS } from '@/domain/constants/search.constant';
import { getErrorDescription } from '@/domain/models/error.model';
import type { User } from '@/domain/models/user.model';
import { getRoleOptions } from '@/domain/models/usuario.model';

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
    const { isPending: isDeleting, mutate: deleteUser } = useDeleteUser();
    const [pendingDelete, setPendingDelete] = useState<null | User>(null);

    const handleConfirmDelete = () => {
        if (!pendingDelete) return;

        deleteUser(pendingDelete.id, {
            onError: (deleteError) =>
                toast.error('No se pudo eliminar el usuario', {
                    description: getErrorDescription(deleteError)
                }),
            onSettled: () => setPendingDelete(null),
            onSuccess: () => toast.success('Usuario eliminado correctamente')
        });
    };

    if (isLoading || !data) {
        return <LoadingScreen />;
    }

    return (
        <Box>
            <PageHeader style={{ marginBottom: 'var(--space-6)' }} title="Usuarios" />

            <TableToolbar
                actions={
                    <>
                        <ExportButton
                            data-testid="users-export-action-export"
                            key={`${nameFilter}-${roleFilter}-${documentNumberFilter}`}
                            onExport={() =>
                                exportUsers({
                                    documentNumber: documentNumberFilter || undefined,
                                    name: nameFilter || undefined,
                                    role: roleFilter || undefined
                                })
                            }
                        />
                        <Button
                            icon="ti-plus"
                            onClick={() => navigate(PRIVATE_ROUTES.USERS_NEW)}
                            size="sm"
                        >
                            Nuevo usuario
                        </Button>
                    </>
                }
                filters={
                    <>
                        <Input
                            data-testid="users-filter-input-name"
                            hideLabel
                            label="Nombre"
                            onChange={(event) => setNameInput(event.target.value)}
                            placeholder="Buscar por nombre o apellido"
                            value={nameInput}
                        />
                        <Select
                            data-testid="users-filter-select-role"
                            hideLabel
                            label="Rol"
                            onChange={handleRoleChange}
                            options={roleFilterOptions}
                            placeholder="Todos los roles"
                            value={roleFilter}
                        />
                        <Input
                            data-testid="users-filter-input-document-number"
                            hideLabel
                            label="N° de documento"
                            onChange={(event) => setDocumentNumberInput(event.target.value)}
                            placeholder="Buscar por N° de documento"
                            value={documentNumberInput}
                        />
                    </>
                }
                filtersMin={200}
                style={{ marginBottom: 'var(--space-4)' }}
            />

            <UsersTable onDelete={setPendingDelete} users={data.data}>
                <Pagination
                    currentPage={data.meta.page}
                    disabled={isFetching}
                    onPageChange={setPage}
                    totalItems={data.meta.total}
                />
            </UsersTable>

            <ConfirmDeleteModal
                loading={isDeleting}
                message={`Se va a eliminar a ${pendingDelete?.firstname} ${pendingDelete?.lastname}. Esta acción no se puede deshacer.`}
                onCancel={() => setPendingDelete(null)}
                onConfirm={handleConfirmDelete}
                open={pendingDelete !== null}
                title="Eliminar usuario"
            />
        </Box>
    );
};
