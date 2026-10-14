import { useEffect, useState } from 'react';

import { Button, PageHeader, TableToolbar } from '@molulabs/ds';
import { useNavigate, useSearchParams } from 'react-router';

import { exportCompanies } from '@/services/company.service';

import { useCompanies, useDeleteCompany, useNameSearch } from '@/hooks';

import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal';
import { ExportButton } from '@/components/ExportButton';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Input, Pagination, toast } from '@/components/ui';

import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '@/domain/constants/pagination.constant';
import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { MIN_SEARCH_CHARS } from '@/domain/constants/search.constant';
import type { Company } from '@/domain/models/company.model';
import { getErrorDescription } from '@/domain/models/error.model';

import { CompaniesTable } from './components/CompaniesTable';

export const CompaniesPage = () => {
    const navigate = useNavigate();
    const { nameFilter, nameInput, page, setNameInput, setPage } = useNameSearch();
    const [searchParams, setSearchParams] = useSearchParams();
    const documentNumberFilter = searchParams.get('documentNumber') ?? '';
    const [documentNumberInput, setDocumentNumberInput] = useState(documentNumberFilter);

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

    const { data, isFetching, isLoading } = useCompanies({
        documentNumber: documentNumberFilter || undefined,
        limit: DEFAULT_ITEMS_PER_PAGE,
        name: nameFilter || undefined,
        page
    });
    const { isPending: isDeleting, mutate: deleteCompany } = useDeleteCompany();
    const [pendingDelete, setPendingDelete] = useState<Company | null>(null);

    const handleConfirmDelete = () => {
        if (!pendingDelete) return;

        deleteCompany(pendingDelete.id, {
            onError: (deleteError) =>
                toast.error('No se pudo eliminar la empresa', {
                    description: getErrorDescription(deleteError)
                }),
            onSettled: () => setPendingDelete(null),
            onSuccess: () => toast.success('Empresa eliminada correctamente')
        });
    };

    if (isLoading || !data) {
        return <LoadingScreen />;
    }

    return (
        <Box>
            <PageHeader style={{ marginBottom: 'var(--space-6)' }} title="Empresas" />

            <TableToolbar
                actions={
                    <>
                        <ExportButton
                            data-testid="companies-export-action-export"
                            key={`${nameFilter}-${documentNumberFilter}`}
                            onExport={() =>
                                exportCompanies({
                                    documentNumber: documentNumberFilter || undefined,
                                    name: nameFilter || undefined
                                })
                            }
                        />
                        <Button
                            icon="ti-plus"
                            onClick={() => navigate(PRIVATE_ROUTES.COMPANIES_NEW)}
                            size="sm"
                        >
                            Nueva empresa
                        </Button>
                    </>
                }
                filters={
                    <>
                        <Input
                            data-testid="companies-filter-input-name"
                            hideLabel
                            label="Nombre"
                            onChange={(event) => setNameInput(event.target.value)}
                            placeholder="Buscar por nombre"
                            value={nameInput}
                        />
                        <Input
                            data-testid="companies-filter-input-document-number"
                            hideLabel
                            label="N° de documento"
                            onChange={(event) => setDocumentNumberInput(event.target.value)}
                            placeholder="Buscar por N° de documento"
                            value={documentNumberInput}
                        />
                    </>
                }
                filtersMin={220}
                style={{ marginBottom: 'var(--space-4)' }}
            />

            <CompaniesTable companies={data.data} onDelete={setPendingDelete}>
                <Pagination
                    currentPage={data.meta.page}
                    disabled={isFetching}
                    onPageChange={setPage}
                    totalItems={data.meta.total}
                />
            </CompaniesTable>

            <ConfirmDeleteModal
                loading={isDeleting}
                message={`Se va a eliminar la empresa ${pendingDelete?.name}. Esta acción no se puede deshacer.`}
                onCancel={() => setPendingDelete(null)}
                onConfirm={handleConfirmDelete}
                open={pendingDelete !== null}
                title="Eliminar empresa"
            />
        </Box>
    );
};
