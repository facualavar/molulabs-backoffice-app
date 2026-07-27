import { useEffect, useRef } from 'react';

import type { FormikProps } from 'formik';
import { Form, Formik } from 'formik';
import { css } from 'styled-system/css';

import { EMAIL_MAX_LENGTH, PASSWORD_MAX_LENGTH } from '@/domain/constants/form.constant';
import type { SerializableError } from '@/domain/models/error.model';

import { initialValues, validationSchema } from './LoginForm.schema';
import type { LoginFormValues } from './LoginForm.schema';

interface LoginFormProps {
    errors: null | SerializableError;
    loading: boolean;
    onSubmit: (values: LoginFormValues) => void;
}

const fieldClass = css({ display: 'flex', flexDirection: 'column', gap: '1' });
const inputClass = css({
    border: '1px solid',
    borderColor: 'gray.300',
    borderRadius: 'md',
    fontSize: 'sm',
    padding: '2'
});
const errorTextClass = css({ color: 'red.600', fontSize: 'xs' });

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
                <Form className={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
                    <label className={fieldClass}>
                        Email
                        <input
                            className={inputClass}
                            data-testid="login-form-input-email"
                            maxLength={EMAIL_MAX_LENGTH}
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <span className={errorTextClass}>{formik.errors.email}</span>
                        ) : null}
                    </label>

                    <label className={fieldClass}>
                        Contraseña
                        <input
                            className={inputClass}
                            data-testid="login-form-input-contrasena"
                            maxLength={PASSWORD_MAX_LENGTH}
                            name="contrasena"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.contrasena}
                        />
                        {formik.touched.contrasena && formik.errors.contrasena ? (
                            <span className={errorTextClass}>{formik.errors.contrasena}</span>
                        ) : null}
                    </label>

                    <label
                        className={css({
                            alignItems: 'center',
                            display: 'flex',
                            fontSize: 'sm',
                            gap: '2'
                        })}
                    >
                        <input
                            checked={formik.values.recordar}
                            data-testid="login-form-input-recordar"
                            name="recordar"
                            onChange={formik.handleChange}
                            type="checkbox"
                        />
                        Recordar mi usuario
                    </label>

                    {errors && !errors.fields ? (
                        <span className={errorTextClass} role="alert">
                            {errors.message}
                        </span>
                    ) : null}

                    <button
                        className={css({
                            background: 'blue.600',
                            borderRadius: 'md',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 'medium',
                            padding: '2'
                        })}
                        data-testid="login-form-action-submit"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? 'Ingresando...' : 'Ingresar'}
                    </button>
                </Form>
            )}
        </Formik>
    );
};
