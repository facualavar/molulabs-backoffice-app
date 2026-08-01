import { useEffect, useRef } from 'react';

import type { FormikProps } from 'formik';
import { Form, Formik } from 'formik';

import { Button, Input, Select, Stack, Text } from '@/components/ui';

import {
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    PHONE_MAX_LENGTH
} from '@/domain/constants/form.constant';
import { DOCUMENT_TYPE, DOCUMENT_TYPE_LABEL } from '@/domain/models/company.model';
import type { SerializableError } from '@/domain/models/error.model';

import { validationSchema } from './CompanyForm.schema';
import type { CompanyFormValues } from './CompanyForm.schema';

const DOCUMENT_TYPE_OPTIONS = Object.values(DOCUMENT_TYPE).map((value) => ({
    label: DOCUMENT_TYPE_LABEL[value],
    value
}));

interface CompanyFormProps {
    errors: null | SerializableError;
    initialValues: CompanyFormValues;
    loading: boolean;
    onSubmit: (values: CompanyFormValues) => void;
    success?: boolean;
}

export const CompanyForm = ({
    errors,
    initialValues,
    loading,
    onSubmit,
    success
}: CompanyFormProps) => {
    const formikRef = useRef<FormikProps<CompanyFormValues>>(null);

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
                            data-testid="company-form-input-name"
                            error={formik.touched.name ? formik.errors.name : undefined}
                            isRequired
                            label="Nombre"
                            maxLength={NAME_MAX_LENGTH}
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />

                        <Input
                            data-testid="company-form-input-email"
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
                            data-testid="company-form-input-phone"
                            error={formik.touched.phone ? formik.errors.phone : undefined}
                            isRequired
                            label="Teléfono"
                            maxLength={PHONE_MAX_LENGTH}
                            name="phone"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />

                        <Select
                            data-testid="company-form-input-document-type"
                            error={
                                formik.touched.documentType ? formik.errors.documentType : undefined
                            }
                            isRequired
                            label="Tipo de documento"
                            onBlur={() => formik.setFieldTouched('documentType')}
                            onChange={(value) => formik.setFieldValue('documentType', value)}
                            options={DOCUMENT_TYPE_OPTIONS}
                            placeholder="Seleccioná un tipo"
                            value={formik.values.documentType}
                        />

                        <Input
                            data-testid="company-form-input-document-number"
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

                        {errors && !errors.fields ? (
                            <Text role="alert" variant="error">
                                {errors.message}
                            </Text>
                        ) : null}

                        {success ? (
                            <Text variant="caption">Empresa actualizada correctamente.</Text>
                        ) : null}

                        <Button
                            data-testid="company-form-action-submit"
                            label={loading ? 'Guardando...' : 'Guardar'}
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
