<template>
    <div class="container">
        <h1>Min Kurv</h1>
        <Basket />
        <OrderProcess></OrderProcess>
    </div>
</template>     

<script>
import Basket from "../components/Basket.vue"
import OrderProcess from "../components/OrderProcess.vue";

export default {
    name: "BasketView",

    components: {
        Basket,
        OrderProcess
    },


    methods: {
        
    },
}
</script>

<style>
.container {
    text-align: center; /* Centrerer indholdet vandret */
}
</style>