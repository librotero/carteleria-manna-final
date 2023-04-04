import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormValues } from './formValues';
import { formSchema } from './formValidation';

const MyFormComponent: React.FC = () => {
  const initialValues: FormValues = { name: '', email: '', password: '' };

  const handleSubmit = (values: FormValues, actions: any) => {
    // Aquí puedes enviar los valores del formulario al servidor, actualizar el estado de la aplicación, etc.
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={formSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Nombre:</label>
            <Field type="text" name="name" id="name" value={"hola"} />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="email">Correo:</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Contraseña:</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyFormComponent;
