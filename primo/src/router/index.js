import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import ResultsView from '@/views/ResultsView.vue';
import AboutView from '@/views/AboutView.vue'; // Import the AboutView component


const routes = [
 {
    path: '/',
    name: 'home',
    component: HomeView,
 },
 {
    path: '/results',
    name: 'results',
    component: ResultsView,
    props: route => ({
      favoriteProduct: route.params.favoriteProduct ? JSON.parse(route.params.favoriteProduct) : null,
    }),
 },
 {
    path: '/about', // Define the route for /about
    name: 'about',
    component: AboutView, // Use the AboutView component for this route
 },
];

const router = createRouter({
 history: createWebHistory(process.env.BASE_URL),
 routes,
});

export default router;