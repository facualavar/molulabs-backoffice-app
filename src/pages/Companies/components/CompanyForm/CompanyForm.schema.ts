import * as Yup from 'yup';

import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, REGEX_EMAIL } from '@/domain/constants/form.constant';

export interface CompanyFormValues {
    email: string;
    name: string;
}

export const emptyCompanyFormValues: CompanyFormValues = {
    email: '',
    name: ''
};

export const validationSchema = Yup.object({
    email: Yup.string()
        .matches(REGEX_EMAIL, 'Ingresá un email válido')
        .max(EMAIL_MAX_LENGTH)
        .required('El email es obligatorio'),
    name: Yup.string().max(NAME_MAX_LENGTH).required('El nombre es obligatorio')
});
