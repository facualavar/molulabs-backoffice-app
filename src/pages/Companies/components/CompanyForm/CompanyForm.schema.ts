import * as Yup from 'yup';

import {
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    PHONE_MAX_LENGTH,
    REGEX_EMAIL
} from '@/domain/constants/form.constant';

export interface CompanyFormValues {
    documentNumber: string;
    documentType: string;
    email: string;
    name: string;
    phone: string;
}

export const emptyCompanyFormValues: CompanyFormValues = {
    documentNumber: '',
    documentType: '',
    email: '',
    name: '',
    phone: ''
};

export const validationSchema = Yup.object({
    documentNumber: Yup.string().required('El número de documento es obligatorio'),
    documentType: Yup.string().required('El tipo de documento es obligatorio'),
    email: Yup.string()
        .matches(REGEX_EMAIL, 'Ingresá un email válido')
        .max(EMAIL_MAX_LENGTH)
        .required('El email es obligatorio'),
    name: Yup.string().max(NAME_MAX_LENGTH).required('El nombre es obligatorio'),
    phone: Yup.string().max(PHONE_MAX_LENGTH).required('El teléfono es obligatorio')
});
