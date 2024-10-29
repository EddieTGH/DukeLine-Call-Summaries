// src/pages/SignupPage.js
import React, { useState } from 'react';
import { signup } from '../services/userService';
import { useNavigate } from 'react-router-dom';

console.log('Imported signup function:', signup);

function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const navigate = useNavigate();

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
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
