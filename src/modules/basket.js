import {
    reactive,
    readonly
} from "vue";

const basketState = reactive({
    basket: []
});

const addToBasket = (item) => {
    
    basketState.basket.push(item);
}

export default {
    basketState: readonly(basketState),
    addToBasket,
    // modifyBasket,
    // removeFromBasket,
};