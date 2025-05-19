// FILE: c:/Users/Kromm/Desktop/mini-proyecto/mini-proyecto/frontend/src/components/auth/LoginForm.jsx

import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log('handleSubmit: values received', values);
    try {
      await login(values);
      console.log('handleSubmit: login successful');
      setError(null);
      navigate('/productos');
    } catch (err) {
      console.error('handleSubmit: login error', err);
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setSubmitting(false);
      console.log('handleSubmit: form submission completed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
              <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
              {error && <div className="mb-4 text-sm text-center text-red-500">{error}</div>}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="username" component="div" className="text-xs italic text-red-500" />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                />
                <ErrorMessage name="password" component="div" className="text-xs italic text-red-500" />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;