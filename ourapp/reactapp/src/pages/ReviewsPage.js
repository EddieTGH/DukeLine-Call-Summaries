// src/pages/ReviewsPage.js
import React, { useState, useEffect } from 'react';
import { getReviews, deleteReview } from '../services/reviewService';
import { useNavigate } from 'react-router-dom';

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!userId) {
      navigate('/');
      return;
    }

    getReviews(userId)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
      });
  }, [userId, navigate]);

  const handleDelete = (reviewId) => {
    deleteReview(reviewId)
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== reviewId));
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div>
      <h2>Your Reviews</h2>
      <button onClick={handleSignOut}>Sign Out</button>
      <button onClick={() => navigate('/reviews/create')}>Create New Review</button>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>Date: {review.date}</p>
            <p>Duration Call: {review.duration_call}</p>
            <p>Presenting Problem: {review.presenting_problem}</p>
            <p>Background Information: {review.background_information}</p>
            <p>Successful Techniques: {review.successful_techniques}</p>
            <p>Unsuccessful Techniques: {review.unsuccessful_techniques}</p>
            <p>Additional Comments: {review.additional_comments}</p>
            <button onClick={() => navigate(`/reviews/update/${review.id}`)}>Update</button>
            <button onClick={() => handleDelete(review.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewsPage;
