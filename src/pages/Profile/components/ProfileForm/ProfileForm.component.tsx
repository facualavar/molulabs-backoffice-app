import { useEffect, useRef } from 'react';

import type { FormikProps } from 'formik';
import { Form, Formik } from 'formik';

import { Button, Input, Stack } from '@/components/ui';

import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH } from '@/domain/constants/form.constant';
import type { SerializableError } from '@/domain/models/error.model';

import { validationSchema } from './ProfileForm.schema';
import type { ProfileFormValues } from './ProfileForm.schema';

interface ProfileFormProps {
    errors: null | SerializableError;
    initialValues: ProfileFormValues;
    loading: boolean;
    onSubmit: (values: ProfileFormValues) => void;
}

export const ProfileForm = ({ errors, initialValues, loading, onSubmit }: ProfileFormProps) => {
    const formikRef = useRef<FormikProps<ProfileFormValues>>(null);

    useEffect(() => {
        if (loading) return;
        if (errors?.fields) {
            formikRef.current?.setErrors(errors.fields);
        }
    }, [errors, loading]);

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            innerRef={formikRef}
            onSubmit={onSubmit}
            validateOnBlur={false}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <Form>
                    <Stack gap="4">
                        <Input
                            data-testid="profile-form-input-firstname"
                            error={formik.touched.firstname ? formik.errors.firstname : undefined}
                            isRequired
                            label="Nombre"
                            maxLength={NAME_MAX_LENGTH}
                            name="firstname"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.firstname}
                        />

                        <Input
                            data-testid="profile-form-input-lastname"
                            error={formik.touched.lastname ? formik.errors.lastname : undefined}
                            isRequired
                            label="Apellido"
                            maxLength={NAME_MAX_LENGTH}
                            name="lastname"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.lastname}
                        />

                        <Input
                            data-testid="profile-form-input-email"
                            error={formik.touched.email ? formik.errors.email : undefined}
                            isRequired
                            label="Email"
                            maxLength={EMAIL_MAX_LENGTH}
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                        />

                        <Input
                            data-testid="profile-form-input-document-number"
                            error={
                                formik.touched.documentNumber
                                    ? formik.errors.documentNumber
                                    : undefined
                            }
                            isRequired
                            label="Número de documento"
                            name="documentNumber"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.documentNumber}
                        />

                        <Button
                            data-testid="profile-form-action-submit"
                            label={loading ? 'Guardando...' : 'Guardar cambios'}
                            loading={loading}
                            size="sm"
                            type="submit"
                        />
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};
