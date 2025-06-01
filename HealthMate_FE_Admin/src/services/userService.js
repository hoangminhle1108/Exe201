import axios from "axios";

const API_URL = "https://localhost:7015/api/User";

const userService = {
  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/all_users`);
    return response.data;
  },
  getAdmins: async () => {
    const response = await axios.get(`${API_URL}/all_users_with_role/3`);
    return response.data;
  }
};

export default userService; 