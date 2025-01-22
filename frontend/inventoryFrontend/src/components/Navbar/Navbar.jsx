// src/components/Navbar/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { authToken, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div>
        {authToken ? (
          <>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/create-order" style={styles.link}>Create Order</Link>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
      {authToken && (
        <div>
          <span style={styles.username}>Hello, {user}!</span>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </div>
      )}
    </nav>
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

export default Navbar;
