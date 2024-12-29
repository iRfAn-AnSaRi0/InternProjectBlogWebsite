import axios from 'axios';
import Refreshtoken from '../utils/refreshtoken';

const API = axios.create({
  baseURL: 'http://localhost:8000/',
  withCredentials: true,  // Allows sending cookies (for refresh tokens)
});

// Attach access token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('AccessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Handle token expiration and refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await Refreshtoken();
      if (newAccessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default API;