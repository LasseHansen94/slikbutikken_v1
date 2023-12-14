<template>
    <div v-if="isVisible" class="popup">
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

        <div class="button-container">
            <div>
                <button style="color: red;" @click="closePopup">Close</button>
            </div>
            <div>
                <router-link to="/basket">
                    <button @click="closePopup">Go to basket</button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import basket from "../modules/basket";

export default {
    name: "Basket",

    props: ['isVisible'],

    methods: {
        closePopup() {
            this.$emit('close'); // Sends a Vue.js '$emit' call to parent (components/Navbar.vue) to run the @close action which sets "showPopup" to false
        }
    },

    data() {
        return {

        }
    },

    setup() {
        const { basketState, addToBasket } = basket;

        return { basketState, addToBasket };
    },
}
</script>

<style>
.popup {
    position: fixed;
    background-color: white;
    border: 1px solid #ddd;
    padding: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.button-container {
    margin-top: 30px;
    display: flex;
    /* Enables Flexbox */
    justify-content: center;
    /* Centers the buttons horizontally */
    align-items: center;
    /* Aligns the buttons vertically */
    gap: 10px;
    /* Adds space between the buttons */
}</style>