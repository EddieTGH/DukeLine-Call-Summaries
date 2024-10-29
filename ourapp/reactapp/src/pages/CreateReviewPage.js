// src/pages/CreateReviewPage.js
import React, { useState } from 'react';
import { createReview } from '../services/reviewService';
import { useNavigate } from 'react-router-dom';

function CreateReviewPage() {
  const [formData, setFormData] = useState({
    duration_call: '',
    presenting_problem: '',
    background_information: '',
    successful_techniques: '',
    unsuccessful_techniques: '',
    additional_comments: '',
  });

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview(userId, formData)
      .then(() => {
        navigate('/reviews');
      })
      .catch((error) => {
        console.error('Error creating review:', error);
      });
  };

  return (
    <div>
      <h2>Create Review</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="duration_call" placeholder="Duration Call" onChange={handleChange} required />
        <textarea name="presenting_problem" placeholder="Presenting Problem" onChange={handleChange} required />
        <textarea name="background_information" placeholder="Background Information" onChange={handleChange} />
        <textarea name="successful_techniques" placeholder="Successful Techniques" onChange={handleChange} />
        <textarea name="unsuccessful_techniques" placeholder="Unsuccessful Techniques" onChange={handleChange} />
        <textarea name="additional_comments" placeholder="Additional Comments" onChange={handleChange} />
        <button type="submit">Create Review</button>
      </form>
    </div>
  );
}

export default CreateReviewPage;
