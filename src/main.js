// main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Import your Pinia store
import { useAuthStore } from './stores/auth.js';

const app = createApp(App);

// Use createPinia to create the Pinia store instance
const pinia = createPinia();

// Use the Pinia store instance in your app
app.use(pinia);
app.use(router);

// Mount your Pinia store
pinia.use(useAuthStore);

app.mount('#app');
