// src/components/PrivateRoute/PrivateRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);

  // If token exists, render the children components
  // Otherwise, redirect to login
  return authToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
