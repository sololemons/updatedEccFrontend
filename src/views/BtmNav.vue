<template>
    <div class="footer-container">
      <footer class="footer">
        <div class="social-media">
          <h3>Follow Us</h3>
          <div class="social-icons">
            <a href="https://www.facebook.com"><img src="../assets/facebook-app-symbol.png" alt="Facebook"></a>
            <a href="https://www.twitter.com"><img src="../assets/x-social-media-black-icon.png" alt="Twitter"></a>
            <a href="https://www.instagram.com"><img src="../assets/ig-instagram-icon.png" alt="Instagram"></a>
            <a href="https://www.linkedin.com"><img src="../assets/linkedin-square-icon.png" alt="LinkedIn"></a>
          </div>
        </div>
        <div class="contact-info">
          <h3>Ways to Reach Us</h3>
          <p>Customer Support: support@example.com</p>
          <img src="../assets/JUXLOGO.png" alt="Logo" class="logo">
        </div>
      </footer>
    </div>
  </template>
  
  <style scoped>
  .footer-container {
    max-width: 2220px; 
    margin: 0 auto;
    height: 40px; 

  }
  
  .footer {
  margin-top: 50px;
    background-color: #1a8386; 
    color: #fff; 
    padding: 20px;
    display: flex; 
    justify-content: space-between; 
  }
  
  .social-media, .contact-info {
    flex: 1; /* Divide footer space evenly */
  }
  
  .social-icons img {
    width: 30px;
    margin-right: 10px; 
  }
  
  .logo {

    width: 150px; 
  }
  
  </style>
  