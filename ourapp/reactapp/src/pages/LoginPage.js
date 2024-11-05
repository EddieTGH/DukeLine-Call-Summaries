// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/userService';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any existing user session
    localStorage.removeItem('userId');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getUsers()
      .then((response) => {
        const users = response.data;
        const user = users.find(
          (u) => u.email === formData.email && u.password === formData.password
        );
        if (user) {
          localStorage.setItem('userId', user.id);
          navigate('/reviews');
        } else {
          setErrorMessage('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);
        setErrorMessage('An error occurred during login');
      });
  };

  return (
    <div>
      <h2>Login Page</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/signup')}>Go to Signup</button>
    </div>
  );
}

export default LoginPage;
