// src/components/Login/Login.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext.jsx'; // Ensure correct path and extension
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext); // Access login function from context
  const navigate = useNavigate(); // Hook for navigation

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Use Vite's import.meta.env to access environment variables
      const authUrl = import.meta.env.VITE_AUTH_URL;

      const response = await axios.post(`${authUrl}/login`, {
        username,
        password,
      });

      const token = response.data.token;
      login(token); // Update auth context
      navigate('/'); // Redirect to protected route
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during login.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: 'auto', padding: '20px' },
  form: { display: 'flex', flexDirection: 'column' },
  inputGroup: { marginBottom: '15px' },
  input: { width: '100%', padding: '8px', boxSizing: 'border-box' },
  button: { padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' },
  error: { color: 'red' },
};

export default Login;
