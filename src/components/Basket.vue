<template lang="">
    <div>
            <h2>Basket</h2>
            <div v-if="basketState.basket.length < 1">
                <h3 >No items in the basket</h3>
            </div>
            <div v-else>
                <li v-for="item in basketState.basket"> 
                    {{ item.name }}
                </li>
            </div>
        </div>
</template>
<script>
import basket from "../modules/basket";

export default {
    name: "Basket",
    data() {
        return {
        
        }
    },
    setup() {
        const { basketState, addToBasket } = basket;

        return {basketState, addToBasket};
    },
}
</script>
<style lang="">
    
</style>