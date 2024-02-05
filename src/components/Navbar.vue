<template>
    <div class="navbar">

        <div class="nav-links">
            <router-link to="/" class="nav-link">
                <button class="nav-button">Home</button>
            </router-link>
            <router-link to="/about" class="nav-link">
                <button class="nav-button">About Us</button>
            </router-link>
            <router-link to="/selection" class="nav-link">
                <button class="nav-button">Selection</button>
            </router-link>
            <router-link to="/contact" class="nav-link">
                <button class="nav-button">Contact</button>
            </router-link>


        </div>
        <div class="basket-container">
            <img class="basket_icon" @click="showPopup = true" src="../assets/icons/basket_empty.png" alt="Basket icon">
            <Popup :isVisible="showPopup" @close="showPopup = false" />
        </div>
    </div>
</template>

<script>
import Popup from './Popup.vue';

export default {
    components: {
        Popup
    },
    data() {
        return {
            showPopup: false
        };
    },
    methods: {

    },
}
</script>

<style >
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #333;
}

.nav-links {
    display: flex;
    gap: 20px;
    margin-left: 20px;
}

.basket-container {
    display: flex;
    gap: 20px;
    margin-right: 20px;
}

.nav-link .nav-button {
    background-color: #555;
    
    border: none;
    color: white;
    
    cursor: pointer;
    padding: 10px 20px;
    
    border-radius: 5px;
    
    transition: background-color 0.3s;
    
}

.nav-link .nav-button:hover {
    background-color: #777;
    
}


.basket_icon {
    width: 50px;
    height: auto;
    cursor: pointer;
    border-radius: 50%;
    
    transition: transform 0.3s;
    

.basket_icon:hover {
    transform: scale(1.1);
}
}
</style>