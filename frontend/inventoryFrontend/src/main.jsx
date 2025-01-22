// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18 and later
import App from './App';
import './index.css'; // Optional: global styles
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
