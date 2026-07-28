import { useNavigate, useParams } from 'react-router';

import { useCompanies, useUpdateUser, useUsers } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Text } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { toSerializableError } from '@/domain/models/error.model';

import { UserForm } from './components/UserForm';
import type { UserFormValues } from './components/UserForm/UserForm.schema';

export const UserEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: companies } = useCompanies();
    const { data: users, isLoading } = useUsers();
    const { error, isPending, mutate } = useUpdateUser();

    const user = users?.find((candidate) => candidate.id === Number(id));

    if (isLoading || !user) {
        return <LoadingScreen />;
    }

    const handleSubmit = (values: UserFormValues) => {
        mutate(
            {
                id: user.id,
                payload: {
                    companyId: Number(values.companyId),
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
                companies={companies ?? []}
                errors={error ? toSerializableError(error) : null}
                initialValues={{
                    companyId: String(user.companyId),
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
