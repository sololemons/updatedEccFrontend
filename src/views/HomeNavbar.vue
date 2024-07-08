<template>
  <nav class="navbar">
    <div class="brand">
      <router-link :to="{ name: 'Category' }">
        <img src="../assets/JUXLOGO.png" alt="JUXYWARE Logo" class="logo">
      </router-link>
    </div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search..." @keyup.enter="fetchSearchResults">
      <router-link :to="{ name: 'searchResults', query: { q: searchQuery } }">
        <button @click="fetchSearchResults">Search</button>
      </router-link>
    </div>
    <ul class="nav-links">
      <li><router-link :to="{ name: 'Category' }">Home</router-link></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="/contacts">Contact</a></li>
      <li class="cart-icon">
        <router-link to="/Cart">
          <img src="../assets/icons8-shopping-cart-48.png" alt="Cart Icon" class="cart-img">
        </router-link>
      </li>
      <li v-if="authStore.isAuthenticated" class="logout-link">
        <button @click="logout" class="logout-button">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const searchQuery = ref('');

const fetchSearchResults = async () => {
  try {
    const response = await axios.get(`/api/v3/search?q=${searchQuery.value}`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });
    console.log('Search results:', response.data);
    // Handle navigation to search results or other actions based on response
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

const logout = () => {
  authStore.logout(); // Call your logout function from the auth store
  router.push({ name: 'Category' }); // Redirect to login page after logout
};
</script>

<style scoped>
.navbar {
  position: fixed;
  left: -1%;
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 30px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.navbar:hover {
  background-color: #444;
}

.brand {
  display: flex;
  align-items: center;
}

.logo {
  height: 87px;
  margin-right: 10px;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 8px;
  border: none;
  border-radius: 4px 0 0 4px;
  outline: none;
  width: 200px;
  transition: width 0.3s ease;
}

.search-bar input:focus {
  width: 250px;
}

.search-bar button {
  padding: 8px 16px;
  border: none;
  border-radius: 0 4px 4px 0;
  background-color: rgba(255, 255, 255, 0.5);
  color: #000;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.search-bar button:hover {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  transform: scale(1.05);
}

.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 50px;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.3s;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.5);
  color: #000;
  transform: scale(1.05);
}

.cart-icon {
  display: flex;
  align-items: center;
}

.cart-icon img {
  height: 30px;
  transition: transform 0.3s ease;
}

.cart-icon img:hover {
  transform: rotate(20deg);
}

.logout-link {
  margin-left: 20px; /* Adjust spacing */
}

.logout-button {
  background-color: #ff5a5f;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #ff373d;
}
</style>
