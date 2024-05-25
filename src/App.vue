<template>
  <div>
    <div class="navbar">
      <HomeNavbar/>
    </div>
    
    <div class="content">
      <router-view></router-view>
    </div>
  <div>
    <BtmNav/>
  </div>
  </div>
</template>

<script setup>
import BtmNav from './views/BtmNav.vue';
import HomeNavbar from './views/HomeNavbar.vue';
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 25px;
  z-index: 1000;
  margin-bottom: 10px; 
}

.content {
  padding-top: 70px; 
}
.Below{
  background-color: bisque;
}
</style>
