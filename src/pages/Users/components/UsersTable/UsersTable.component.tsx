import type { ReactNode } from 'react';

import type { DataColumn } from '@molulabs/ds';
import { Card, DataTable, EmptyState, Tag } from '@molulabs/ds';

import { useCurrentUser } from '@/hooks';

import { RowActions } from '@/components/ui';

import type { User } from '@/domain/models/user.model';
import { SUPERADMIN_ROLE, USER_ROLE_LABEL } from '@/domain/models/usuario.model';

import { getUserEditPath } from '../../users.helper';

interface UsersTableProps {
    /** Rendered inside the card, under the table — the pagination */
    children?: ReactNode;
    onDelete: (user: User) => void;
    users: User[];
}

export const UsersTable = ({ children, onDelete, users }: UsersTableProps) => {
    const { data: currentUser } = useCurrentUser();
    const isSuperAdmin = currentUser?.role === SUPERADMIN_ROLE;

    const columns: DataColumn[] = [
        { label: 'Nombre' },
        { label: 'Apellido' },
        { label: 'Correo', muted: true },
        { label: 'N° documento', mono: true },
        ...(isSuperAdmin ? [{ label: 'Empresa' }] : []),
        { label: 'Rol' },
        { align: 'right', label: '' }
    ];

    const rows = users.map((user) => ({
        cells: [
            user.firstname,
            user.lastname,
            user.email,
            user.documentNumber,
            ...(isSuperAdmin ? [user.company.name] : []),
            <Tag key="role">{USER_ROLE_LABEL[user.role] ?? user.role}</Tag>,
            <RowActions
                actions={[
                    { icon: 'ti-pencil', label: 'Editar usuario', to: getUserEditPath(user.id) },
                    {
                        icon: 'ti-trash',
                        isDanger: true,
                        label: 'Eliminar usuario',
                        onClick: () => onDelete(user)
                    }
                ]}
                key="actions"
                label={`Acciones de ${user.firstname} ${user.lastname}`}
            />
        ]
    }));

    return (
        <Card pad={false}>
            <DataTable
                columns={columns}
                empty={
                    <EmptyState icon="ti-search" title="Sin resultados">
                        No hay usuarios que coincidan con los filtros.
                    </EmptyState>
                }
                rows={rows}
            />
            {children}
        </Card>
    );
};
