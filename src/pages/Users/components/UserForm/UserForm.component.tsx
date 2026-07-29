import { useEffect, useRef, useState } from 'react';

import type { FormikProps } from 'formik';
import { Form, Formik } from 'formik';

import { useCompanies } from '@/hooks';

import { Autocomplete, Button, Input, Select, Stack, Text } from '@/components/ui';

import {
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    PASSWORD_MAX_LENGTH
} from '@/domain/constants/form.constant';
import { MIN_SEARCH_CHARS } from '@/domain/constants/search.constant';
import type { SerializableError } from '@/domain/models/error.model';
import { USER_ROLE } from '@/domain/models/usuario.model';

import { buildValidationSchema } from './UserForm.schema';
import type { UserFormValues } from './UserForm.schema';

const ROLE_OPTIONS = [
    { label: 'Administrador', value: USER_ROLE.ADMIN },
    { label: 'Usuario', value: USER_ROLE.USER }
];

interface UserFormProps {
    errors: null | SerializableError;
    initialValues: UserFormValues;
    loading: boolean;
    mode: 'create' | 'edit';
    onSubmit: (values: UserFormValues) => void;
}

export const UserForm = ({ errors, initialValues, loading, mode, onSubmit }: UserFormProps) => {
    const formikRef = useRef<FormikProps<UserFormValues>>(null);
    const isPasswordRequired = mode === 'create';
    const [companySearch, setCompanySearch] = useState('');

    const { data: companiesPage, isFetching: isCompaniesFetching } = useCompanies(
        { limit: 20, name: companySearch },
        companySearch.length >= MIN_SEARCH_CHARS
    );
    const companyOptions = (companiesPage?.data ?? []).map((company) => ({
        id: String(company.id),
        label: company.name
    }));

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

                        <Autocomplete
                            data-testid="user-form-input-company"
                            error={
                                formik.touched.company
                                    ? (formik.errors.company as string | undefined)
                                    : undefined
                            }
                            isRequired
                            label="Empresa"
                            loading={isCompaniesFetching}
                            minChars={MIN_SEARCH_CHARS}
                            name="company"
                            onSearch={setCompanySearch}
                            onSelect={(option) => formik.setFieldValue('company', option)}
                            options={companyOptions}
                            placeholder="Buscar empresa..."
                            value={formik.values.company}
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
