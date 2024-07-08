<template>
  <div class="cart-container" v-if="authStore.isAuthenticated">
    <h1>Your Cart</h1>
    <ul class="cart-items" v-if="cartItems.length > 0">
      <li v-for="item in cartItems" :key="item.product.productId" class="cart-item">
        <img :src="item.product.image_Url" alt="Product Image" class="product-image" />
        <div class="product-details">
          <button><span class="product-name">{{ item.product.productName }}</span></button>

          <div class="quantity-controls">
            <button @click="decreaseQuantity(item)" class="quantity-button">-</button>
            <span class="product-quantity">Quantity: {{ item.quantity }}</span>
            <button @click="increaseQuantity(item)" class="quantity-button">+</button>
          </div>

          <span class="product-price">Price: {{ item.product.price }}</span>
        </div>
        <div class="product-actions">
          <input type="checkbox" v-model="selectedItems" :value="item" /> Select
          <button @click="removeFromCart(item.product.productId)" class="remove-button">Remove</button>
        </div>
      </li>
    </ul>
    <p class="empty-cart-message" v-else>Your cart is empty</p>

    <!-- Checkout Button -->
    <button @click="checkout" class="checkout-button" :disabled="selectedItems.length === 0">Checkout</button>

    <!-- Checkout Modal Component -->
    <CheckoutModal
      :visible="showPaymentModal"
      :paymentDetails="paymentDetails"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import CheckoutModal from './CheckoutModal.vue';

const cartItems = ref([]);
const showPaymentModal = ref(false);
const paymentDetails = ref({
  phoneNumber: '',
  amount: 0,
});
const selectedItems = ref([]);

const authStore = useAuthStore();
const token = authStore.token;

// Fetch cart items on component mount
onMounted(async () => {
  await fetchCartItems();
});

// Function to fetch cart items
const fetchCartItems = async () => {
  try {
    const response = await axios.get('/api/v3/cart/get', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    cartItems.value = response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    if (error.response && error.response.status === 401) {
      // Redirect to login if unauthorized
      redirectLogin();
    }
  }
};

// Function to remove item from cart
const removeFromCart = async (productId) => {
  try {
    const response = await axios.delete(`/api/v3/cart/delete/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Item removed from cart:', response.data);
    fetchCartItems(); // Refresh the cart items after removal
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// Function to increase item quantity in cart
const increaseQuantity = async (item) => {
  try {
    const response = await axios.put(`/api/v3/cart/increaseQuantity/${item.cartId}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Quantity increased:', response.data);
    fetchCartItems(); // Refresh the cart items after quantity update
  } catch (error) {
    console.error('Error increasing quantity:', error);
  }
};

// Function to decrease item quantity in cart
const decreaseQuantity = async (item) => {
  if (item.quantity > 1) {
    try {
      const response = await axios.put(`/api/v3/cart/decreaseQuantity/${item.cartId}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Quantity decreased:', response.data);
      fetchCartItems(); // Refresh the cart items after quantity update
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  } else {
    console.warn('Minimum quantity reached.');
  }
};

// Function to calculate total price of selected items
const calculateSelectedItemsTotal = () => {
  return selectedItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

// Function to handle checkout process
const checkout = () => {
  paymentDetails.value.amount = calculateSelectedItemsTotal();
  showPaymentModal.value = true; // Show the payment modal
};

// Function to close the payment modal
const closeModal = () => {
  showPaymentModal.value = false;
};

// Function to redirect to login page
const redirectLogin = () => {
  router.push({ path: '/Login', query: { redirect: route.fullPath } });
};
</script>

<style scoped>
.cart-container {
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.cart-items {
  list-style-type: none;
  padding: 0;
}

.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.product-image {
  width: 80px;
  height: auto;
  margin-right: 20px;
}

.product-details {
  flex: 1;
}

.product-name {
  font-weight: bold;
  margin-right: 20px;
}

.product-quantity {
  color: #666;
  margin-right: 20px;
}

.quantity-button {
  background-color: #ddd;
  color: #333;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.quantity-button:hover {
  background-color: #ccc;
}

.product-actions {
  display: flex;
  align-items: center;
}

.remove-button {
  background-color: #ff5a5f;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #ff373d;
}

.empty-cart-message {
  font-size: 18px;
  color: #666;
}

.checkout-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.checkout-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.checkout-button:hover:not(:disabled) {
  background-color: #45a049;
}
</style>
