<template>
  <div class="basket-overview">
    <!-- Vi checker om  basket er tom ved at kigge på basket.length  er mindre end 1 -->
    <div v-if="basketState.basket.length < 1" class="empty-basket">
      <h3>ingen varer i kurven</h3>
    </div>

    <div v-else class="basket-items">
      <ul class="items-list">
        <!-- hvis basket ikke er tom vi laver et for loop for at få fat i alle items i basket og for at vise henholdsvist navn, antal, pris og billede.-->
        <li v-for="item in basketState.basket" :key="item.id" class="item">
          <div class="item-details">
            <h3 class="item-name"> {{ item.name }}</h3>
            <p class="item-quantity">Mængde: {{ item.quantity }}</p>
            <p class="item-price">Pris: {{ item.price * item.quantity }}</p>
          </div>
          <img :src="item.image" alt="Item image" class="item-image">
        </li>
      </ul>
    </div>

    <div class="total-price">
      <!-- her kører vi vores funktion calculateTotalPrice  som er defineret længere nede for at finde prisen på alle varer-->
      <h1>Samlet Pris: {{ calculateTotalPrice(basketState.basket) }}</h1>
    </div>
  </div>
</template>

<script>
// vi importer vores basket komponent
import basket from "../modules/basket";

export default {
  name: "Basket",

  methods: {
    // Vi looper igennem vores basket og ganger antalet med pris for til sidst at finde den samlede sum på købet.
    calculateTotalPrice(basket) {

      var sum = 0;
      // vi laver et for loop for at gå igennem basket
      for (const item of basket) {
        // vi ganger prisen med antallet og lægger alle varer i basket sammen for at få en total pris på basket
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

.item-name,
.item-quantity,
.item-price {

  margin: 3px 0;
}

.item-image {

  width: 30px;
  height: auto;
  margin-left: 10px;
}
</style>