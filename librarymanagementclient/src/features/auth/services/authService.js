import axios from 'axios';
import axiosInstance from '../../../services/axiosInstance';

const API_URL = process.env.REACT_APP_API_URL;

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

export const login = async ({ email, password }) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token); // Store the token in localStorage
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/login'; // Redirect to login page
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
