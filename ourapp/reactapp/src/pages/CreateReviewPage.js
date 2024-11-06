// src/pages/CreateReviewPage.js
import React, { useState, useEffect } from 'react';
import { createReview } from '../services/reviewService';
import { useNavigate } from 'react-router-dom';
import './CreateReviewPage.css'; // Import CSS specific to this page

function CreateReviewPage() {
  const [formData, setFormData] = useState({
    duration_call: '',
    presenting_problem: '',
    background_information: '',
    successful_techniques: '',
    unsuccessful_techniques: '',
    additional_comments: '',
    date: '',
    coach_full_name: '',
    coach_email_address: '',
  });

  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to auto-resize textarea
  const autoResizeTextarea = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
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
    <div className="container">
      <header>
        <h2>Create New Call Summary</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration of Call (minutes):</label>
          <input
            type="number"
            name="duration_call"
            value={formData.duration_call}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Coach's Full Name:</label>
          <input
            type="text"
            name="coach_full_name"
            value={formData.coach_full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Coach's Email Address:</label>
          <input
            type="email"
            name="coach_email_address"
            value={formData.coach_email_address}
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
            onInput={autoResizeTextarea}
            required
          />
        </div>
        <div>
          <label>Background Information:</label>
          <textarea
            name="background_information"
            value={formData.background_information}
            onChange={handleChange}
            onInput={autoResizeTextarea}
          />
        </div>
        <div>
          <label>Successful Techniques:</label>
          <textarea
            name="successful_techniques"
            value={formData.successful_techniques}
            onChange={handleChange}
            onInput={autoResizeTextarea}
          />
        </div>
        <div>
          <label>Unsuccessful Techniques:</label>
          <textarea
            name="unsuccessful_techniques"
            value={formData.unsuccessful_techniques}
            onChange={handleChange}
            onInput={autoResizeTextarea}
          />
        </div>
        <div>
          <label>Additional Comments:</label>
          <textarea
            name="additional_comments"
            value={formData.additional_comments}
            onChange={handleChange}
            onInput={autoResizeTextarea}
          />
        </div>
        <div className="flex-buttons">
          <button type="submit">Create Call Summary</button>
          <button type="button" className="back-button" onClick={() => navigate('/reviews')}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateReviewPage;
