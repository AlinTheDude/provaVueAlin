<template>
    <div>
       <h1>Results</h1>
       <div v-if="parsedFavoriteProduct">
         <h2>Your favorite product is:</h2>
         <div class="product">
           <img :src="parsedFavoriteProduct.image" :alt="parsedFavoriteProduct.title" />
           <h3>{{ parsedFavoriteProduct.title }}</h3>
         </div>
       </div>
       <p v-else>Loading...</p>
       <router-link to="/">Play Again</router-link>
    </div>
   </template>
   
   <script>
   export default {
    name: 'ResultsView',
    props: {
       favoriteProduct: Object,
    },
    computed: {
       parsedFavoriteProduct() {
         return JSON.parse(this.favoriteProduct);
       },
    },
   };
   </script>
   
   <style scoped>
   .product {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
   }
   
   .product img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 10px;
   }
   </style>