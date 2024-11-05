// src/pages/CreateReviewPage.js
import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!userId) {
      navigate('/');
    }
  }, [userId, navigate]);

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
        <div>
          <label>Duration Call:</label>
          <input
            type="number"
            name="duration_call"
            value={formData.duration_call}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Presenting Problem:</label>
          <textarea
            name="presenting_problem"
            value={formData.presenting_problem}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Background Information:</label>
          <textarea
            name="background_information"
            value={formData.background_information}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Successful Techniques:</label>
          <textarea
            name="successful_techniques"
            value={formData.successful_techniques}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Unsuccessful Techniques:</label>
          <textarea
            name="unsuccessful_techniques"
            value={formData.unsuccessful_techniques}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Additional Comments:</label>
          <textarea
            name="additional_comments"
            value={formData.additional_comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Review</button>
      </form>
    </div>
  );
}

export default CreateReviewPage;
