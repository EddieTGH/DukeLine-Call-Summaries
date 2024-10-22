import React, { useEffect, useState } from 'react';
import api from '../Api';

const StatisticsPage = () => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await api.get('/reviews/statistics');
      setStatistics(response.data);
    };
    fetchStatistics();
  }, []);

  return (
    <div>
      <h1>Statistics</h1>
      <p>Most Common Successful Technique: {statistics.most_common_successful_technique}</p>
      <p>Most Common Unsuccessful Technique: {statistics.most_common_unsuccessful_technique}</p>
      <p>Most Common Presenting Problem: {statistics.most_common_presenting_problem}</p>
    </div>
  );
};

export default StatisticsPage;
