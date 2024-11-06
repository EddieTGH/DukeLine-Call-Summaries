// src/pages/SignupPage.js
import React, { useState, useEffect } from 'react';
import { signup } from '../services/userService';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [formData, setFormData] = useState({
    caller_id: '',
    password: '',
  });

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
    <div>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="caller_id"
          placeholder="Caller ID"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {/* Added "Back to Login" button */}
      <button onClick={() => navigate('/')}>Back to Login</button>
    </div>
  );
}

export default SignupPage;
