// src/pages/ReviewsPage.js

import React, { useState, useEffect } from 'react';
import { getReviews, deleteReview, getSummaries } from '../services/reviewService';
import { getUser } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import './ReviewsPage.css'; // Import CSS specific to this page

function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [summaries, setSummaries] = useState(null); // State for summaries
  const [error, setError] = useState(null); // State for error handling
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/');
      return;
    }

    // Fetch user data
    getUser(userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setError('Error fetching user data.');
      });

    // Fetch reviews
    getReviews(userId)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching reviews:', error);
        setError('Error fetching reviews.');
      });

    // Fetch summaries
    getSummaries(userId)
      .then((response) => {
        setSummaries(response.data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error('Error fetching summaries:', error);
        if (error.response && error.response.status === 429) {
          setError('Rate limit exceeded. Please try again later.');
        } else {
          setError('Unable to fetch summaries at this time. Please try again later.');
        }
      });
  }, [userId, navigate]);

  const handleDelete = (reviewId) => {
    deleteReview(reviewId)
      .then(() => {
        // Remove the deleted review from the state
        setReviews(reviews.filter((review) => review.id !== reviewId));

        // Re-fetch summaries after deletion to keep them updated
        getSummaries(userId)
          .then((response) => {
            setSummaries(response.data);
            setError(null); // Clear any previous errors
          })
          .catch((error) => {
            console.error('Error fetching summaries:', error);
            if (error.response && error.response.status === 429) {
              setError('Rate limit exceeded. Please try again later.');
            } else {
              setError('Unable to fetch summaries at this time. Please try again later.');
            }
          });
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
        setError('Error deleting review.');
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <div className="container">
      <header>
        <h2>{user ? `Caller ${user.caller_id}'s Call Summaries` : 'Call Summaries'}</h2>
      </header>
      <div className="flex-buttons">
        <button onClick={handleSignOut}>Sign Out</button>
        <button onClick={() => navigate('/reviews/create')}>Create New Call Summary</button>
      </div>

      {/* Display error message if any */}
      {error && <p className="error-message">{error}</p>}

      {/* Display summaries */}
      {summaries && !error && (
        <div className="summaries">
          <h3>Client Summary</h3>
          <p><strong>Client Overview:</strong> {summaries.background_information_summary}</p>
          <p><strong>Client Struggles:</strong> {summaries.presenting_problem_summary}</p>
          <p><strong>Successful Strategies:</strong> {summaries.successful_techniques_summary}</p>
          <p><strong>Unsuccessful Strategies:</strong> {summaries.unsuccessful_techniques_summary}</p>
        </div>
      )}

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
