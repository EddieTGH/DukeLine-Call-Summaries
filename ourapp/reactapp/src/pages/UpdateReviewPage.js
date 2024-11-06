// src/pages/UpdateReviewPage.js
import React, { useState, useEffect } from 'react';
import { getReview, updateReview } from '../services/reviewService';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateReviewPage() {
  const [formData, setFormData] = useState({
    duration_call: '',
    presenting_problem: '',
    background_information: '',
    successful_techniques: '',
    unsuccessful_techniques: '',
    additional_comments: '',
    date: '', // Added date field
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!userId) {
      navigate('/');
      return;
    }

    getReview(id)
      .then((response) => {
        // Ensure the date is in the correct format for the input field
        const reviewData = {
          ...response.data,
          date: response.data.date ? response.data.date.substring(0, 10) : '',
        };
        setFormData(reviewData);
      })
      .catch((error) => {
        console.error('Error fetching review:', error);
      });
  }, [id, userId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    <div>
      <h2>Update Review</h2>
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
        <button type="submit">Update Review</button>
      </form>
      {/* Added "Back to Login" button */}
      <button onClick={() => navigate('/reviews')}>Back</button>
    </div>
  );
}

export default UpdateReviewPage;
