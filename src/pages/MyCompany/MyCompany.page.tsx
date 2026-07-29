import { CompanyForm } from '@/pages/Companies/components/CompanyForm';
import type { CompanyFormValues } from '@/pages/Companies/components/CompanyForm/CompanyForm.schema';

import { useMyCompany, useUpdateMyCompany } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Text } from '@/components/ui';

import { toSerializableError } from '@/domain/models/error.model';

export const MyCompanyPage = () => {
    const { data: company, isLoading } = useMyCompany();
    const { error, isPending, isSuccess, mutate } = useUpdateMyCompany();

    if (isLoading || !company) {
        return <LoadingScreen />;
    }

    const handleSubmit = (values: CompanyFormValues) => {
        mutate(values);
    };

    return (
        <Box maxWidth="480px">
            <Text style={{ marginBottom: '1.5rem' }} variant="heading">
                Mi empresa
            </Text>
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
                success={isSuccess}
            />
        </Box>
    );
};
