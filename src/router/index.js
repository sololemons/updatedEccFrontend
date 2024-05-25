import { createRouter, createWebHistory } from 'vue-router';
import Products from  '../views/Products.vue';
import Category from  '../views/Category.vue';
import Login from     '../views/Login.vue'
import SignUp from    '../views/SignUp.vue';
import { requireAuth } from './authGuard'; 
const routes = [

  {
    path: '/Products/Get/id/:categoryId',
    name: 'Products',
    component: Products,
   props:true,
   beforeEnter: requireAuth, // Apply the route guard
  },
  {
    path: '/',
    name: 'Category',
    component: Category,
    props:true
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    props:true
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp,
    props:true
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
