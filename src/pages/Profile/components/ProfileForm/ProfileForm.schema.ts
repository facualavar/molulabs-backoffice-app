import * as Yup from 'yup';

import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, REGEX_EMAIL } from '@/domain/constants/form.constant';

export interface ProfileFormValues {
    documentNumber: string;
    email: string;
    firstname: string;
    lastname: string;
}

export const validationSchema = Yup.object({
    documentNumber: Yup.string().required('El número de documento es obligatorio'),
    email: Yup.string()
        .matches(REGEX_EMAIL, 'Ingresá un email válido')
        .max(EMAIL_MAX_LENGTH)
        .required('El email es obligatorio'),
    firstname: Yup.string().max(NAME_MAX_LENGTH).required('El nombre es obligatorio'),
    lastname: Yup.string().max(NAME_MAX_LENGTH).required('El apellido es obligatorio')
});
