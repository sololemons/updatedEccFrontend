<template>
  <nav class="navbar">
    <div class="brand">
      <img src="../assets/JUXLOGO.png" alt="JUXYWARE Logo" class="logo">
    </div>
    <ul class="nav-links">
      <li><router-link :to="{ name: 'Category' }">Home</router-link></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Services</a></li>
      <li><a href="/contacts">Contact</a></li>
      <li class="cart-icon">
        <router-link to="/cart">
          <img src="../assets/icons8-shopping-cart-48.png" alt="Cart Icon" class="cart-img">
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0px;
  left: -30px;
  width: 100%;
  background-image: url('src/assets/juxywareee.png');
  background-size: cover;
  color: #fff;
  padding: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
}

.brand {
  display: flex;
  align-items: center;
}

.logo {
  height: 80px;
  margin-right: 10px;
}

.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 30px; /* Adjust the gap for consistent spacing */
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin: 0;
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: rgba(255, 255, 255, 0.5);
  color: #000;
}

.cart-icon {
  display: flex;
  align-items: center;
}
</style>
