// src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../services/userService';
import './LoginPage.css'; // Import CSS specific to this page

function LoginPage() {
  const [formData, setFormData] = useState({
    caller_id: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
          (u) => u.caller_id === formData.caller_id && u.password === formData.password
        );
        if (user) {
          localStorage.setItem('userId', user.id);
          navigate('/reviews');
        } else {
          setErrorMessage('Invalid credentials');
        }
      })
      .catch((error) => {
        console.error('Login Error:', error);
        setErrorMessage('An error occurred during login');
      });
  };

  return (
    <div className="welcome-page">
      <h2>Welcome to DukeLine's Caller Summary Site</h2>
      <h5>
        This is where you can submit post-call summaries for DukeLine callers so that other DukeLine
        coaches can access a caller's profile and summaries of their past calls.
      </h5>
      <p>If this is a repeat caller, please login to their profile to continue.</p>
      <p>If this is a new caller, please create a new profile.</p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="caller_id"
            placeholder="Enter Caller ID"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-buttons">
          <button type="submit">Access Existing User Profile</button>
          <button type="button" onClick={() => navigate('/signup')}>
            Create New Caller Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
