import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'
import SelectionView from '../views/SelectionView.vue'
import BasketView from '../views/BasketView.vue'
import OrderConfirmationView from '../views/OrderConfirmationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/selection',
      name: 'selection',
      component: SelectionView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/basket',
      name: 'basket',
      component: BasketView
    },
    {
      path: '/orderConfirmation',
      name: 'orderConfirmation',
      component: OrderConfirmationView
    },
    
  ]
})

export default router
