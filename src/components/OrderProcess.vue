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
                    <input v-model="customer.customerInformation.name">
                </div>
                <div>
                    <p> Phone </p>
                    <input v-model="customer.customerInformation.phone">
                </div>
                <div>
                    <p> email </p>
                    <input v-model="customer.customerInformation.email">
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
                    <input v-model="customer.deliveryDetails.address">
                </div>
                <div>
                    <p> City </p>
                    <input v-model="customer.deliveryDetails.city">
                </div>
                <div>
                    <p> Postal code </p>
                    <input v-model="customer.deliveryDetails.postalCode">
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
                    <input v-model="customer.paymentDetails.cardNumber">
                </div>
                <div>
                    <p> Security code </p>
                    <input v-model="customer.paymentDetails.securityCode">
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
import { db } from "../firebase.config.js";

export default {

    name: "OderProcess",

    data() {
        return {
            step: 1,
            customer: {
                customerInformation: {
                    name: "Test user",
                    phone: "22334455",
                    email: "testemail@email.com",
                },

                deliveryDetails: {
                    address: "Test street 23",
                    city: "Test city",
                    postalCode: "2400",
                    country: "DK",
                },

                paymentDetails: {
                    cardNumber: "2233445588775533",
                    securityCode: "641",
                    expDate: {
                        month: "11",
                        year: "22",
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

        validateDataCustomer() {

            /** 
             * TODO: Validate information below
             * Email, (Use regex)
             * Phone, (Should not include letters and symbols)
             * Name, (Should not include numbers or random symbols)
            */

            if (! /^\S+@\S+\.\S+$/.test(this.customer.customerInformation.email)) {
                console.log("Error in email validation");
                return false;
            } else if (! /^\d{8}$/.test(this.customer.customerInformation.phone)) {
                console.log("Error in phone validation");
                return false;
            } else if (! /^[a-zA-Z-]+(?:\s[a-zA-Z-]+)*(?:\s[a-zA-Z-]+)?$/.test(this.customer.customerInformation.name)) {
                console.log("Error in name validation");
                return false;
            } else {
                // Everything was fine
                this.step = 2;
            }

        },

        validateDataDelivery() {
            /** 
             * TODO: Validate information below
             * Address
            */
            if (! /^[A-Za-z ]+\s\d+$/.test(this.customer.deliveryDetails.address)) {
                console.log("Error in address validation");
                return false;
            } else if (! /^[A-Za-z ]+$/.test(this.customer.deliveryDetails.city)) {
                console.log("Error in city validation");
                return false;
            } else if (! /^\d{4}$/.test(this.customer.deliveryDetails.postalCode)) {
                console.log("Error in Postalcode validation");
                return false;
            } else {
                // Everything was fine
                this.step = 3;
            }
        },

        async validateDataPayment() {
            /** 
             * TODO: Validate information below
             * Credit card information
            */

            if (! /^(?:\d{4}-?){3}\d{4}$/.test(this.customer.paymentDetails.cardNumber)) {
                console.log("Error in cardNumber validation");
                return false;
            } else if (! /^\d{3}$/.test(this.customer.paymentDetails.securityCode)) {
                console.log("Error in securityCode validation");
                return false;
            } else if (! this.isExpiryDateValid(this.customer.paymentDetails.expDate.month, this.customer.paymentDetails.expDate.year)) {
                console.log("Error in expirey date validation");
                return false;
            } else {
                // Everything was fine
                // Information is correct, add order to database.

                // Get the current order number
                var currentOrderNumber = await this.getCurrentOrderNumber();

                // Increase it by one and save the new order number to a new variable
                var newOrderNumber = currentOrderNumber + 1;

                // Update the firebase database with the new order number
                this.updateOrderNumber(newOrderNumber);

                // This function creates the full order document and sends it to firebase.
                this.addOrderToDatabase(newOrderNumber);
            }

        },

        // Gets current order number from firebase
        async getCurrentOrderNumber() {
            try {
                // Use the async/await to pause the process until the promise is finished and we have the data from firebase
                const doc = await db.collection("orders").doc("orderNumber").get();
                if (doc.exists) {
                    // Return the result of the promise / database request.
                    return doc.data().orderNumber; // Return the document data
                } else {
                    console.log("No such document!");
                    return null; // Return null or some default value
                }
            } catch (error) {
                console.log("Error getting documents: ", error);
                throw error; // Re-throw the error to handle it in the caller function
            }
        },

        // Update the firebase database with the newest used order number
        async updateOrderNumber(newOrderNumber) {
            try {

                // Creates a reference to the firebase document "orderNumber" in the "orders" collection
                const orderNumberDoc = db.collection("orders").doc("orderNumber");
                // Perform the update
                // Update the value witht the parsed ordernumber.
                await orderNumberDoc.update({ orderNumber: newOrderNumber });

                console.log(`Order number updated to: ${newOrderNumber}`);
                return; // Return the updated order number

            } catch (error) {
                console.log("Error updating order number: ", error);
                throw error; // Re-throw the error to handle it
            };
        },

        isExpiryDateValid(month, year) {
            // Convert strings to numbers if necessary
            let expMonth = parseInt(month, 10);
            let expYear = parseInt(year, 10);

            // Adjust the year format to YYYY
            expYear += (expYear < 100) ? 2000 : 0;

            // Check if the month is valid
            if (expMonth < 1 || expMonth > 12) {
                return false;
            }

            // Get the current month and year
            let currentDate = new Date();
            let currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-11
            let currentYear = currentDate.getFullYear();

            // Check if the expiry year is in the past
            // or if it's the current year and the month has already passed
            if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                return false;
            }

            return true;
        },

        /** 
         * TODO: Add new database document in firebase with order details
        */
        addOrderToDatabase(newOrderNumber) {
            console.log("Sending data to database")

            /**          
            {
                customer (map) {
                    customerInformation (map) {
                        email "rasmus.email@email.com" (string),
                        name "Rasmus Lykke" (string),
                        phone "20132145" (string),
                    },
                    deliveryDetails (map) {
                        address "Main street 8" (string),
                        city "Aarhus" (string),
                        country "DK" (string),
                        postalCode 3510 (number),
                    },
                    paymentDetails (map) {
                        cardNumber 125015435942 (number),
                        expDate (map) {
                            month 12 (number),
                            year 13 (number),
                        },
                        securityCode 354 (number),
                    },
                },
                orderDetails (map) {
                    Rl3iVrdWxJZ7XGNZfJXa (map) {
                        quantity 200 (number),
                        selection /selection/Rl3iVrdWxJZ7XGNZfJXa (reference),
                    },
                    mBHOAbI5dYLNqDD4C6kb (map),
                    quantity 150 (number),
                    selection /selection/mBHOAbI5dYLNqDD4C6kb (reference),
                },
                orderNumber "0000000000" 
            }
            */
            let order = {
                orderId: newOrderNumber, // Assuming newOrderNumber is defined elsewhere in your code
                orderDetails: this.basketState.basket.reduce((acc, item) => {
                    console.log("ITEMNAME:: ", item);
                    acc[item.id] = {
                        quantity: item.quantity, // Assuming each item in basket has a quantity property
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        selection: db.doc(`/selection/${item.id}`) // Creating a Firestore reference
                    };
                    return acc;
                }, {}),
                customerDetails: {
                    customerInformation: {
                        name: this.customer.customerInformation.name,
                        phone: this.customer.customerInformation.phone,
                        email: this.customer.customerInformation.email
                    },
                    deliveryDetails: {
                        address: this.customer.deliveryDetails.address,
                        city: this.customer.deliveryDetails.city,
                        postalCode: parseInt(this.customer.deliveryDetails.postalCode),
                        country: this.customer.deliveryDetails.country
                    },
                    paymentDetails: {
                        cardNumber: parseInt(this.customer.paymentDetails.cardNumber),
                        securityCode: parseInt(this.customer.paymentDetails.securityCode),
                        expDate: {
                            month: parseInt(this.customer.paymentDetails.expDate.month),
                            year: parseInt(this.customer.paymentDetails.expDate.year)
                        }
                    }
                }
            }
            db.collection("orders")
                .add(order)
                .then((response) => {
                    this.successfulOrder(order);
                    console.log("Document successfully written!", response);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        },

        /** 
         * TODO: Inform user about successful order, (Could be by email or order confirmation page)
        */
        successfulOrder(order) {
            /** 
             * TODO:  Send email to customer with orderDocumentDetails.orderID
            */

            // Redirect cutomer to successful order page.
            this.$router.push({ name: 'orderConfirmation', query: { orderDocumentDetails: JSON.stringify(order) } });

        },

    },

    setup() {
        const { basketState } = basket;

        return { basketState };
    },


}
</script>

<style></style>