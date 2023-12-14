<template>
    <div v-if="isVisible" class="popup">
        <Basket />

        <div class="button-container">
            <div>
                <button style="color: red;" @click="closePopup">Close</button>
            </div>
            <div>
                <router-link  to="/basket">
                    <button @click="closePopup">Go to basket</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Basket from "./Basket.vue"

export default {
    name: "Popup",

    components: {
        Basket
    },

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
}
</style>