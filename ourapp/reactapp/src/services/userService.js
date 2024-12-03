// src/services/userService.js
import axios from 'axios';

//const API_URL_local = 'http://localhost:3000';
const API_URL = process.env.REACT_APP_API_URL;


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

// Added getUsers function
export const getUsers = () => {
  return axios.get(`${API_URL}/users`);
};
