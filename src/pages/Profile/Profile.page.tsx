import { useProfile, useUpdateProfile } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Text, toast } from '@/components/ui';

import { toSerializableError } from '@/domain/models/error.model';

import { ProfileForm } from './components/ProfileForm';
import type { ProfileFormValues } from './components/ProfileForm/ProfileForm.schema';

export const ProfilePage = () => {
    const { data: profile, isLoading } = useProfile();
    const { error, isPending, mutate } = useUpdateProfile();

    if (isLoading || !profile) {
        return <LoadingScreen />;
    }

    const handleSubmit = (values: ProfileFormValues) => {
        mutate(values, {
            onError: (submitError) => toast.error(toSerializableError(submitError).message),
            onSuccess: () => toast.success('Perfil actualizado correctamente')
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
                    documentNumber: profile.documentNumber,
                    email: profile.email,
                    firstname: profile.firstname,
                    lastname: profile.lastname
                }}
                loading={isPending}
                onSubmit={handleSubmit}
            />
        </Box>
    );
};
