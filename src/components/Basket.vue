<template>
    <div class="basket_overview">
        <!-- A div which turns into a popup over the screen showing the information about the items which are in the basket -->
        <h2>Basket</h2>
        <div v-if="basketState.basket.length < 1">
            <!-- Checks if there is less than one item in the basket list. If so, show a text saying no items in the basket. -->
            <h3>No items in the basket</h3>
        </div>
        <div v-else> <!-- Else if there is 1 or more items in the basket list, the show the information below -->
            <li v-for="item in basketState.basket">
                <!-- 
                    /** 
                     * TODO: For each item show: 
                     * ! A small image.
                     * ! Total quantity added to basket.
                     * ! The quantity value (DKK)
                    */
                -->
                {{ item.name }}
            </li>
        </div>

        <!--
            /** 
             * TODO: Show the total value (DKK) in the basket 
            */
        -->
    </div>
</template>

<script>
import basket from "../modules/basket";

export default {
    name: "Basket",
 
    setup() {
        const { basketState, addToBasket } = basket;

        return { basketState, addToBasket };
    },
}
</script>


<style>

</style>