<template>
  <div>
    <h1>PRODUCTS</h1>
  </div>
  <div>
    <div class="card-container">
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-else>
        <div v-for="product in products" :key="product. productId" class="card" @click="showProductDetails(product)">
          <img :src="product.image_Url" :alt="product.productName" class="card-image" />
          <div class="card-content">
            <div class="product-name">{{ product.productName }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product details section -->
    <div v-if="selectedProduct" class="product-details">
      <h2>{{ selectedProduct.productName }}</h2>
      <p>Description: {{ selectedProduct.description }}</p>
      <p>Price: ${{ selectedProduct.price }}</p>
      <button @click="hideProductDetails" class="button">Close</button>
      <button @click="addToCart(selectedProduct)" class="CartBtn">Add To Cart</button>
      <button class="PurchaseBtn">Purchase</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const props = defineProps({
  categoryId: {
    type: String,
    required: true,
  },
});
const products = ref([]);
const isLoading = ref(true);
const selectedProduct = ref(null);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(async () => {
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    router.push({ path: '/Login', query: { redirect: route.fullPath } });
  } else {
    try {
      const categoryId = route.params.categoryId;
      const response = await axios.get(`http://localhost:8080/api/v2/Product/Get/id/${categoryId}`);
      products.value = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response && error.response.status === 401) {
        router.push({ path: '/Login', query: { redirect: route.fullPath } });
      }
    } finally {
      isLoading.value = false;
    }
  }
});

function showProductDetails(product) {
  selectedProduct.value = product;
}

function hideProductDetails() {
  selectedProduct.value = null;
}

async function addToCart(product) {
  try {
    // Log the product object to ensure it has the correct structure
    console.log('Adding product to cart:', product);
    
    // Check if productId exists and is a number
    const productId = product. productId;
    if (!productId || isNaN(productId)) {
      console.error('Invalid productId:', productId);
      return;
    }

    const token = authStore.token; // Assuming you have the token stored in the auth store
    const response = await axios.post(`http://localhost:8080/api/v3/cart/add/${productId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      }
    });
    console.log('Product added to cart:', response.data);
  } catch (error) {
    console.error('Error adding product to cart:', error);
  }
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  padding: 10px;
  width: 100%;
  margin: 0px;
}
.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(99, 78, 78, 0.1);
  transition: transform 0.3s ease;
  width: 280px;
  height: 360px;
  position: relative;
}
.card:hover {
  transform: translateY(-5px);
}
.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
.product-name {
  font-weight: bold;
  margin-bottom: 5px;
}
.product-price {
  color: green;
}
.product-details {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: bold;
  position: relative;
  background-color: rgb(49, 233, 172);
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}
.CartBtn, .button, .PurchaseBtn {
  border-radius: 39px;
  background-color: rgb(5, 5, 5);
  color: white;
  font-style: italic;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
}
.loading {
  font-size: 1.5em;
  text-align: center;
  width: 100%;
}
</style>
