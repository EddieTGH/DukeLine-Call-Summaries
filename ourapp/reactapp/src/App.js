import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ReviewInteractionPage from './components/ReviewInteractionPage';
import CreateReviewPage from './components/CreateReviewPage';
import StatisticsPage from './components/StatisticsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reviews" element={<ReviewInteractionPage />} />
        <Route path="/create-review" element={<CreateReviewPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
