import { useNavigate, useParams } from 'react-router';

import { useCompany, useCurrentUser, useUpdateUser, useUser } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Text } from '@/components/ui';

import { PRIVATE_ROUTES } from '@/domain/constants/routes.constant';
import { toSerializableError } from '@/domain/models/error.model';
import { SUPERADMIN_ROLE } from '@/domain/models/usuario.model';

import { UserForm } from './components/UserForm';
import type { UserFormValues } from './components/UserForm/UserForm.schema';

export const UserEditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: currentUser } = useCurrentUser();
    const isSuperAdmin = currentUser?.role === SUPERADMIN_ROLE;
    const { data: user, isLoading: isUserLoading } = useUser(Number(id));
    const { data: company, isLoading: isCompanyLoading } = useCompany(
        isSuperAdmin ? (user?.companyId ?? NaN) : NaN
    );
    const { error, isPending, mutate } = useUpdateUser();

    if (isUserLoading || !user || (isSuperAdmin && (isCompanyLoading || !company))) {
        return <LoadingScreen />;
    }

    const handleSubmit = (values: UserFormValues) => {
        mutate(
            {
                id: user.id,
                payload: {
                    companyId: values.company ? Number(values.company.id) : null,
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
                    company: company ? { id: String(company.id), label: company.name } : null,
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
