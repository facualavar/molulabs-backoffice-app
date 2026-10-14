import { PageHeader } from '@molulabs/ds';
import { useNavigate } from 'react-router';

import { useCreateCompany } from '@/hooks';

import { Box, toast } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { getErrorDescription, toSerializableError } from '@/domain/models/error.model';

import { CompanyForm } from './components/CompanyForm';
import { emptyCompanyFormValues } from './components/CompanyForm/CompanyForm.schema';
import type { CompanyFormValues } from './components/CompanyForm/CompanyForm.schema';

export const CompanyCreatePage = () => {
    const navigate = useNavigate();
    const { error, isPending, mutate } = useCreateCompany();

    const handleSubmit = (values: CompanyFormValues) => {
        mutate(values, {
            onError: (submitError) =>
                toast.error('No se pudo crear la empresa', {
                    description: getErrorDescription(submitError)
                }),
            onSuccess: () => {
                toast.success('Empresa creada correctamente');
                navigate(PRIVATE_ROUTES.COMPANIES);
            }
        });
    };

    return (
        <Box maxWidth="480px">
            <PageHeader title="Nueva empresa" />
            <CompanyForm
                errors={error ? toSerializableError(error) : null}
                initialValues={emptyCompanyFormValues}
                loading={isPending}
                onSubmit={handleSubmit}
            />
        </Box>
    );
};
