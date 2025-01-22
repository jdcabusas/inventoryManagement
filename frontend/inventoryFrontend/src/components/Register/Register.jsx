// src/components/Register/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_AUTH_URL}/register`, {
        username,
        password,
      });

      setMessage(response.data.message);
      setUsername('');
      setPassword('');
      navigate('/login'); // Redirect to Login page after registration
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred during registration.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      {message && <p style={styles.message}>{message}</p>}
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
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: '400px', margin: 'auto', padding: '20px' },
  form: { display: 'flex', flexDirection: 'column' },
  inputGroup: { marginBottom: '15px' },
  input: { width: '100%', padding: '8px', boxSizing: 'border-box' },
  button: { padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' },
  message: { color: 'green' },
  error: { color: 'red' },
};

export default Register;
