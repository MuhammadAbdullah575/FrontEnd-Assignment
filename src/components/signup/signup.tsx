import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik, FormikValues } from 'formik';

import './signup.css';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: (values: FormikValues) => {
      console.log('form data', values);
      const item = { name: values.name, email: values.email, password: values.password };
      axios
        .post('http://localhost:3000/login/signup', item)
        .then((response) => {
          console.log(response.data);
          navigate('/login');
        });
    },
    validate: (values: FormValues) => {
      let errors: Partial<FormValues> = {};
      if (!values.name) {
        errors.name = 'Required';
      }
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email format';
      }
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 8) {
        errors.password = 'Password must be of at least 8 characters';
      }
      return errors;
    },
  });

  return (
    <div className="formfront">
      <h1 className="head">Register your Account</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
