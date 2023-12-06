<template lang="">
  <div>
    <Navbar/>
    <router-view />
  </div>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'

import Navbar from './components/Navbar.vue'
import basket from "./modules/basket";

export default {
  name: "App",

  components: {
    Navbar,
  },

  setup() {
    console.log("App.vue loaded successfully!");
    const { basketState, addToBasket } = basket;
    return {basketState, addToBasket};
  },

  methods: {
    
  }
  
}
</script>

<style lang="css">
  
</style>
