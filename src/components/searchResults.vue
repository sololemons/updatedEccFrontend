<template>
  <div class="search-results">
    <h1>Search Results for "{{ $route.query.q }}"</h1>
    
    <!-- Display Products -->
    <section v-if="products.length > 0">
      <h2>Products</h2>
      <ul class="product-list">
        <li v-for="product in products" :key="product.productId" class="product-item">
          <router-link :to="{ name: 'Products', params: { categoryId: product.category.categoryId } }">
            {{ product.productName }}
          </router-link>
          <p>Description: {{ product.description }}</p>
          <p>Price: {{ product.price }}</p>
        </li>
      </ul>
    </section>
    
    <!-- Display Categories -->
    <section v-if="categories.length > 0">
      <h2>Categories</h2>
      <ul class="category-list">
        <li v-for="category in categories" :key="category.categoryId" class="category-item">
          <router-link :to="{ name: 'Category', params: { id: category.categoryId } }">
            {{ category.name }}
          </router-link>
          <p>Description: {{ category.description }}</p>
        </li>
      </ul>
    </section>
    
    <!-- Handle No Results -->
    <p v-if="products.length === 0 && categories.length === 0">No results found.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      categories: []
    };
  },
  async created() {
    await this.fetchSearchResults();
  },
  methods: {
    async fetchSearchResults() {
      try {
        const response = await axios.get(`/api/v3/search?q=${this.$route.query.q}`);
        this.products = response.data.products;
        this.categories = response.data.categories;
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  }
};
</script>

<style scoped>
.search-results {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
}

.product-list, .category-list {
  list-style: none;
  padding: 0;
}

.product-item, .category-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.router-link-active {
  color: #007bff; /* Active link color */
}
</style>
