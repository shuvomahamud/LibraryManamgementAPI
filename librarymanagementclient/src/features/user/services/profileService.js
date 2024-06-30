import axiosInstance from '../../../services/axiosInstance';

const getUserProfile = async () => {
  try {
    var userId = localStorage.getItem('userId').trim()
    const response = await axiosInstance.get(`/user/profile/?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

const updateUserProfile = async (user) => {
  try {
    var userId = localStorage.getItem('userId').trim()
    const response = await axiosInstance.put(`/user/profile/?userId=${userId}`, user);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

const profileService = {
  getUserProfile,
  updateUserProfile,
};

export default profileService;
