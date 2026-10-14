import { PageHeader } from '@molulabs/ds';
import { useNavigate } from 'react-router';

import { useCreateUser } from '@/hooks';

import { Box, toast } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { getErrorDescription, toSerializableError } from '@/domain/models/error.model';

import { UserForm } from './components/UserForm';
import { emptyUserFormValues } from './components/UserForm/UserForm.schema';
import type { UserFormValues } from './components/UserForm/UserForm.schema';

export const UserCreatePage = () => {
    const navigate = useNavigate();
    const { error, isPending, mutate } = useCreateUser();

    const handleSubmit = (values: UserFormValues) => {
        mutate(
            {
                companyId: values.company ? Number(values.company.id) : null,
                documentNumber: values.documentNumber,
                email: values.email,
                firstname: values.firstname,
                lastname: values.lastname,
                password: values.password,
                role: values.role
            },
            {
                onError: (submitError) =>
                    toast.error('No se pudo crear el usuario', {
                        description: getErrorDescription(submitError)
                    }),
                onSuccess: () => {
                    toast.success('Usuario creado correctamente');
                    navigate(PRIVATE_ROUTES.USERS);
                }
            }
        );
    };

    return (
        <Box maxWidth="480px">
            <PageHeader title="Nuevo usuario" />
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
