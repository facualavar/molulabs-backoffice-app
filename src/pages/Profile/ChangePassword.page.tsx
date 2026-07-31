import { useUpdatePassword } from '@/hooks';

import { Box, Text } from '@/components/ui';

import { toSerializableError } from '@/domain/models/error.model';

import { UpdatePasswordForm } from './components/UpdatePasswordForm';
import type { UpdatePasswordFormValues } from './components/UpdatePasswordForm/UpdatePasswordForm.schema';

export const ChangePasswordPage = () => {
    const { error, isPending, isSuccess, mutate } = useUpdatePassword();

    const handleSubmit = (values: UpdatePasswordFormValues) => {
        mutate({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        });
    };

    return (
        <Box maxWidth="480px">
            <Text style={{ marginBottom: '1.5rem' }} variant="heading">
                Actualizar contraseña
            </Text>
            <UpdatePasswordForm
                errors={error ? toSerializableError(error) : null}
                loading={isPending}
                onSubmit={handleSubmit}
                success={isSuccess}
            />
        </Box>
    );
};
