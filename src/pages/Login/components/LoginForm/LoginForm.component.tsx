import { useEffect, useRef } from 'react';

import { Button, Checkbox } from '@molulabs/ds';
import type { FormikProps } from 'formik';
import { Form, Formik } from 'formik';

import { Input, Stack } from '@/components/ui';

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
                            data-testid="login-form-input-password"
                            error={formik.touched.password ? formik.errors.password : undefined}
                            isRequired
                            label="Contraseña"
                            maxLength={PASSWORD_MAX_LENGTH}
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                        />

                        <div data-testid="login-form-input-remember-me">
                            <Checkbox
                                checked={formik.values.rememberMe}
                                label="Recordar mi usuario"
                                onChange={(checked) => formik.setFieldValue('rememberMe', checked)}
                            />
                        </div>

                        <Button
                            data-testid="login-form-action-submit"
                            disabled={loading}
                            style={{ width: '100%' }}
                            type="submit"
                        >
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </Button>
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};
