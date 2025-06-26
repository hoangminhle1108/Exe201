import axios from 'axios';

const API_URL = 'https://healthmate-dpdpf4dgb2fhdubs.southeastasia-01.azurewebsites.net/api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/Auth/login`, {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpires', response.data.expires);

        const tokenPayload = JSON.parse(atob(response.data.token.split('.')[1]));
        localStorage.setItem('userRole', tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

        return {
          success: true,
          role: tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        };
      }
      return { success: false, message: 'Login failed' };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'An error occurred during login'
      };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpires');
    localStorage.removeItem('userRole');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        email: payload.email,
        role: payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      };
    } catch (error) {
      return null;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const expires = localStorage.getItem('tokenExpires');

    if (!token || !expires) return false;

    return new Date(expires) > new Date();
  },

};

export default authService; 