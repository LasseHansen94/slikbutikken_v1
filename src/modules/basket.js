import {
    reactive,
    readonly
} from "vue";

const basketState = reactive({
    basket: []
});

const addToBasket = (item) => {
    // Optionally add data validation here (if / else)

    /** 
     * TODO: Datavalidation for each item.
     * TODO: Check if 'item.id' is already in 'basketState.basket'
     *      TODO: If already in list, add item.quantity to item.quantity in the already exisiting list item. 
    */

    basketState.basket.push(item);
}

/**
 * TODO: Add function which removes an item from the basket. 
*/

/** 
 * TODO: Add function which updates the current item in list with new 'quantity' value
*/

export default {
    basketState: readonly(basketState),
    addToBasket,
    // modifyBasket,
    // removeFromBasket,
};