import { PageHeader } from '@molulabs/ds';
import { useNavigate, useParams } from 'react-router';

import { useUpdateUser, useUser } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, toast } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { getErrorDescription, toSerializableError } from '@/domain/models/error.model';

import { UserForm } from './components/UserForm';
import type { UserFormValues } from './components/UserForm/UserForm.schema';

export const UserEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: user, isLoading } = useUser(Number(id));
    const { error, isPending, mutate } = useUpdateUser();

    if (isLoading || !user) {
        return <LoadingScreen />;
    }

    const handleSubmit = (values: UserFormValues) => {
        mutate(
            {
                id: user.id,
                payload: {
                    companyId: values.company ? Number(values.company.id) : null,
                    documentNumber: values.documentNumber,
                    email: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    password: '',
                    role: values.role
                }
            },
            {
                onError: (submitError) =>
                    toast.error('No se pudo actualizar el usuario', {
                        description: getErrorDescription(submitError)
                    }),
                onSuccess: () => {
                    toast.success('Usuario actualizado correctamente');
                    navigate(PRIVATE_ROUTES.USERS);
                }
            }
        );
    };

    return (
        <Box maxWidth="480px">
            <PageHeader title="Editar usuario" />
            <UserForm
                errors={error ? toSerializableError(error) : null}
                initialValues={{
                    company: { id: String(user.company.id), label: user.company.name },
                    documentNumber: user.documentNumber,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    password: '',
                    role: user.role
                }}
                loading={isPending}
                mode="edit"
                onSubmit={handleSubmit}
            />
        </Box>
    );
};
