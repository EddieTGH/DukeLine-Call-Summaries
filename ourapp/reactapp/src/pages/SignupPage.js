// src/pages/SignupPage.js
import React, { useState, useEffect } from 'react';
import { signup } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // Import CSS specific to this page

function SignupPage() {
  const [formData, setFormData] = useState({
    caller_id: '',
    password: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('userId');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData)
      .then((response) => {
        localStorage.setItem('userId', response.data.id);
        navigate('/reviews');
      })
      .catch((error) => {
        console.error('Signup Error:', error);
      });
  };

  return (
    <div className="container">
      <header>
        <h2>Create New Caller Profile</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Caller ID:</label>
          <input
            type="text"
            name="caller_id"
            placeholder="Caller ID"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-buttons">
          <button type="submit">Signup</button>
          <button type="button" className="back-button" onClick={() => navigate('/')}>
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
