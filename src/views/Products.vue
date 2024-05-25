<template>
  <div>
    <h1>PRODUCTS</h1>

  </div>
  <div>
    <div class="card-container">
      <div v-if="isLoading" class="loading">Loading...</div>
      <div v-else>
        <div v-for="product in products" :key="product.product_id" class="card" @click="showProductDetails(product)">
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
      <button class="CartBtn">Add To Cart </button>
      <button class="PurchaseBtn">Purchase</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const products = ref([]);
const isLoading = ref(true);
const selectedProduct = ref(null);
const route = useRoute();

onMounted(async () => {
  try {
    const CategoryId = route.params.categoryId;
    const response = await axios.get(`http://localhost:8080/api/v2/Product/Get/id/${CategoryId}`);
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
  } finally {
    isLoading.value = false;
  }
});

function showProductDetails(product) {
  selectedProduct.value = product;
}

function hideProductDetails() {
  selectedProduct.value = null;
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
    margin:0px;
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
  .product-details{
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-weight: bold;
    position: relative;
background-color: rgb(49, 233, 172);
  }
  .CartBtn ,.button,.PurchaseBtn{
    border-radius: 39px;
   background-color: rgb(5, 5, 5);
   color: white;
   font-style: italic;
    padding-right: 10px;
    padding-left: 20px;
  }
  </style>
  