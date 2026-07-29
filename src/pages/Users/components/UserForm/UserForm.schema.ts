import * as Yup from 'yup';

import type { AutocompleteOption } from '@/components/ui';

import {
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    PASSWORD_MAX_LENGTH,
    REGEX_EMAIL
} from '@/domain/constants/form.constant';

export interface UserFormValues {
    company: AutocompleteOption | null;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    role: string;
}

export const emptyUserFormValues: UserFormValues = {
    company: null,
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    role: ''
};

export const buildValidationSchema = (isPasswordRequired: boolean, isCompanySelectable: boolean) =>
    Yup.object({
        company: isCompanySelectable
            ? Yup.object().nullable().required('La empresa es obligatoria')
            : Yup.object().nullable(),
        email: Yup.string()
            .matches(REGEX_EMAIL, 'Ingresá un email válido')
            .max(EMAIL_MAX_LENGTH)
            .required('El email es obligatorio'),
        firstname: Yup.string().max(NAME_MAX_LENGTH).required('El nombre es obligatorio'),
        lastname: Yup.string().max(NAME_MAX_LENGTH).required('El apellido es obligatorio'),
        password: isPasswordRequired
            ? Yup.string()
                  .min(8, 'Debe tener al menos 8 caracteres')
                  .max(PASSWORD_MAX_LENGTH)
                  .required('La contraseña es obligatoria')
            : Yup.string().max(PASSWORD_MAX_LENGTH),
        role: Yup.string().required('El rol es obligatorio')
    });
