import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth } from './authGuard'; // Verify correct import path
import Cart from '@/views/Cart.vue';
import Products from '../views/Products.vue';
import Category from '../views/Category.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import searchResults from '@/components/searchResults.vue';


const routes = [
  {
   path:'/Cart',
   name:'Cart',
   component: Cart,
   props: true,
   beforeEnter:requireAuth
  
  },

  {
    path: '/Products/Get/id/:categoryId',
    name: 'Products',
    component: Products,
    props: true, // Allows passing route params as props
    beforeEnter:requireAuth
  },

  {
    path: '/',
    name: 'Category',
    component: Category,
    props: true // Optional, if needed for the component
  },


  {
    path: '/Login',
    name: 'Login',
    component: Login,
    props: true // Optional, if needed for the component
  },
  {
    path: '/Signup',
    name: 'SignUp',
    component: SignUp,
    props: true // Optional, if needed for the component
  },
  {
    path: '/searchResults',
    name: 'searchResults',
    component: searchResults,
    props: true // Optional, if needed for the component
  }
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHistory for modern browsers
  routes
});

export default router;
