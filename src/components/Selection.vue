<template>
    <div>
        <h2>Udvalg</h2>

        
        <ul class="items-container">
            <li v-for="item in selection" class="outer-box">
                <div class="item">
                    <div class="item-name">
                        <p> {{ item.name }} </p>
                    </div>

                    <div class="item-price">
                        <p>kr. {{ item.price }},00 pr 100g  </p>
                    </div>

                    <div class="item-image">
                        <img :src="item.image" alt="Descriptive Alt Text" style="width: 100px; height: auto;">
                    </div>

                    <div class="order-quantity">
                        <p>Antal: </p>
                        <input v-model="item.quantity" type="number" :min="item.minimum_weight">
                        <p> Minimum bestilling er {{ item.minimum_weight }} </p>
                        <p> Lagerbeholdning er {{ item.stock }} </p>
                    </div>

                    <div class="add-to-basket">
                        <button :disabled="typeof item.quantity !== 'number'" @click="addItemToBasket(item)"> Tilføj
                        </button>
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
            notificationColor: 'green', 
        }
    },
    methods: {

        showTempNotification(message, color = 'green') {
            this.notificationMessage = message;
            this.notificationColor = color;
            this.showNotification = true;

            // skjul notifikationen efter et stykke tid
            setTimeout(() => {
                this.showNotification = false;
            }, 3000);
        },

        addItemToBasket(item) {

            
        // hvis quantity er mindre end minimum gør den rød
            if (item.quantity < item.minimum_weight) {
                this.showTempNotification("du skal vælge en mængde større end", item.minimum_weight, 'red');
            // If item quantity er større en lager
            } else if (item.quantity > item.stock) {this.showTempNotification("Der er kun " + item.stock + " tilbage på lager.", 'red');

            // Item quantity er OK
            } else {
                this.showTempNotification(`${item.quantity} stk ${item.name} blev tilføjet til kurven"`, 'green');
                this.addToBasket(item)
            }

        },


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
                            // for at håndtere mulige errors
                            console.error("Error med at downloade url:", error);
                            throw error;
                        });
                });
            })
            .catch((error) => {
                console.log("Fejl i at skaffe dokumntet: ", error);
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
    margin-bottom: 20px;
    flex-basis: calc(33.333% - 20px);
    
    margin: 10px;
    
    background-color: #f2f2f2;
      border-radius: 10px;
    
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    padding: 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    
}

.item-image img {
    width: 100px;
    height: auto;
    border-radius: 50%;
    margin-bottom: 10px;
}

.item-name {
    font-weight: bold;
    font-size: 18px;
}

.item-name,
.order-quantity,
.add-to-basket {
    text-align: center;
    
    width: 100%;
   
    margin-bottom: 10px;
    
}


.add-to-basket button {
    background-color: #4CAF50;
   
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    
    cursor: pointer;
}

.add-to-basket button:hover {
    background-color: #45a049;
    
}


.order-quantity input[type="number"] {
    width: 60%;
   
    padding: 8px;
    
    margin: 5px 0;
    
    display: inline-block;
    
    border: 1px solid #ccc;
    
    border-radius: 4px;
    
    box-sizing: border-box;
    
}

.order-quantity input[type="number"]:focus {
    outline: none;
    border-color: #4CAF50;
    
    box-shadow: 0 0 8px 0 rgba(76, 175, 80, 0.5);
   
}

.order-quantity input[type="number"]:invalid {
    border-color: red;
    
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
