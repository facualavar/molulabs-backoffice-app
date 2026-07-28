import { useCurrentUser, useUpdatePassword, useUpdateProfile } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Text } from '@/components/ui';

import { toSerializableError } from '@/domain/models/error.model';

import { ProfileForm } from './components/ProfileForm';
import type { ProfileFormValues } from './components/ProfileForm/ProfileForm.schema';
import { UpdatePasswordForm } from './components/UpdatePasswordForm';
import type { UpdatePasswordFormValues } from './components/UpdatePasswordForm/UpdatePasswordForm.schema';

export const ProfilePage = () => {
    const { data: currentUser, isLoading } = useCurrentUser();
    const { error, isPending, isSuccess, mutate } = useUpdateProfile();
    const {
        error: passwordError,
        isPending: isPasswordPending,
        isSuccess: isPasswordSuccess,
        mutate: mutatePassword
    } = useUpdatePassword();

    if (isLoading || !currentUser) {
        return <LoadingScreen />;
    }

    const handleSubmit = (values: ProfileFormValues) => {
        mutate(values);
    };

    const handleSubmitPassword = (values: UpdatePasswordFormValues) => {
        mutatePassword({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword
        });
    };

    return (
        <Box maxWidth="480px">
            <Text style={{ marginBottom: '1.5rem' }} variant="heading">
                Mi perfil
            </Text>
            <ProfileForm
                errors={error ? toSerializableError(error) : null}
                initialValues={{
                    email: currentUser.email,
                    firstname: currentUser.firstname,
                    lastname: currentUser.lastname
                }}
                loading={isPending}
                onSubmit={handleSubmit}
                success={isSuccess}
            />

            <Text style={{ marginBottom: '1.5rem', marginTop: '3rem' }} variant="heading">
                Actualizar contraseña
            </Text>
            <UpdatePasswordForm
                errors={passwordError ? toSerializableError(passwordError) : null}
                loading={isPasswordPending}
                onSubmit={handleSubmitPassword}
                success={isPasswordSuccess}
            />
        </Box>
    );
};
