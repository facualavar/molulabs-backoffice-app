import { CompanyForm } from '@/pages/Companies/components/CompanyForm';
import type { CompanyFormValues } from '@/pages/Companies/components/CompanyForm/CompanyForm.schema';
import { PageHeader } from '@molulabs/ds';

import { useMyCompany, useUpdateMyCompany } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, toast } from '@/components/ui';

import { getErrorDescription, toSerializableError } from '@/domain/models/error.model';

export const MyCompanyPage = () => {
    const { data: company, isLoading } = useMyCompany();
    const { error, isPending, mutate } = useUpdateMyCompany();

    if (isLoading || !company) {
        return <LoadingScreen />;
    }

    const handleSubmit = (values: CompanyFormValues) => {
        mutate(values, {
            onError: (submitError) =>
                toast.error('No se pudo actualizar la empresa', {
                    description: getErrorDescription(submitError)
                }),
            onSuccess: () => toast.success('Empresa actualizada correctamente')
        });
    };

    return (
        <Box maxWidth="480px">
            <PageHeader sub="Datos de la empresa a la que pertenecés." title="Mi Empresa" />
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
