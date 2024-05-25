

import { useAuthStore } from '../stores/auth.js';

export function requireAuth(to, from, next) {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    next({ name: 'Login' }); // Redirect to login page if not authenticated
  } else {
    next(); // Continue to the requested route
  }
}
export default requireAuth;
