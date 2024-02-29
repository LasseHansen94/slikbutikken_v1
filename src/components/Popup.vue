<template>
    <div v-if="isVisible" class="popup">
        <Basket />

        <div class="button-container">
            <div>
                <button style="color: red;" @click="closePopup">Luk</button>
            </div>
            <div>
                <router-link  to="/basket">
                    <button @click="closePopup">Gå til kurven</button>
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
            this.$emit('close'); // "Sender et Vue.js '$emit' kald til forældren (komponenten Navbar.vue) for at køre @close handlingen, som sætter "showPopup" til false."
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
    overflow-y: auto; 
    position: fixed;
    max-height: 60%; 
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

    justify-content: center;

    align-items: center;

    gap: 10px;
}
</style>