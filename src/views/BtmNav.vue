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
    max-width: 1200px; /* Set max width for the footer container */
    margin: 0 auto; /* Center the footer container */
  }
  
  .footer {
    background-color: #333; /* Set background color for the footer */
    color: #fff; /* Set text color */
    padding: 20px; /* Add padding for content */
    display: flex; /* Use flexbox for layout */
    justify-content: space-between; /* Space items evenly */
  }
  
  .social-media, .contact-info {
    flex: 1; /* Divide footer space evenly */
  }
  
  .social-icons img {
    width: 30px; /* Set width for social media icons */
    margin-right: 10px; /* Add spacing between icons */
  }
  
  .logo {
    width: 100px; /* Set width for logo */
  }
  
  </style>
  