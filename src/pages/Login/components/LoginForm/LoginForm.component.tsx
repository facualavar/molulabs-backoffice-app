import { useEffect, useRef } from 'react';

import type { FormikProps } from 'formik';
import { Form, Formik } from 'formik';

import { Button, Checkbox, Input, Stack, Text } from '@/components/ui';

import { EMAIL_MAX_LENGTH, PASSWORD_MAX_LENGTH } from '@/domain/constants/form.constant';
import type { SerializableError } from '@/domain/models/error.model';

import { initialValues, validationSchema } from './LoginForm.schema';
import type { LoginFormValues } from './LoginForm.schema';

interface LoginFormProps {
    errors: null | SerializableError;
    loading: boolean;
    onSubmit: (values: LoginFormValues) => void;
}

export const LoginForm = ({ errors, loading, onSubmit }: LoginFormProps) => {
    const formikRef = useRef<FormikProps<LoginFormValues>>(null);

    useEffect(() => {
        if (loading) return;
        if (errors?.fields) {
            formikRef.current?.setErrors(errors.fields);
        }
    }, [errors, loading]);

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
                            data-testid="login-form-input-email"
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
                            data-testid="login-form-input-contrasena"
                            error={formik.touched.contrasena ? formik.errors.contrasena : undefined}
                            isRequired
                            label="Contraseña"
                            maxLength={PASSWORD_MAX_LENGTH}
                            name="contrasena"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.contrasena}
                        />

                        <Checkbox
                            checked={formik.values.recordar}
                            data-testid="login-form-input-recordar"
                            id="input-recordar"
                            label="Recordar mi usuario"
                            name="recordar"
                            onChange={formik.handleChange}
                        />

                        {errors && !errors.fields ? (
                            <Text role="alert" variant="error">
                                {errors.message}
                            </Text>
                        ) : null}

                        <Button
                            data-testid="login-form-action-submit"
                            fullWidth
                            label={loading ? 'Ingresando...' : 'Ingresar'}
                            loading={loading}
                            type="submit"
                        />
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};
