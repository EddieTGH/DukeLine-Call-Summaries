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
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getReview(id)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching review:', error);
      });
  }, [id]);

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
        <input
          type="number"
          name="duration_call"
          value={formData.duration_call}
          onChange={handleChange}
          required
        />
        <textarea
          name="presenting_problem"
          value={formData.presenting_problem}
          onChange={handleChange}
          required
        />
        {/* Other fields */}
        <button type="submit">Update Review</button>
      </form>
    </div>
  );
}

export default UpdateReviewPage;
