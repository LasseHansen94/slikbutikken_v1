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
.basket-overview {
  /* Add your styles here */
}

.basket-title {
  /* Style for basket title */
}

.empty-basket {
  /* Style for when basket is empty */
}

.basket-items {
  /* Style for basket items container */
}

.items-list {
  /* Style for the list of items */
}

.item {
  /* Style for each item */
  display: flex;
  align-items: center;
  background-color: #f0f0f0; /* Background color for the item */
  padding: 10px; /* Padding around the content */
  margin-bottom: 10px; /* Margin between items */
  border-radius: 8px; /* Optional: Rounded corners */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Adding a subtle shadow for depth */
  width: fit-content; /* Adjust width to fit the content */
  margin-right: auto; /* Center the item if not full width */
  margin-left: auto;
}

.item-details {
  /* Style for item details */
  flex-grow: 1;
  font-size: 0.9rem; /* Smaller font size for item details */
}

.item-name, .item-quantity, .item-price {
  /* Style for item name, quantity, and price */
  margin: 3px 0; /* Smaller margins for a compact look */
}

.item-image {
  /* Style for item image */
  width: 30px; /* Smaller width for the image */
  height: auto;
  margin-left: 10px;
}

.total-price {
  /* Style for total price */
}
</style>