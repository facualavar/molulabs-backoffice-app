import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { css } from 'styled-system/css';

import { useCurrentUser } from '@/hooks';

import { Box } from '@/components/ui';

import type { User } from '@/domain/models/user.model';
import { SUPERADMIN_ROLE, USER_ROLE_LABEL } from '@/domain/models/usuario.model';

import { getUserEditPath } from '../../users.helper';

interface UsersTableProps {
    onDelete: (user: User) => void;
    users: User[];
}

const tableClass = css({ borderCollapse: 'collapse', width: '100%' });
const headCellClass = css({
    borderBottom: '1px solid',
    borderColor: 'border',
    color: 'text.muted',
    fontSize: 'xs',
    fontWeight: 'medium',
    padding: '3',
    textAlign: 'left',
    textTransform: 'uppercase'
});
const cellClass = css({
    borderBottom: '1px solid',
    borderColor: 'border',
    color: 'text',
    fontSize: 'sm',
    padding: '3'
});
const actionsCellClass = css({
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: 'border',
    display: 'flex',
    gap: '3',
    padding: '3'
});
const iconButtonClass = css({
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color: 'text.muted',
    cursor: 'pointer',
    display: 'flex',
    padding: '1'
});
const visuallyHiddenClass = css({
    border: '0',
    clip: 'rect(0, 0, 0, 0)',
    height: '1px',
    overflow: 'hidden',
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px'
});

export const UsersTable = ({ onDelete, users }: UsersTableProps) => {
    const { data: currentUser } = useCurrentUser();
    const isSuperAdmin = currentUser?.role === SUPERADMIN_ROLE;

    return (
        <Box overflowX="auto">
            <table className={tableClass}>
                <thead>
                    <tr>
                        <th className={headCellClass}>Nombre</th>
                        <th className={headCellClass}>Apellido</th>
                        <th className={headCellClass}>Email</th>
                        {isSuperAdmin ? <th className={headCellClass}>Empresa</th> : null}
                        <th className={headCellClass}>Rol</th>
                        <th className={headCellClass}>
                            <span className={visuallyHiddenClass}>Acciones</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className={cellClass}>{user.firstname}</td>
                            <td className={cellClass}>{user.lastname}</td>
                            <td className={cellClass}>{user.email}</td>
                            {isSuperAdmin ? (
                                <td className={cellClass}>{user.company.name}</td>
                            ) : null}
                            <td className={cellClass}>{USER_ROLE_LABEL[user.role] ?? user.role}</td>
                            <td className={actionsCellClass}>
                                <Link
                                    aria-label={`Editar ${user.firstname} ${user.lastname}`}
                                    className={iconButtonClass}
                                    to={getUserEditPath(user.id)}
                                >
                                    <Pencil size={16} />
                                </Link>
                                <button
                                    aria-label={`Eliminar ${user.firstname} ${user.lastname}`}
                                    className={iconButtonClass}
                                    onClick={() => onDelete(user)}
                                    type="button"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};
