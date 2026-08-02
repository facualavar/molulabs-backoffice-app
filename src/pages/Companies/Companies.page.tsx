import { useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router';

import { useCompanies, useDeleteCompany, useNameSearch } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Button, Input, Pagination, Text, toast } from '@/components/ui';

import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from '@/domain/constants/pagination.constant';
import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { MIN_SEARCH_CHARS } from '@/domain/constants/search.constant';
import type { Company } from '@/domain/models/company.model';

import { CompaniesExport } from './components/CompaniesExport';
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
    const { mutate: deleteCompany } = useDeleteCompany();

    const handleDelete = (company: Company) => {
        const confirmed = window.confirm(`¿Eliminar la empresa ${company.name}?`);

        if (confirmed) {
            deleteCompany(company.id, {
                onError: () => toast.error('No se pudo eliminar la empresa'),
                onSuccess: () => toast.success('Empresa eliminada correctamente')
            });
        }
    };

    if (isLoading || !data) {
        return <LoadingScreen />;
    }

    return (
        <Box>
            <Box alignItems="center" display="flex" justifyContent="space-between" marginBottom="6">
                <Text variant="heading">Empresas</Text>
                <Box alignItems="center" display="flex" gap="3">
                    <CompaniesExport key={nameFilter} name={nameFilter || undefined} />
                    <Button
                        label="Nueva empresa"
                        onClick={() => navigate(PRIVATE_ROUTES.COMPANIES_NEW)}
                        size="sm"
                    />
                </Box>
            </Box>

            <Box display="flex" gap="4" marginBottom="4">
                <Box maxWidth="320px" width="100%">
                    <Input
                        data-testid="companies-filter-input-name"
                        label="Nombre"
                        onChange={(event) => setNameInput(event.target.value)}
                        placeholder="Buscar por nombre..."
                        value={nameInput}
                    />
                </Box>
                <Box maxWidth="220px" width="100%">
                    <Input
                        data-testid="companies-filter-input-document-number"
                        label="N° de documento"
                        onChange={(event) => setDocumentNumberInput(event.target.value)}
                        placeholder="Buscar por documento..."
                        value={documentNumberInput}
                    />
                </Box>
            </Box>

            <CompaniesTable companies={data.data} onDelete={handleDelete} />

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
