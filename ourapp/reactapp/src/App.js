// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ReviewsPage from './pages/ReviewsPage';
import CreateReviewPage from './pages/CreateReviewPage';
import UpdateReviewPage from './pages/UpdateReviewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reviews/create" element={<CreateReviewPage />} />
        <Route path="/reviews/update/:id" element={<UpdateReviewPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
