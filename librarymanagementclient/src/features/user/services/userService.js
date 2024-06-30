import axiosInstance from '../../../services/axiosInstance';

const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

const userService = {
  getAllUsers,
  deleteUser,
};

export default userService;
