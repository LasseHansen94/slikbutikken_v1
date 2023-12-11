<template>
    <div v-if="isVisible" class="popup">
        <h2>Basket</h2>
        <div v-if="basketState.basket.length < 1">
            <h3>No items in the basket</h3>
        </div>
        <div v-else>
            <li v-for="item in basketState.basket">
                {{ item.name }}
            </li>
        </div>

        <div class="button-container">
            <div>
                <button style="color: red;" @click="closePopup">Close</button>
            </div>
            <div>
                <router-link to ="/basket">
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
            this.$emit('close');
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
    display: flex; /* Enables Flexbox */
    justify-content: center; /* Centers the buttons horizontally */
    align-items: center; /* Aligns the buttons vertically */
    gap: 10px; /* Adds space between the buttons */
}

</style>