import { PageHeader } from '@molulabs/ds';
import { useNavigate, useParams } from 'react-router';

import { useCompany, useUpdateCompany } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, toast } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { getErrorDescription, toSerializableError } from '@/domain/models/error.model';

import { CompanyForm } from './components/CompanyForm';
import type { CompanyFormValues } from './components/CompanyForm/CompanyForm.schema';

export const CompanyEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: company, isLoading } = useCompany(Number(id));
    const { error, isPending, mutate } = useUpdateCompany();

    if (isLoading || !company) {
        return <LoadingScreen />;
    }

    const handleSubmit = (values: CompanyFormValues) => {
        mutate(
            { id: company.id, payload: values },
            {
                onError: (submitError) =>
                    toast.error('No se pudo actualizar la empresa', {
                        description: getErrorDescription(submitError)
                    }),
                onSuccess: () => {
                    toast.success('Empresa actualizada correctamente');
                    navigate(PRIVATE_ROUTES.COMPANIES);
                }
            }
        );
    };

    return (
        <Box maxWidth="480px">
            <PageHeader title="Editar empresa" />
            <CompanyForm
                errors={error ? toSerializableError(error) : null}
                initialValues={{
                    documentNumber: company.documentNumber,
                    documentType: company.documentType,
                    email: company.email,
                    name: company.name,
                    phone: company.phone
                }}
                loading={isPending}
                onSubmit={handleSubmit}
            />
        </Box>
    );
};
