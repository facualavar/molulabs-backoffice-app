import type { ReactNode } from 'react';

import type { DataColumn } from '@molulabs/ds';
import { Card, DataTable, EmptyState } from '@molulabs/ds';

import { RowActions } from '@/components/ui';

import { DOCUMENT_TYPE_LABEL } from '@/domain/models/company.model';
import type { Company } from '@/domain/models/company.model';

import { formatDate } from '@/shared/utilities/date.utility';

import { getCompanyEditPath } from '../../companies.helper';

interface CompaniesTableProps {
    /** Rendered inside the card, under the table — the pagination */
    children?: ReactNode;
    companies: Company[];
    onDelete: (company: Company) => void;
}

const columns: DataColumn[] = [
    { label: 'Nombre' },
    { label: 'Correo', muted: true },
    { label: 'Teléfono', mono: true },
    { label: 'Tipo doc.' },
    { label: 'N° documento', mono: true },
    { label: 'Fecha de alta', mono: true },
    { align: 'right', label: '' }
];

export const CompaniesTable = ({ children, companies, onDelete }: CompaniesTableProps) => (
    <Card pad={false}>
        <DataTable
            columns={columns}
            empty={
                <EmptyState icon="ti-search" title="Sin resultados">
                    No hay empresas que coincidan con la búsqueda.
                </EmptyState>
            }
            rows={companies.map((company) => ({
                cells: [
                    company.name,
                    company.email,
                    company.phone,
                    DOCUMENT_TYPE_LABEL[company.documentType] ?? company.documentType,
                    company.documentNumber,
                    formatDate(company.createdAt),
                    <RowActions
                        actions={[
                            {
                                icon: 'ti-pencil',
                                label: 'Editar empresa',
                                to: getCompanyEditPath(company.id)
                            },
                            {
                                icon: 'ti-trash',
                                isDanger: true,
                                label: 'Eliminar empresa',
                                onClick: () => onDelete(company)
                            }
                        ]}
                        key="actions"
                        label={`Acciones de ${company.name}`}
                    />
                ]
            }))}
        />
        {children}
    </Card>
);
