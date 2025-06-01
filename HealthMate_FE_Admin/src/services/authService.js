import axios from 'axios';

const API_URL = 'https://localhost:7015/api/Auth';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });

      if (response.data.token) {
        // Store token and user info in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenExpires', response.data.expires);
        
        // Decode JWT token to get user role
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
    
    // Check if token is expired
    return new Date(expires) > new Date();
  }
};

export default authService; 