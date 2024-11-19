import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getReviews = (userId) => {
  return axios.get(`${API_URL}/users/${userId}/reviews`);
};

export const createReview = (userId, reviewData) => {
  return axios.post(`${API_URL}/users/${userId}/reviews`, reviewData);
};

export const getReview = (reviewId) => {
  return axios.get(`${API_URL}/reviews/${reviewId}`);
};

export const updateReview = (reviewId, reviewData) => {
  return axios.put(`${API_URL}/reviews/${reviewId}`, reviewData);
};

export const deleteReview = (reviewId) => {
  return axios.delete(`${API_URL}/reviews/${reviewId}`);
};

// New function to get summaries
export const getSummaries = (userId) => {
  return axios.get(`${API_URL}/users/${userId}/reviews/summary`);
};