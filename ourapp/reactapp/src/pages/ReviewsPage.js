// src/pages/ReviewsPage.js
import React, { useState, useEffect } from 'react';
import { getReviews, deleteReview } from '../services/reviewService';
import { getUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import './ReviewsPage.css'; // Import CSS specific to this page

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }

    getUser(userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });

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
    <div className="container">
      <header>
        <h2>{user ? `Caller ${user.caller_id}'s Call Summaries` : ''}</h2>
      </header>
      <div className="flex-buttons">
        <button onClick={handleSignOut}>Sign Out</button>
        <button onClick={() => navigate('/reviews/create')}>Create New Call Summary</button>
      </div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p><strong>Date:</strong> {review.date}</p>
            <p><strong>Duration of Call:</strong> {review.duration_call} minutes</p>
            <p><strong>Coach's Name:</strong> {review.coach_full_name}</p>
            <p><strong>Presenting Problem:</strong> {review.presenting_problem}</p>
            <div className="flex-buttons">
              <button onClick={() => navigate(`/reviews/update/${review.id}`)}>Expand/Update</button>
              <button onClick={() => handleDelete(review.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewsPage;
