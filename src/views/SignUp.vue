<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <button type="submit">Register</button>
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
      const email = ref('');
      const store = useStore();
      const router = useRouter();
  
      const register = async () => {
        try {
          await store.dispatch('register', {
            username: username.value,
            password: password.value,
            email: email.value,
          });
          router.push('/login');
        } catch (error) {
          console.error('Registration failed:', error);
        }
      };
  
      return {
        username,
        password,
        email,
        register,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  