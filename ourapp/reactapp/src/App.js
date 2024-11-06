// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ReviewsPage from './pages/ReviewsPage';
import CreateReviewPage from './pages/CreateReviewPage';
import UpdateReviewPage from './pages/UpdateReviewPage';
import './App.css'; // Import the global CSS file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/reviews/create" element={<CreateReviewPage />} />
        <Route path="/reviews/update/:id" element={<UpdateReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
