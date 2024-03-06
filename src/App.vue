<template>
    <div class="app-container">
        <Navbar />
        

        <router-view class="router-view" />
        <Footer />

    </div>
</template>


<script>
import { RouterLink, RouterView } from 'vue-router'

import Footer from './components/Footer.vue'

import Navbar from './components/Navbar.vue'
import basket from "./modules/basket";

export default {
    name: "App",

    components: {
        Navbar,
        Footer,
    },

    setup() {
        console.log("App.vue loaded successfully!");
        const { basketState, addToBasket } = basket;
        return { basketState, addToBasket };
    },

    methods: {

    }

}
</script>

<style>
html,
body,
#app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

.router-view {
    margin: 20px;
}</style>./components/Footer.vue
