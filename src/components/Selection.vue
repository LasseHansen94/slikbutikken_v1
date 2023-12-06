<template lang="">
    <div>
        <h2>Selections</h2>
        <li v-for="item in selection"> 
            <p> {{ item.name }} </p>
            <img :src="item.image" alt="Descriptive Alt Text" style="width: 100px; height: auto;">
            <button @click="addToBasket(item)"> Add </button>
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

        addToDatabase() { // Eksempel på hvordan du kan tilføje en ny ting til en firebase database
            // Create a reference to the 'categories/vingummi' document
            var categoryRef = db.collection("categories").doc("lakrids");

            db.collection("selection")
                .add({
                    name: `Sukker lakrids`,
                    price: `12`,
                    weight: `14`,
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

                    // Vi starter med at få fat i billedets download URL.

                    // Det gør vi ved først at skabe denne reference baseret på det billede storage location som er gemt i dokumentets variabel doc.data().category.image
                    // Jeg tror at vi gør det på denne måde da det kræver tokens at få adgang til linket.
                    const storageRef = db.app.storage().refFromURL(doc.data().image);

                    // Her henter vi selve url'en via den reference vi lige har lavet
                    storageRef.getDownloadURL(storageRef)
                        .then((url) => { // Når vi har modtaget url'en kører vi denne lambda funktion for at tilføje alle værdierne til en object som vi efterfølgende tilføjer til listen
                            this.selection.push({
                                name: doc.data().name,
                                price: doc.data().price,
                                stock: doc.data().stock,
                                weight: doc.data().weight,
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