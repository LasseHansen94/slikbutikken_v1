import {
    reactive,
    readonly
} from "vue";

const basketState = reactive({
    basket: []
});

const addToBasket = (item) => {
    // Optionally add data validation here (if / else)
    basketState.basket.push(item);
}

export default {
    basketState: readonly(basketState),
    addToBasket
};