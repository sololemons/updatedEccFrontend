<template>
  <div class="login-container">
    <h2 class="login-title">Login</h2>
    <form @submit.prevent="login" class="login-form">
      <input type="email" v-model="email" placeholder="Email" required class="input-field" />
      <input type="password" v-model="password" placeholder="Password" required class="input-field" />
      <button type="submit" class="login-btn">Login</button>
      <p class="signup-link">Don't have an account? <router-link to="/SignUp" class="signup-anchor">Sign up here</router-link></p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();

    const login = async () => {
      try {
        await authStore.login({ email: email.value, password: password.value });
        if (authStore.isAuthenticated) {
          const redirectTo = route.query.redirect || '/';
          router.push(redirectTo);
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-field {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}

.input-field:focus {
  border-color: #aaa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-btn {
  width: 100%;
  height: 40px;
  background-color: #4CAF50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-btn:hover {
  background-color: #3e8e41;
}
</style>

