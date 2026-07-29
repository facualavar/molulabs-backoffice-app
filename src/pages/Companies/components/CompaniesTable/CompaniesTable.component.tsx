import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { css } from 'styled-system/css';

import { Box } from '@/components/ui';

import type { Company } from '@/domain/models/company.model';

import { getCompanyEditPath } from '../../companies.helper';

interface CompaniesTableProps {
    companies: Company[];
    onDelete: (company: Company) => void;
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

const formatDate = (isoDate: string): string =>
    new Date(isoDate).toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

export const CompaniesTable = ({ companies, onDelete }: CompaniesTableProps) => (
    <Box overflowX="auto">
        <table className={tableClass}>
            <thead>
                <tr>
                    <th className={headCellClass}>Nombre</th>
                    <th className={headCellClass}>Email</th>
                    <th className={headCellClass}>Fecha de alta</th>
                    <th className={headCellClass}>
                        <span className={visuallyHiddenClass}>Acciones</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {companies.map((company) => (
                    <tr key={company.id}>
                        <td className={cellClass}>{company.name}</td>
                        <td className={cellClass}>{company.email}</td>
                        <td className={cellClass}>{formatDate(company.createdAt)}</td>
                        <td className={actionsCellClass}>
                            <Link
                                aria-label={`Editar ${company.name}`}
                                className={iconButtonClass}
                                to={getCompanyEditPath(company.id)}
                            >
                                <Pencil size={16} />
                            </Link>
                            <button
                                aria-label={`Eliminar ${company.name}`}
                                className={iconButtonClass}
                                onClick={() => onDelete(company)}
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
