import { useNavigate } from 'react-router';

import { useCreateUser } from '@/hooks';

import { Box, Text } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { toSerializableError } from '@/domain/models/error.model';

import { UserForm } from './components/UserForm';
import { emptyUserFormValues } from './components/UserForm/UserForm.schema';
import type { UserFormValues } from './components/UserForm/UserForm.schema';

export const UserCreatePage = () => {
    const navigate = useNavigate();
    const { error, isPending, mutate } = useCreateUser();

    const handleSubmit = (values: UserFormValues) => {
        if (!values.company) return;

        mutate(
            {
                companyId: Number(values.company.id),
                email: values.email,
                firstname: values.firstname,
                lastname: values.lastname,
                password: values.password,
                role: values.role
            },
            { onSuccess: () => navigate(PRIVATE_ROUTES.USERS) }
        );
    };

    return (
        <Box maxWidth="480px">
            <Text style={{ marginBottom: '1.5rem' }} variant="heading">
                Nuevo usuario
            </Text>
            <UserForm
                errors={error ? toSerializableError(error) : null}
                initialValues={emptyUserFormValues}
                loading={isPending}
                mode="create"
                onSubmit={handleSubmit}
            />
        </Box>
    );
};
