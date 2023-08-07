// ProtectedRoutes.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = (props) => {
  const { children } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  },);

  return <div>{children}</div>;
};

export default ProtectedRoutes;
