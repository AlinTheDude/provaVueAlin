<template>
  <div>
     <h1>Would You Rather</h1>
     <div v-if="!loading">
       <h2 v-if="!gameOver">Round {{ currentRound }}</h2>
       <div class="products" v-if="!gameOver">
         <div class="product" @click="selectProduct(product1)" v-if="product1">
           <v-img :src="product1.image" height="200px" cover></v-img>
           <h3>{{ product1.title }}</h3>
         </div>
         <div class="product" @click="selectProduct(product2)" v-if="product2">
           <v-img :src="product2.image" height="200px" cover></v-img>
           <h3>{{ product2.title }}</h3>
         </div>
       </div>
       <div v-else>
         <h2>Game Over!</h2>
         <p>Your favorite product is: {{ favoriteProduct && favoriteProduct.title }}</p>
         <router-link to="/results">View Results</router-link>
       </div>
     </div>
     <div v-else>
       <h2>Loading...</h2>
     </div>
  </div>
 </template>
 
 <script>
 export default {
  name: 'HomeView',
  data() {
     return {
       products: [],
       loading: true,
       gameOver: false,
       favoriteProduct: null,
       rounds: 10, // Adjusted to 10 rounds for 20 products
       currentRound: 1,
       choices: [],
       product1: null,
       product2: null,
     };
  },
  methods: {
     async getProducts() {
       await fetch('https://api.escuelajs.co/api/v1/products')
         .then(response => response.json())
         .then(data => {
           this.products = data;
           this.setProducts();
           this.loading = false;
         });
     },
     setProducts() {
       if (this.products.length >= 2) {
         this.product1 = this.products.shift();
         this.product1.image = this.product1.images[0];
         this.product2 = this.products.shift();
         this.product2.image = this.product2.images[0];
       } else {
         this.gameOver = true;
         this.favoriteProduct = this.calculateFavoriteProduct();
       }
     },
     selectProduct(selectedProduct) {
       this.choices.push(selectedProduct);
       if (this.currentRound < this.rounds) {
         this.currentRound++;
         this.setProducts();
       } else {
         this.gameOver = true;
         this.favoriteProduct = this.calculateFavoriteProduct();
         this.$router.push({ name: 'results', params: { favoriteProduct: JSON.stringify(this.favoriteProduct) } });
       }
     },
     calculateFavoriteProduct() {
       const productCounts = this.choices.reduce((acc, product) => {
         acc[product.id] = (acc[product.id] || 0) + 1;
         return acc;
       }, {});
       const maxCount = Math.max(...Object.values(productCounts));
       const favoriteProducts = Object.keys(productCounts).filter(key => productCounts[key] === maxCount);
       return this.products.find(product => favoriteProducts.includes(product.id));
     },
  },
  created() {
     this.getProducts();
  },
 };
 </script>
 
 <style scoped>
 .products {
  display: flex;
  justify-content: space-around;
 }
 
 .product {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
 }
 
 .product img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
 }
 </style>