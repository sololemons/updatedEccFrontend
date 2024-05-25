<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const username = ref('');
      const password = ref('');
      const store = useStore();
      const router = useRouter();
  
      const login = async () => {
        try {
          await store.dispatch('login', { username: username.value, password: password.value });
          if (store.getters.isAuthenticated) {
            router.push('/');
          }
        } catch (error) {
          console.error('Login failed:', error);
        }
      };
  
      return {
        username,
        password,
        login
      };
    }
  };
  </script>
  