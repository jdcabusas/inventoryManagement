// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TableComponent from './components/Table/Table';
import CreateOrder from './components/OrderCreation/CreateOrder';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import { AuthContext } from './context/AuthContext.jsx';

const App = () => {
  const { authToken, logout, user } = useContext(AuthContext);

  return (
    <Router>
      {/* Navigation Bar */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!authToken ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!authToken ? <Register /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <TableComponent />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-order"
          element={
            <PrivateRoute>
              <CreateOrder />
            </PrivateRoute>
          }
        />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const styles = {
  nav: {
    padding: '10px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: { marginRight: '10px', textDecoration: 'none', color: '#007bff' },
  button: { padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer' },
  username: { marginRight: '10px' },
};

export default App;
