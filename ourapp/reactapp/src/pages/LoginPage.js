// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userId', userId);
    navigate('/reviews');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter User ID" onChange={(e) => setUserId(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate('/signup')}>Go to Signup</button>
    </div>
  );
}

export default LoginPage;
