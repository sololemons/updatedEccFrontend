<template>
  <div class="register-container">
    <h2 class="register-title">Register</h2>
    <form @submit.prevent="register" class="register-form">
      <input type="text" v-model="firstName" placeholder="First Name" required class="input-field" />
      <input type="text" v-model="lastName" placeholder="Last Name" required class="input-field" />
      <input type="email" v-model="email" placeholder="Email" required class="input-field" />
      <input type="password" v-model="password" placeholder="Password" required class="input-field" />
      <button type="submit" class="register-btn">Register</button>
      <h2>Already have an account? <a href="#" @click.prevent="goToLogin">Log In</a></h2>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default {
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const authStore = useAuthStore();

    const register = async () => {
      try {
        await authStore.register({ firstName: firstName.value, lastName: lastName.value, email: email.value, password: password.value });
        if (authStore.isAuthenticated) {
          router.push('/Login');
        }
      } catch (error) {
        console.error('Registration failed:', error);
      }
    };

    const goToLogin = () => {
      router.push('/Login');
    };

    return {
      firstName,
      lastName,
      email,
      password,
      register,
      goToLogin,
    };
  },
};
</script>

<style scoped>
.register-container {
  max-width: 300px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
}

.register-form {
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

.register-btn {
  width: 100%;
  height: 40px;
  background-color: #4CAF50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.register-btn:hover {
  background-color: #3e8e41;
}
</style>