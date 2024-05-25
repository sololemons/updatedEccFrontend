import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
  }),
  actions: {
    async login(user) {
      this.status = 'loading';
      try {
        const response = await axios.post('/api/v1/auth/authenticate', user);
        const token = response.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.token = token;
        this.user = response.data.user;
        this.status = 'success';
      } catch (error) {
        this.status = 'error';
        localStorage.removeItem('token');
        throw error;
      }
    },
    async register(user) {
      this.status = 'loading';
      try {
        const response = await axios.post('/api/v1/auth/register', user);
        const token = response.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.token = token;
        this.user = response.data.user;
        this.status = 'success';
      } catch (error) {
        this.status = 'error';
        localStorage.removeItem('token');
        throw error;
      }
    },
    logout() {
      this.token = '';
      this.user = {};
      this.status = '';
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
});
export default useAuthStore; // Export useAuthStore as default