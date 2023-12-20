<template>
    <div>
        <h2>Selections</h2>

        <!-- 
            /** 
             * TODO: Show more item information
             *      ! Use css to make it look better.
             * TODO: Add a quantity number input field with min. and max. numbers.
             *      ! Make sure the user can't input letters or symbols
             *      ! Make sure the user can't select more than item.stock
             *      ! Make sure the user can't select less than item.minimum_weight
            */
        -->
        <ul class="items-container">
            <li v-for="item in selection">
                <div class="item">
                    <div class="item-name">
                        <p> {{ item.name }} </p>
                    </div>

                    <div class="item-image">
                        <img :src="item.image" alt="Descriptive Alt Text" style="width: 100px; height: auto;">
                    </div>

                    <div class="order-quantity">
                        <p>Quantity: </p>
                        <input v-model="item.quantity" type="number">
                        <p> Minimum quantity is {{ item.minimum_weight }} </p>
                        <p> Current stock is {{ item.stock }} </p>
                    </div>

                    <div class="add-to-basket">
                        <button :disabled="typeof item.quantity !== 'number'" @click="addItemToBasket(item)"> Add </button>
                    </div>
                </div>
            </li>
        </ul>



        <!-- Temporary Notification -->
        <div v-if="showNotification" class="notification" :class="notificationColor">
            {{ notificationMessage }}
        </div>

    </div>
</template>
<script>
import basket from "../modules/basket";
import { db } from "../firebase.config.js";

export default {
    name: "Selection",
    components: {
    },
    data() {
        return {
            selection: [],
            showNotification: false,
            notificationMessage: '',
            notificationColor: 'green', // Default color
        }
    },
    methods: {

        showTempNotification(message, color = 'green') {
            this.notificationMessage = message;
            this.notificationColor = color;
            this.showNotification = true;

            // Hide the notification after a delay
            setTimeout(() => {
                this.showNotification = false;
            }, 3000);
        },

        addItemToBasket(item) {

            /**
            * TODO: Check that 'quantity' can be converted to a number, otherwise throw error.
            */

            // If item quantity is less than minimum
            if (item.quantity < item.minimum_weight) {
                this.showTempNotification("Item quantity is lees than minimum", 'red');
            // If item quantity is more than stock
            } else if (item.quantity > item.stock) {
                this.showTempNotification("Item quantity is more than currently in stock", 'red');
            // Item quantity is OK
            } else {
                this.showTempNotification(`${item.quantity}g of ${item.name} was added to basket"`, 'green');
                this.addToBasket(item)
            }

        },


        addToDatabase() { // Eksempel på hvordan du kan tilføje en ny ting til en firebase database
            // Create a reference to the 'categories/vingummi' document
            var categoryRef = db.collection("categories").doc("lakrids");

            db.collection("selection")
                .add({
                    name: `Sukker lakrids`,
                    price: `12`,
                    minimum_weight: `14`,
                    stock: `1400`,
                    category: categoryRef // Add the reference here

                })
                .then((response) => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    },

    setup() {
        const { basketState, addToBasket } = basket;

        return { basketState, addToBasket };
    },

    mounted() {

        // Henter alle "documents" / element i "selection" collectionen
        db.collection("selection")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => { // For hvert "dokument" / element i denne collection (selection) gør vi følgende. 

                    console.log(doc)

                    // Vi starter med at få fat i billedets download URL.

                    // Det gør vi ved først at skabe denne reference baseret på det billede storage location som er gemt i dokumentets variabel doc.data().category.image
                    // Jeg tror at vi gør det på denne måde da det kræver tokens at få adgang til linket.
                    const storageRef = db.app.storage().refFromURL(doc.data().image);

                    // Her henter vi selve url'en via den reference vi lige har lavet
                    storageRef.getDownloadURL(storageRef)
                        .then((url) => { // Når vi har modtaget url'en kører vi denne lambda funktion for at tilføje alle værdierne til en object som vi efterfølgende tilføjer til listen
                            this.selection.push({
                                id: doc.id,
                                name: doc.data().name,
                                price: doc.data().price,
                                stock: doc.data().stock,
                                minimum_weight: doc.data().minimum_weight,
                                category: doc.data().category.path,
                                image: url, // Download url til billedet
                            });
                        })
                        .catch((error) => {
                            // Handle any errors
                            console.error("Error fetching download URL:", error);
                            throw error;
                        });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    },
}
</script>
<style>
.items-container {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
}

.item {
    flex-basis: calc(33.333% - 20px);
    /* Adjust the width of each item */
    margin: 10px;
    /* Spacing between items */
    background-color: #f2f2f2;
    /* Background color */
    border-radius: 10px;
    /* Rounded corners for the item */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Shadow for depth */
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Centering content */
}

.item-image img {
    width: 100px;
    height: auto;
    border-radius: 50%;
    /* Rounded corners for the image */
    margin-bottom: 10px;
    /* Spacing below the image */
}

.item-name,
.order-quantity,
.add-to-basket {
    text-align: center;
    /* Center aligning the text */
    width: 100%;
    /* Full width */
    margin-bottom: 10px;
    /* Spacing inside the item */
}

.add-to-basket button {
    background-color: #4CAF50;
    /* Button color */
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    /* Rounded button */
    cursor: pointer;
}

.add-to-basket button:hover {
    background-color: #45a049;
    /* Button hover effect */
}

.order-quantity input[type="number"] {
    width: 60%;
    /* Adjust the width of the input field */
    padding: 8px;
    /* Padding for better touch area and visual appeal */
    margin: 5px 0;
    /* Margin for spacing */
    display: inline-block;
    /* Inline display */
    border: 1px solid #ccc;
    /* Border styling */
    border-radius: 4px;
    /* Rounded corners for the input field */
    box-sizing: border-box;
    /* Box sizing to maintain the width including padding and borders */
}

.order-quantity input[type="number"]:focus {
    outline: none;
    border-color: #4CAF50;
    /* Highlight color when focused */
    box-shadow: 0 0 8px 0 rgba(76, 175, 80, 0.5);
    /* Subtle shadow when focused */
}

.order-quantity input[type="number"]:invalid {
    border-color: red;
    /* Red border color for invalid input */
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    color: white;
    padding: 15px;
    border-radius: 5px;
}

.green {
    background-color: #4CAF50;
}

.red {
    background-color: #ff0000;
}

button:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
}
</style>