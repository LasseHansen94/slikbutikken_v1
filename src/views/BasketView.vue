<template lang="">
    <div>
        <h1>
            My basket
        </h1>
        <p> Here there will be a lot of items in your basket </p>
    </div>
</template>

<script>
export default {
    name: "Basket",

    methods: {
        /** 
         * 
         * TODO: Add a function which adds the current order from basket.js
        */

        /** 
         * TODO: Validate user input like, 
         *      * Email, (Use regex)
         *      * Phone, (Should not include letters and symbols)
         *      * Name, (Should not include numbers or random symbols)
         *      * Address, 
         *      * Payment details. (Use credit card number formula)
        */
        validateData() {

        },

        /** 
         * TODO: Modify 'selection.stock' with updated stock quantity 
        */
        updateItemStock() {

        },

        /** 
         * TODO: Inform user about successful order, (Could be by email or order confirmation page)
        */
        successfulOrder() {

        },

        /** 
         * TODO: Add new database document in firebase with order details
        */
        addOrderToDatabase() {

        },
    },
}
</script>

<style></style>