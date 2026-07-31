import { useCurrentUser, useUpdateProfile } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, Text } from '@/components/ui';

import { toSerializableError } from '@/domain/models/error.model';

import { ProfileForm } from './components/ProfileForm';
import type { ProfileFormValues } from './components/ProfileForm/ProfileForm.schema';

export const ProfilePage = () => {
    const { data: currentUser, isLoading } = useCurrentUser();
    const { error, isPending, isSuccess, mutate } = useUpdateProfile();

    if (isLoading || !currentUser) {
        return <LoadingScreen />;
    }

    const handleSubmit = (values: ProfileFormValues) => {
        mutate(values);
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
        </Box>
    );
};
