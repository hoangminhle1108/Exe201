import axios from "axios";

const API_URL = 'https://healthmate-dpdpf4dgb2fhdubs.southeastasia-01.azurewebsites.net/api';

const userService = {
  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/User/all_users`);
    return response.data;
  },
  getAdmins: async () => {
    const response = await axios.get(`${API_URL}/User/all_users_with_role/3`);
    return response.data;
  },

  getUserByEmail: async (email) => {
    try {
      const response = await axios.get(`${API_URL}/User/all_user_by_email/${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return [];
    }
  },
};

export default userService; 