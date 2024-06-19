import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
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
