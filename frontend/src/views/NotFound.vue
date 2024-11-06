<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <router-link to="/" class="btn">Go Back to Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    padding: 20px;
    margin-top: 50px;
  }
  
  .not-found h1 {
    font-size: 2em;
    color: #d9534f;
  }
  
  .not-found p {
    font-size: 1.2em;
    margin-bottom: 20px;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #0056b3;
  }
  </style>
  