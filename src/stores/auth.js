import { defineStore } from 'pinia';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: {},
    status: '',
    cartItems: [], // New state to store cart items
  }),
  actions: {
    async login(credentials) {
      this.status = 'loading';
      try {
        const response = await axios.post('/api/v1/auth/authenticate', credentials);
        const token = response.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.token = token;
        this.user = response.data.user;
        this.status = 'success';

        // Clear cart items on successful login
        this.clearCartItems();
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

        // Clear cart items on successful registration
        this.clearCartItems();
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
      localStorage.removeItem('token'); // Clear token from local storage
      delete axios.defaults.headers.common['Authorization']; // Remove Authorization header
      this.clearCartItems(); // Optionally, clear cart items locally or from the backend
    },
    
    async fetchCartItems() {
      try {
        const response = await axios.get('/api/v3/cart/get', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
        this.cartItems = response.data;
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    clearCartItems() {
      this.cartItems = []; 
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
});
export default useAuthStore;