<template>
    <div class="navbar">
        <nav>
            <div class="nav-links">
                <h1 style="color: white;"> Slikbutikken</h1>
                <router-link to="/" class="nav-link">
                    <button class="nav-button">Home</button>
                </router-link>
                <router-link to="/selection" class="nav-link">
                    <button class="nav-button">Selection</button>
                </router-link>
                <router-link to="/contact" class="nav-link">
                    <button class="nav-button">Contact</button>
                </router-link>
            </div>

            <div style="margin-right: 20px;" class="basket-container">
                <img class="basket_icon" @click="showPopup = true" src="../assets/icons/basket_empty.png" alt="Basket icon">
                <Basket :isVisible="showPopup" @close="showPopup = false"></Basket>
            </div>
        </nav>
    </div>
</template>

<script>
import Basket from './Basket.vue';

export default {
    components: {
        Basket
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
.navbar nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #333; /* Change navbar background color as needed */
  
}

.nav-links {
  display: flex;
  gap: 20px;
  margin-left: 20px;
}

.nav-link .nav-button {
  background-color: #555; /* Button background color */
  border: none;
  color: white; /* Button text color */
  cursor: pointer;
  padding: 10px 20px; /* Padding inside the buttons */
  border-radius: 5px; /* Rounded corners for buttons */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

.nav-link .nav-button:hover {
  background-color: #777; /* Button background color on hover */
}

.nav-right {
  display: flex;
  align-items: center;
}

.basket_icon {
  width: 50px;
  height: auto;
  cursor: pointer;
  border-radius: 50%; /* Circular rounded corners for the basket icon */
  transition: transform 0.3s; /* Smooth transition for hover effect */
}

.basket_icon:hover {
  transform: scale(1.1); /* Slightly increase size on hover */
}
</style>
