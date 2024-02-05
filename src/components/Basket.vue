<template>
    <div class="basket-overview">
      <h2 class="basket-title">Basket</h2>
  
      <div v-if="basketState.basket.length < 1" class="empty-basket">
        <h3>No items in the basket</h3>
      </div>
  
      <div v-else class="basket-items">
        <ul class="items-list">
          <li v-for="item in basketState.basket" :key="item.id" class="item">
            <div class="item-details">
              <h3 class="item-name">Name: {{ item.name }}</h3>
              <p class="item-quantity">Quantity: {{ item.quantity }}</p>
              <p class="item-price">Price: {{ item.price * item.quantity }}</p>
            </div>
            <img :src="item.image" alt="Item image" class="item-image">
          </li>
        </ul>
      </div>
  
      <div class="total-price">
        <h1>Total Price: {{ calculateTotalPrice(basketState.basket) }}</h1>
      </div>
    </div>
  </template>

<script>
import basket from "../modules/basket";

export default {
    name: "Basket",

    methods: {
        calculateTotalPrice(basket) {
            console.log("TESTTEST:", basket);
            var sum = 0;
            for (const item of basket) {
                sum += (item.price * item.quantity)
            }

            return sum;
        },
    },
    
    setup() {
        const { basketState, addToBasket } = basket;

        return { basketState, addToBasket };
    },
}
</script>


<style scoped>

.item {
  
  display: flex;
  align-items: center;
  background-color: #f0f0f0; 
  padding: 10px; 
  margin-bottom: 10px; 
  border-radius: 8px; 
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 
  width: fit-content; 
  margin-right: auto; 
  margin-left: auto;
}

.item-details {
  
  flex-grow: 1;
  font-size: 0.9rem; 
}

.item-name, .item-quantity, .item-price {
  
  margin: 3px 0; 
}

.item-image {
  
  width: 30px; 
  height: auto;
  margin-left: 10px;
}
</style>