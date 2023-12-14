<template>
    <div>
        <!--
            /** 
             * TODO: Initial information gathering like name, phone, email, ...
             * TODO: Create a button which goes to next step
            */
        -->

        <!-- 
            /** 
             *TODO: Delete <p> below when done!
            */
        -->
        <p>
            {{ customer }}
        </p>
        <div v-if="step == 1">
            <h1>Step 1: Customer information</h1>
            <div>
                <p> This is where the information and imput fields will be </p>

                <div>
                    <p> Full name </p>
                    <input v-model="customer.personal.name">
                </div>
                <div>
                    <p> Phone </p>
                    <input v-model="customer.personal.phone">
                </div>
                <div>
                    <p> email </p>
                    <input v-model="customer.personal.email">
                </div>


            </div>


            <div>
                <button type="button" @click="validateDataCustomer()">Next</button>
            </div>
        </div>

        <!--
            /** 
             * TODO: Second step of information gathering like, address and delivery informatin
             * TODO: Create a button which goes to next step
             * TODO: Create a button which goes to previous step
            */
        -->
        <div v-else-if="step == 2">
            <h1>Step 2: Delivery information</h1>
            <div>
                <p> This is where the information and imput fields will be </p>

                <div>
                    <p> Street and number </p>
                    <input v-model="customer.address.street">
                </div>
                <div>
                    <p> City </p>
                    <input v-model="customer.address.city">
                </div>
                <div>
                    <p> Postal code </p>
                    <input v-model="customer.address.postalCode">
                </div>


            </div>

            <div>
                <button type="button" @click="step = 1">Back</button>
                <button type="button" @click="validateDataDelivery()">Next</button>
            </div>

        </div>

        <!--
            /** 
             * TODO: Third step of information gahtering like payment details.
             * TODO: Create a button which sends order and afterwards sends user to the confirmation page
             * TODO: Create a button which goes to previous step
            */
        -->
        <div v-else-if="step == 3">
            <h1>Step 3: Payment details</h1>
            <div>
                <p> This is where the information and imput fields will be </p>

                <div>
                    <p> Cardnumber </p>
                    <input v-model="customer.paymentDetails.name">
                </div>
                <div>
                    <p> Security code </p>
                    <input v-model="customer.paymentDetails.phone">
                </div>
                <div>
                    <p> Expirey date </p>
                    <input v-model="customer.paymentDetails.expDate.month">
                    <input v-model="customer.paymentDetails.expDate.year">
                </div>


            </div>

            <div>
                <button type="button" @click="step = 2">Back</button>
                <button type="button" @click="validateDataPayment()">Complete order</button>
            </div>
        </div>

        <!--
            /** 
             * TODO: I don't know, maybe if something went wrong???
            */
        -->
        <div v-else>
            <h1>Something went wrong, please reload page and try again.</h1>
            <h2>If the issue persists, please contact us.</h2>

        </div>

    </div>
</template>

<script>
import basket from "../modules/basket";

export default {

    name: "OderProcess",

    data() {
        return {
            step: 1,
            customer: {
                personal: {
                    name: "",
                    phone: "",
                    email: "",
                },

                address: {
                    street: "",
                    city: "",
                    postalCode: "",
                    country: "DK",
                },

                paymentDetails: {
                    cardNumber: "",
                    securityCode: "",
                    expDate: {
                        month: "",
                        year: "",
                    },
                }
            },
        }
    },

    methods: {
        /** 
         * 
         * TODO: Add a function which adds the current order from basket.js
         * This is the first step which sets the whole order process,
        */

        /** 
         * TODO: Validate user input like, 
         *      
         * 
         *      * Address, 
         * 
         *      * Payment details. (Use credit card number formula)
        */

        validateDataCustomer() {

            var success = false

            /** 
             * TODO: Validate information below
             * Email, (Use regex)
             * Phone, (Should not include letters and symbols)
             * Name, (Should not include numbers or random symbols)
            */

            if (! /^\S+@\S+\.\S+$/.test(this.customer.personal.email)) {
                console.log("Error in email validation");
                return false;
            } else if (! /^\d{8}$/.test(this.customer.personal.phone)) {
                console.log("Error in phone validation");
                return false;
            } else if (! /^[a-zA-Z-]+(?:\s[a-zA-Z-]+)*(?:\s[a-zA-Z-]+)?$/.test(this.customer.personal.name)) {
                console.log("Error in name validation");
                return false;
            } else {
                // Everything was fine
                success = true
            }


            if (success) {

                // Information is correct, go to next step.
                this.step = 2;

            } else {
                /** 
                 * TODO: Inform user about error in information
                */
            }

        },

        validateDataDelivery() {
            var success = false

            /** 
             * TODO: Validate information below
             * Address
            */
            if (! "REPLACE THIS WITH REGEX LIKE ABOVE") {
                console.log("Error in street validation");
                return false;
            } else if (! "REPLACE THIS WITH REGEX LIKE ABOVE") {
                console.log("Error in city validation");
                return false;
            } else if (! "REPLACE THIS WITH REGEX LIKE ABOVE") {
                console.log("Error in POstalcode validation");
                return false;
            } else {
                // Everything was fine
                success = true
            }

            if (success) {

                // Information is correct, go to next step.
                this.step = 3;

            } else {
                /** 
                 * TODO: Inform user about error in information
                */
            }

        },

        validateDataPayment() {

            var success = false

            /** 
             * TODO: Validate information below
             * Address
            */


            if (! "REPLACE THIS WITH REGEX LIKE ABOVE") {
                console.log("Error in cardNumber validation");
                return false;
            } else if (! "REPLACE THIS WITH REGEX LIKE ABOVE") {
                console.log("Error in securityCode validation");
                return false;
            } else if (! "REPLACE THIS WITH REGEX LIKE ABOVE") {
                console.log("Error in expirey date validation");
                return false;
            } else {
                // Everything was fine
                success = true
            }

            if (success) {
                console.log("Test 1")
                // Information is correct, add order to database.
                this.addOrderToDatabase();

            } else {
                /** 
                 * TODO: Inform user about error in information
                */
            }
        },

        /** 
         * TODO: Add new database document in firebase with order details
        */
        addOrderToDatabase() {

            console.log("Sending data to database")
            db.collection("orders")
                .add({
                    orderId: "",
                    orderDetails: JSON.stringify(this.basketState.basket),
                    customerDetails: JSON.stringify(this.customer),
                })
                .then((response) => {
                    console.log("Document successfully written!", response);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

            /** 
             * TODO: Check if data was successfully sent to database, if yes send customer to success page. Else inform customer about error. 
            */

            // send data and recieve data from firebase
            if (orderDocumentDetails) {
                // Database update was successful

                // First update new stock in database and receive data from firebase.
                if (stockUpdateSuccessfull) {
                    // Data was successfully updated in database.
                    this.successfulOrder(orderDocumentDetails);
                } else {
                    // Data was not succesfully updated in database
                    console.log("Error!!!!!!");

                }

            } else {
                // Order was unsuccessful, inform customer.
            }
        },

        /** 
         * TODO: Inform user about successful order, (Could be by email or order confirmation page)
        */
        successfulOrder(orderDocumentDetails) {
            /** 
             * TODO:  Send email to customer with orderDocumentDetails.orderID
            */

            // Redirect cutomer to successful order page.
            this.$router.push({ name: 'orderConfirmation', query: { orderDocumentDetails: JSON.stringify(orderDocumentDetails) } });

        },

    },

    setup() {
        const { basketState } = basket;

        return { basketState};
    },


}
</script>

<style></style>