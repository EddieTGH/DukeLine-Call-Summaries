// src/pages/UpdateReviewPage.js
import React, { useState, useEffect } from 'react';
import { getReview, updateReview } from '../services/reviewService';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateReviewPage.css'; // Import CSS specific to this page

function UpdateReviewPage() {
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

  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }

    getReview(id)
      .then((response) => {
        const reviewData = {
          ...response.data,
          date: response.data.date ? response.data.date.substring(0, 10) : '',
        };
        setFormData(reviewData);

        // Auto-resize textareas based on initial content
        setTimeout(() => {
          const textareas = document.querySelectorAll('textarea');
          textareas.forEach((textarea) => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
          });
        }, 0);
      })
      .catch((error) => {
        console.error('Error fetching review:', error);
      });
  }, [id, userId, navigate]);

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
    updateReview(id, formData)
      .then(() => {
        navigate('/reviews');
      })
      .catch((error) => {
        console.error('Error updating review:', error);
      });
  };

  return (
    <div className="container">
      <header>
        <h2>Update Call Summary</h2>
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
          <button type="submit">Update Summary</button>
          <button type="button" className="back-button" onClick={() => navigate('/reviews')}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateReviewPage;
