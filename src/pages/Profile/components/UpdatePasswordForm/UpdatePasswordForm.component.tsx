import { useEffect, useRef } from 'react';

import type { FormikProps } from 'formik';
import { Form, Formik } from 'formik';

import { Button, Input, Stack, Text } from '@/components/ui';

import { PASSWORD_MAX_LENGTH } from '@/domain/constants/form.constant';
import type { SerializableError } from '@/domain/models/error.model';

import { initialValues, validationSchema } from './UpdatePasswordForm.schema';
import type { UpdatePasswordFormValues } from './UpdatePasswordForm.schema';

interface UpdatePasswordFormProps {
    errors: null | SerializableError;
    loading: boolean;
    onSubmit: (values: UpdatePasswordFormValues) => void;
    success: boolean;
}

export const UpdatePasswordForm = ({
    errors,
    loading,
    onSubmit,
    success
}: UpdatePasswordFormProps) => {
    const formikRef = useRef<FormikProps<UpdatePasswordFormValues>>(null);

    useEffect(() => {
        if (loading) return;
        if (errors?.fields) {
            formikRef.current?.setErrors(errors.fields);
        }
    }, [errors, loading]);

    useEffect(() => {
        if (success) {
            formikRef.current?.resetForm();
        }
    }, [success]);

    return (
        <Formik
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
                            data-testid="update-password-form-input-current-password"
                            error={
                                formik.touched.currentPassword
                                    ? formik.errors.currentPassword
                                    : undefined
                            }
                            isRequired
                            label="Contraseña actual"
                            maxLength={PASSWORD_MAX_LENGTH}
                            name="currentPassword"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.currentPassword}
                        />

                        <Input
                            data-testid="update-password-form-input-new-password"
                            error={
                                formik.touched.newPassword ? formik.errors.newPassword : undefined
                            }
                            isRequired
                            label="Nueva contraseña"
                            maxLength={PASSWORD_MAX_LENGTH}
                            name="newPassword"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.newPassword}
                        />

                        <Input
                            data-testid="update-password-form-input-confirm-password"
                            error={
                                formik.touched.confirmPassword
                                    ? formik.errors.confirmPassword
                                    : undefined
                            }
                            isRequired
                            label="Confirmar nueva contraseña"
                            maxLength={PASSWORD_MAX_LENGTH}
                            name="confirmPassword"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.confirmPassword}
                        />

                        {errors && !errors.fields ? (
                            <Text role="alert" variant="error">
                                {errors.message}
                            </Text>
                        ) : null}

                        {success ? (
                            <Text variant="caption">Contraseña actualizada correctamente.</Text>
                        ) : null}

                        <Button
                            data-testid="update-password-form-action-submit"
                            label={loading ? 'Guardando...' : 'Actualizar contraseña'}
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
