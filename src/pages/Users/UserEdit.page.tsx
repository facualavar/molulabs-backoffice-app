import { useNavigate, useParams } from 'react-router';

import { useCompany, useUpdateUser, useUser } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Text } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { toSerializableError } from '@/domain/models/error.model';

import { UserForm } from './components/UserForm';
import type { UserFormValues } from './components/UserForm/UserForm.schema';

export const UserEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: user, isLoading: isUserLoading } = useUser(Number(id));
    const { data: company, isLoading: isCompanyLoading } = useCompany(user?.companyId ?? NaN);
    const { error, isPending, mutate } = useUpdateUser();

    if (isUserLoading || isCompanyLoading || !user || !company) {
        return <LoadingScreen />;
    }

    const handleSubmit = (values: UserFormValues) => {
        if (!values.company) return;

        mutate(
            {
                id: user.id,
                payload: {
                    companyId: Number(values.company.id),
                    email: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    password: '',
                    role: values.role
                }
            },
            { onSuccess: () => navigate(PRIVATE_ROUTES.USERS) }
        );
    };

    return (
        <Box maxWidth="480px">
            <Text style={{ marginBottom: '1.5rem' }} variant="heading">
                Editar usuario
            </Text>
            <UserForm
                errors={error ? toSerializableError(error) : null}
                initialValues={{
                    company: { id: String(company.id), label: company.name },
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    password: '',
                    role: ''
                }}
                loading={isPending}
                mode="edit"
                onSubmit={handleSubmit}
            />
        </Box>
    );
};
