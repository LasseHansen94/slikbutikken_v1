<template>
    <div class="container">
        <header class="header">
            <h1>Ordrebekræftigelse</h1>
            <p>Tak for din ordre. her er en kvittering på dit køb.</p>
        </header>

        <section class="order-info">
            <div>
                <h3>Ordrenummer:</h3>
                <p>{{ orderDocumentDetails.orderId }}</p>
            </div>

            <div class="customer-info">
                <h3>Din information:</h3>
                <p>Name: {{ orderDocumentDetails.customerDetails.customerInformation.name }}</p>
                <p>Email: {{ orderDocumentDetails.customerDetails.customerInformation.email }}</p>
                <p>telefonnummer: {{ orderDocumentDetails.customerDetails.customerInformation.phone }}</p>
            </div>

            <div>
                <h3 class="dev-info">leveringsinformation:</h3>
                <p>addresse: {{ orderDocumentDetails.customerDetails.deliveryDetails.address }}</p>
                <p>By: {{ orderDocumentDetails.customerDetails.deliveryDetails.city }}</p>
                <p>Postnummer: {{ orderDocumentDetails.customerDetails.deliveryDetails.postalCode }}</p>
            </div>
        </section>

        <ul class="order-items">
            <h1>Din Ordre</h1>
            <li v-for="item in orderDocumentDetails.orderDetails" :key="item.id">
                <div class="item">
                    <h2>{{ item.name }}</h2>
                    <div class="item-details">
                        <p>mængde: {{ item.quantity }} </p>
                        <p> &nbsp;Pris: {{ item.price * item.quantity }} kr.</p>
                    </div>
                    <div class="item-image">
                        <img :src="item.image" alt="Item image">
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "OrderConfirmationView",

    methods: {

    },

    data() {
        return {
            orderDocumentDetails: "",
        }
    },

    created() {
        if (this.$route.query.orderDocumentDetails) {
            this.orderDocumentDetails = JSON.parse(this.$route.query.orderDocumentDetails);
        }
    }
}
</script>

<style>
h1 {
    text-align: center;
}

.customer-info {
    color: blue;
    border: 5px, solid black;
}

.container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.order-info div,
.item {
    margin-bottom: 15px;
}

.order-info h3,
.item h2 {
    color: #333;
    margin-bottom: 5px;
}

.order-info p,
.item-details p {
    margin: 0;
    color: #666;
}

.item-image img {
    width: 100px;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.order-items {
    list-style-type: none;
    padding: 0;
}

.order-items li {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
}

.order-items li:hover {
    background-color: #f5f5f5;
}

.order-items li .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.order-items li .item h2 {
    flex: 1;
    margin-right: 10px;
}

.order-items li .item-details,
.order-items li .item-image {
    flex: 1;
    display: flex;
    align-items: center;
}

.order-items li .item-details p {
    margin: 0;
}
</style>