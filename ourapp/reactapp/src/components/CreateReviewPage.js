import React, { useState } from 'react';
import api from '../Api';

const CreateReviewPage = ({ history }) => {
  const [formData, setFormData] = useState({
    duration_call: '',
    presenting_problem: '',
    background_information: '',
    successful_techniques: '',
    unsuccessful_techniques: '',
    additional_comments: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/reviews', { review: formData });
    history.push('/reviews');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add input fields for each attribute */}
      <input
        name="duration_call"
        value={formData.duration_call}
        onChange={handleChange}
        placeholder="Duration of Call"
      />
      {/* Repeat for other fields */}
      <button type="submit">Create Review</button>
    </form>
  );
};

export default CreateReviewPage;
