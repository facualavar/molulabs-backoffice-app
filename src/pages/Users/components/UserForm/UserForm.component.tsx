import { useEffect, useRef } from 'react';

import type { FormikProps } from 'formik';
import { Form, Formik } from 'formik';

import { Button, Input, Select, Stack, Text } from '@/components/ui';

import {
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    PASSWORD_MAX_LENGTH
} from '@/domain/constants/form.constant';
import type { Company } from '@/domain/models/company.model';
import type { SerializableError } from '@/domain/models/error.model';
import { USER_ROLE } from '@/domain/models/usuario.model';

import { buildValidationSchema } from './UserForm.schema';
import type { UserFormValues } from './UserForm.schema';

const ROLE_OPTIONS = [
    { label: 'Administrador', value: USER_ROLE.ADMIN },
    { label: 'Usuario', value: USER_ROLE.USER }
];

interface UserFormProps {
    companies: Company[];
    errors: null | SerializableError;
    initialValues: UserFormValues;
    loading: boolean;
    mode: 'create' | 'edit';
    onSubmit: (values: UserFormValues) => void;
}

export const UserForm = ({
    companies,
    errors,
    initialValues,
    loading,
    mode,
    onSubmit
}: UserFormProps) => {
    const formikRef = useRef<FormikProps<UserFormValues>>(null);
    const isPasswordRequired = mode === 'create';

    useEffect(() => {
        if (loading) return;
        if (errors?.fields) {
            formikRef.current?.setErrors(errors.fields);
        }
    }, [errors, loading]);

    const companyOptions = companies.map((company) => ({
        label: company.name,
        value: String(company.id)
    }));

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            innerRef={formikRef}
            onSubmit={onSubmit}
            validateOnBlur={false}
            validationSchema={buildValidationSchema(isPasswordRequired)}
        >
            {(formik) => (
                <Form>
                    <Stack gap="4">
                        <Input
                            data-testid="user-form-input-firstname"
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
                            data-testid="user-form-input-lastname"
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
                            data-testid="user-form-input-email"
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

                        {isPasswordRequired ? (
                            <Input
                                data-testid="user-form-input-password"
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
                        ) : null}

                        <Select
                            data-testid="user-form-input-company"
                            error={formik.touched.companyId ? formik.errors.companyId : undefined}
                            isRequired
                            label="Empresa"
                            name="companyId"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            options={companyOptions}
                            placeholder="Seleccioná una empresa"
                            value={formik.values.companyId}
                        />

                        <Select
                            data-testid="user-form-input-role"
                            error={formik.touched.role ? formik.errors.role : undefined}
                            isRequired
                            label="Rol"
                            name="role"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            options={ROLE_OPTIONS}
                            placeholder="Seleccioná un rol"
                            value={formik.values.role}
                        />

                        {mode === 'edit' ? (
                            <Text variant="caption">
                                La API no informa el rol actual del usuario: seleccionalo de nuevo
                                antes de guardar.
                            </Text>
                        ) : null}

                        {errors && !errors.fields ? (
                            <Text role="alert" variant="error">
                                {errors.message}
                            </Text>
                        ) : null}

                        <Button
                            data-testid="user-form-action-submit"
                            label={loading ? 'Guardando...' : 'Guardar'}
                            loading={loading}
                            type="submit"
                        />
                    </Stack>
                </Form>
            )}
        </Formik>
    );
};
