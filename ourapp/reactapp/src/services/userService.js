import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const signup = (userData) => {
    return axios.post(`${API_URL}/users`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

export const getUser = (userId) => {
  return axios.get(`${API_URL}/users/${userId}`);
};
