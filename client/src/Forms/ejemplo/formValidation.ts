import * as Yup from 'yup';
import { FormValues } from './formValues';

export const formSchema = Yup.object().shape<FormValues>({
  name: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('Debe ser un correo válido').required('El correo es requerido'),
  password: Yup.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es requerida'),
});
