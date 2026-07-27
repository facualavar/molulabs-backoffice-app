import * as Yup from 'yup';

import { REGEX_EMAIL } from '@/domain/constants/form.constant';

export interface LoginFormValues {
    contrasena: string;
    email: string;
    recordar: boolean;
}

export const initialValues: LoginFormValues = {
    contrasena: '',
    email: '',
    recordar: true
};

export const validationSchema = Yup.object({
    contrasena: Yup.string().required('La contraseña es obligatoria'),
    email: Yup.string()
        .matches(REGEX_EMAIL, 'Ingresá un email válido')
        .required('El email es obligatorio'),
    recordar: Yup.boolean().required()
});
