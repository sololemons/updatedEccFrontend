<template>
  <div class="card-container">
    <router-link
      v-for="category in categories"
      :key="category.categoryId"
      :to="`/Products/Get/id/${category.categoryId}`">
      <div class="card">
        <div class="card-content">
          <img
            class="card-image"
            :src="category.image_Url"
            alt="Category image"
            height="100%"
            object-fit="cover"
          />
          <div class="category-name">{{ category.name }}</div>
          <div class="description">{{ category.description }}</div>
        </div>
      </div>
    </router-link>

  </div>

 
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const categories = ref([]);

  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/Category/get');
      categories.value = response.data;
    }
    catch (error) {
      console.error('Error fetching categories:', error);
    }
  });
 
</script>

<style scoped>
  .card-container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    /* Adjust spacing between cards */
    padding: 20px;
    /* Adjust padding */
    width: 180%;

    margin: 0 auto;
    /* Center the container horizontally */
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
  
  .category-name {
    color: rgb(194, 25, 67);
    font-weight: 900;
    font-size: 20px;
    padding: 10px;
  }
  
  .description {
    font-style: italic;
    font-family: serif;
    display: none;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: rgb(213, 216, 21);
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }
  
  .card:hover .description {
    display: block;
  }
</style>