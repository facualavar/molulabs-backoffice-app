import * as Yup from 'yup';

import { PASSWORD_MAX_LENGTH } from '@/domain/constants/form.constant';

export interface UpdatePasswordFormValues {
    confirmPassword: string;
    currentPassword: string;
    newPassword: string;
}

export const initialValues: UpdatePasswordFormValues = {
    confirmPassword: '',
    currentPassword: '',
    newPassword: ''
};

export const validationSchema = Yup.object({
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Las contraseñas no coinciden')
        .required('Confirmá la nueva contraseña'),
    currentPassword: Yup.string().required('Ingresá tu contraseña actual'),
    newPassword: Yup.string()
        .min(8, 'Debe tener al menos 8 caracteres')
        .max(PASSWORD_MAX_LENGTH)
        .required('La nueva contraseña es obligatoria')
});
