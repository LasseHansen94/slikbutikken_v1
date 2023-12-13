<template lang="">
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
        <li v-for="item in selection"> <!-- This will create one list with a new <div> for each item in the list -->
            <div> <!-- Will create one of these for each item in the list. Each "item" will be an individual candy option -->
                <p> {{ item.name }} </p>
                <img :src="item.image" alt="Descriptive Alt Text" style="width: 100px; height: auto;">
                <button @click="addToBasket(item)"> Add </button>

                <p> Item: {{ item }} item  </p>
            </div>
        </li>


    </div>
</template>
<script>
import basket from "../modules/basket";
import { db } from "../firebase.config.js";

export default {
    name: "Selection",
    data() {
        return {
            selection: []
        }
    },
    methods: {

        addItemToBasket(item, quantity) {

            /**
            * TODO: Check that 'quantity' can be converted to a number, otherwise throw error.
            */
            // try {

            // } catch (error) {

            // }

            // Checks that quantity is not less than minimum quantity and is not more that current stock.
            if (item.minimum_weight < quantity && item.stock > quantity) {
                item.quantity = quantity;
                this.addToBasket(item)
            } else {
                /**
                * TODO: Return error message to client and don't add to basket.
                */
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
                .then(() => {
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
<style lang="">
    
</style>