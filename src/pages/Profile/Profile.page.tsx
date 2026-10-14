import { PageHeader } from '@molulabs/ds';

import { useProfile, useUpdateProfile } from '@/hooks';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Box, toast } from '@/components/ui';

import { getErrorDescription, toSerializableError } from '@/domain/models/error.model';

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
            onError: (submitError) =>
                toast.error('No se pudo actualizar el perfil', {
                    description: getErrorDescription(submitError)
                }),
            onSuccess: () => toast.success('Perfil actualizado correctamente')
        });
    };

    return (
        <Box maxWidth="480px">
            <PageHeader sub="Datos de tu cuenta." title="Configurar mi usuario" />
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
