<template lang="">
    <div>
        
        <nav>
            <router-link to="/" class="nav-link">
                <button class="nav-button">Home</button>
            </router-link>
            <router-link to="/orders" class="nav-link">
                <button class="nav-button">Orders</button>
            </router-link>
            <router-link to ="/contact" class="nav-link">
                <button class="nav-button">contact</button>
            </router-link>

        </nav>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="css">
nav {
    margin: 0;
    padding: 0;
    position: sticky;
    background-color: beige;
    border: 1px solid;
    padding: 10px;
    border-color: black;
    color: aqua;
    margin-right: 20px;
}

.nav-button {
    color: white;
    background-color: rgb(73, 128, 0);
    border: 1px solid black;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    margin-right: 10px;
} </style>

.nav-link {
    text-decoration: none; /* Tilføjet for at fjerne standard understregning af links */
}

/* Tilføj en hover-effek
