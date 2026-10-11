import { useUpdatePassword } from '@/hooks';

import { Box, Text, toast } from '@/components/ui';

import { toSerializableError } from '@/domain/models/error.model';

import { UpdatePasswordForm } from './components/UpdatePasswordForm';
import type { UpdatePasswordFormValues } from './components/UpdatePasswordForm/UpdatePasswordForm.schema';

export const ChangePasswordPage = () => {
    const { error, isPending, isSuccess, mutate } = useUpdatePassword();

    const handleSubmit = (values: UpdatePasswordFormValues) => {
        mutate(
            {
                currentPassword: values.currentPassword,
                newPassword: values.newPassword
            },
            {
                onError: (submitError) =>
                    toast.error('No se pudo actualizar la contraseña', {
                        description: toSerializableError(submitError).message
                    }),
                onSuccess: () => toast.success('Contraseña actualizada correctamente')
            }
        );
    };

    return (
        <Box maxWidth="480px">
            <Text style={{ marginBottom: '1.5rem' }} variant="title">
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
