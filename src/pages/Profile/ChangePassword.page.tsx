import { PageHeader } from '@molulabs/ds';

import { useUpdatePassword } from '@/hooks';

import { Box, toast } from '@/components/ui';

import { getErrorDescription, toSerializableError } from '@/domain/models/error.model';

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
                        description: getErrorDescription(submitError)
                    }),
                onSuccess: () => toast.success('Contraseña actualizada correctamente')
            }
        );
    };

    return (
        <Box maxWidth="480px">
            <PageHeader sub="Actualizá la contraseña de tu cuenta." title="Cambiar contraseña" />
            <UpdatePasswordForm
                errors={error ? toSerializableError(error) : null}
                loading={isPending}
                onSubmit={handleSubmit}
                success={isSuccess}
            />
        </Box>
    );
};
