import React, { useState } from 'react';
import api from '../Api';

const SignupPage = ({ history }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', { user: formData });
      alert('Signup successful! Redirecting to login page.');
      history.push('/login');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        alert(error.response.data.errors.join('\n'));
      } else {
        alert('An error occurred during signup.');
      }
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password_confirmation"
        placeholder="Confirm Password"
        value={formData.password_confirmation}
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupPage;
