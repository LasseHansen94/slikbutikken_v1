<template>
    <div>


        <div v-if="step == 1">
            <h1>Step 1: Din information</h1>
            <div>

                <div class="user_inputs" >
                    <p> Skriv dit fulde navn </p>
                    <input v-model="customer.customerInformation.name">
                </div>
                <div>
                    <p> Skriv dit telefonnummer </p>
                    <input v-model="customer.customerInformation.phone">
                </div>
                <div>
                    <p> skriv din email </p>
                    <input v-model="customer.customerInformation.email">
                </div>
            </div>

            <div>
                <button type="button" @click="validateDataCustomer()">Next</button>
            </div>
        </div>

        <div v-else-if="step == 2">
            <h1>Step 2: forsendelses information</h1>
            <div>
                <div>
                    <p> vej og vejnummer </p>
                    <input v-model="customer.deliveryDetails.address">
                </div>
                <div>
                    <p> By </p>
                    <input v-model="customer.deliveryDetails.city">
                </div>
                <div>
                    <p> Postnummer </p>
                    <input v-model="customer.deliveryDetails.postalCode">
                </div>


            </div>

            <div>
                <button type="button" @click="step = 1">Tilbage</button>
                <button type="button" @click="validateDataDelivery()">videre</button>
            </div>

        </div>

        <div v-else-if="step == 3">
            <h1>Step 3: Betalingsoplysninger</h1>
            <div>


                <div>
                    <p> Kortnummer </p>
                    <input v-model="customer.paymentDetails.cardNumber">
                </div>
                <div>
                    <p> Sikkerhedskode </p>
                    <input v-model="customer.paymentDetails.securityCode">
                </div>
                <div>
                    <p> Udløbsdato </p>
                    <input v-model="customer.paymentDetails.expDate.month">
                    <input v-model="customer.paymentDetails.expDate.year">
                </div>


            </div>

            <div>
                <button type="button" @click="step = 2">Tilbage</button>
                <button type="button" @click="validateDataPayment()">gennemfør ordre</button>
            </div>
        </div>

        <div v-else>
            <h1>Noget gik galt Ipdater siden og prøv igen.</h1>
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
                        year: "24",
                    },
                }
            },
        }
    },

    methods: {
        /** 
         * 
         * Det her er det første skridt i processen.
        */

        validateDataCustomer() {



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
                // alt er ok -vi kan fortsætte til step 2
                this.step = 2;
            }

        },

        validateDataDelivery() {

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
                // alt var ok - fortsæt til step 3
                this.step = 3;
            }
        },

        async validateDataPayment() {


            if (! /^(?:\d{4}-?){3}\d{4}$/.test(this.customer.paymentDetails.cardNumber)) {
                console.log("Error in cardNumber validation");
                return false;
            } else if (! /^\d{3}$/.test(this.customer.paymentDetails.securityCode)) {
                console.log("Error in securityCode validation");
                return false;
            } else if (!this.isExpiryDateValid(this.customer.paymentDetails.expDate.month, this.customer.paymentDetails.expDate.year)) {
                console.log("Error in expirey date validation");
                return false;
            } else {
                // alt er ok
                // input er ok , tilføf odre til database.

                // få det nuværende odrenummer
                var currentOrderNumber = await this.getCurrentOrderNumber();

                // plus odrenummer med 1, sådan det er unikt.
                var newOrderNumber = currentOrderNumber + 1;

                // opdater firebase med det nye odrenummer
                this.updateOrderNumber(newOrderNumber);
                // Denne funktion sender hele odren til firebase.
                this.addOrderToDatabase(newOrderNumber);
            }

        },

        // vi skaffer det nuværende odrenummer
        async getCurrentOrderNumber() {
            try {
                // brug async/await til at pause processen indtil vores promise er færdigt og vi har dataen fra firebase.
                // vi laver et promise med async/await, så vi venter til vi har dataen fra firebase.

                const doc = await db.collection("orders").doc("orderNumber").get();
                if (doc.exists) {
                    // vi retunerer resultatet af mit promise.  
                    return doc.data().orderNumber; // Return odre
                } else {
                    console.log("No such document!");
                    return null; // hvis der ikke findes et dokument i firebase med odrenummeret skal det logges i console
                }
            } catch (error) {
                console.log("Error getting documents: ", error);
                // vi sender en error, hvis det ikke virker.
                throw error;
            }
        },
        //opdater firebase med det nyeste odrenummer
        async updateOrderNumber(newOrderNumber) {
            try {


                // vi laver en reference til ordernummer i ordre collection
                const orderNumberDoc = db.collection("orders").doc("orderNumber");

                await orderNumberDoc.update({ orderNumber: newOrderNumber });

                console.log(`Order number updated to: ${newOrderNumber}`);
                return; // Vi retunerer det nye odrenummer og logger for at sikre os det er gået igennem.

            } catch (error) {
                console.log("Der skete en fejl ved opdatering af odrenummer: ", error);
                throw error;
            };
        },

        isExpiryDateValid(month, year) {
            // Vi konverter strings til tal, hvis det skulle blive nødvendigt.
            let expMonth = parseInt(month, 10);
            let expYear = parseInt(year, 10);

            // Vi formaterer formatet på år yil YYYY
            expYear += (expYear < 100) ? 2000 : 0;

            // Vi checker om det er en ægte måned ift. javascript måneder som er 0-11
            if (expMonth < 1 || expMonth > 12) {
                return false;
            }

            // Vi skaffer nuværende dato
            let currentDate = new Date();
            let currentMonth = currentDate.getMonth() + 1; // Vi tilføjer 1, da javascript måneder er 0-11
            let currentYear = currentDate.getFullYear();
            // vi checker om udløbsdatoen er i fortiden.
            if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                return false;
            }

            return true;
        },
        addOrderToDatabase(newOrderNumber) {
            console.log("Sending data to database")

            let order = {
                orderId: newOrderNumber,
                orderDetails: this.basketState.basket.reduce((acc, item) => {
                    console.log("ITEMNAME:: ", item);
                    acc[item.id] = {
                        quantity: item.quantity,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        selection: db.doc(`/selection/${item.id}`) // Vi laver en firestone reference
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
        */
        successfulOrder(order) {
            console.log("success")
            this.$router.push({ name: 'orderConfirmation', query: { orderDocumentDetails: JSON.stringify(order) } });

        },

    },

    setup() {
        const { basketState } = basket;

        return { basketState };
    },


}
</script>

<style>

</style>