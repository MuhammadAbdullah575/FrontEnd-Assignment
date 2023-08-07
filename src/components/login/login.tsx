import React from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { toast } from "react-toastify";
import "./login.css";

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  let navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("form data", values);
      const users = { email: values.email, password: values.password };
      axios
        .post("http://localhost:3000/login/signin", users)
        .then((response) => {
          if(response.data.token){
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          axios.defaults.headers.common['token'] = localStorage.getItem('token');
          navigate("/");
          }
          else{
          
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_LEFT,
            });
            navigate("/login");
          }
        });
    },
    validate: (values) => {
      let errors: Partial<FormValues> = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email format";
      }
      if (!values.password) {
        errors.password = "Required";
      } 
      return errors;
    }
  });

  return (
    <div className="formfront">
      <h1 className="head">
        Login
      </h1>
      <form onSubmit={formik.handleSubmit}>
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

export default Login;
