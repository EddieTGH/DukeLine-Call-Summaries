import React, { useEffect, useState } from 'react';
import api from '../Api';
import { Link } from 'react-router-dom';

const ReviewInteractionPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const response = await api.get('/reviews');
    setReviews(response.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/reviews/${id}`);
    fetchReviews();
  };

  return (
    <div>
      <h1>Your Reviews</h1>
      <Link to="/create-review">Create New Review</Link>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.presenting_problem}
            <button onClick={() => handleDelete(review.id)}>Delete</button>
            {/* Implement update functionality */}
          </li>
        ))}
      </ul>
      <Link to="/statistics">View Statistics</Link>
    </div>
  );
};

export default ReviewInteractionPage;
