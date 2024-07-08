<template>
    <div class="modal" v-if="visible">
      <div class="modal-content">
        <span class="close" @click="$emit('close')">&times;</span>
        <div class="modal-header">
          <img src="../assets/JUXLOGO.png" alt="Logo" class="modal-logo">
          <h2 class="mpesa">MPESA</h2>
        </div>
        <div class="modal-body">
          <div class="input-group">
            <label for="phone">Phone Number:</label>
            <input type="text" v-model="paymentDetails.phoneNumber" id="phone" required>
          </div>
          <div class="input-group">
            <label for="amount">Amount:</label>
            <input type="number" v-model="paymentDetails.amount" id="amount" required readonly>
          </div>
        </div>
        <button @click="pay" class="pay-button">Pay</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useAuthStore } from '../stores/auth'; // Import your AuthStore module
  
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      paymentDetails: {
        type: Object,
        required: true
      }
    },
    setup(props, { emit }) {
      const authStore = useAuthStore(); // Use your AuthStore hook
  
      const pay = async () => {
        try {
          const response = await axios.post('/api/v4/mpesa/stkpush', props.paymentDetails, {
            headers: {
              'Authorization': `Bearer ${authStore.token}` // Access token from AuthStore
            }
          });
          console.log('Payment response:', response.data);
          emit('close');
        } catch (error) {
          console.error('Error processing payment:', error);
        }
      };
  
      return {
        pay
      };
    }
  };
  </script>
    
  <style scoped>
  .mpesa {
color: #5ddf6f;

  }
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    width: 60%;
    background-color: #ffffff;
    border-radius: 12px; /* Increased border radius for smoother edges */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
    padding: 30px; /* Increased padding for better spacing */
    position: relative;
  }
  
  .close {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
  
  .close:hover {
    color: rgb(221, 60, 60);
  }
  
  .modal-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .modal-logo {
    width: 100px; /* Adjust size as needed */
    height: auto;
    margin-bottom: 45px;
  }
  
  .modal-body {
    margin-bottom: 70px;
  }
  
  .input-group {
    margin-bottom: 25px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 2px;
  }
  
  input[type="text"],
  input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 3px solid #5ddf6f;
    border-radius: 15px;
    font-size: 16px;
  }
  
  .pay-button {
    background-color: #78af7a;
    color: #ffffff;
    border: none;
    padding: 12px 24px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .pay-button:hover {
    background-color: #45a049;
  }
  </style>
  