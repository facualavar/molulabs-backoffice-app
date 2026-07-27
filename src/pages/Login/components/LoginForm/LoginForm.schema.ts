import * as Yup from 'yup';

import { REGEX_EMAIL } from '@/domain/constants/form.constant';

export interface LoginFormValues {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const initialValues: LoginFormValues = {
    email: '',
    password: '',
    rememberMe: true
};

export const validationSchema = Yup.object({
    email: Yup.string()
        .matches(REGEX_EMAIL, 'Ingresá un email válido')
        .required('El email es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria'),
    rememberMe: Yup.boolean().required()
});
