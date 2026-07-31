import { Link } from 'react-router';

import { useCompanies, useDeleteCompany, useNameSearch } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Input, Pagination, Text } from '@/components/ui';

import { DEFAULT_ITEMS_PER_PAGE } from '@/domain/constants/pagination.constant';
import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import type { Company } from '@/domain/models/company.model';

import { CompaniesExport } from './components/CompaniesExport';
import { CompaniesTable } from './components/CompaniesTable';

export const CompaniesPage = () => {
    const { nameFilter, nameInput, page, setNameInput, setPage } = useNameSearch();
    const { data, isFetching, isLoading } = useCompanies({
        limit: DEFAULT_ITEMS_PER_PAGE,
        name: nameFilter || undefined,
        page
    });
    const { mutate: deleteCompany } = useDeleteCompany();

    const handleDelete = (company: Company) => {
        const confirmed = window.confirm(`¿Eliminar la empresa ${company.name}?`);

        if (confirmed) {
            deleteCompany(company.id);
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
                        to={PRIVATE_ROUTES.COMPANIES_NEW}
                    >
                        Nueva empresa
                    </Box>
                </Box>
            </Box>

            <Box marginBottom="4" maxWidth="320px">
                <Input
                    data-testid="companies-filter-input-name"
                    label="Buscar por nombre"
                    onChange={(event) => setNameInput(event.target.value)}
                    placeholder="Nombre de la empresa"
                    value={nameInput}
                />
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
