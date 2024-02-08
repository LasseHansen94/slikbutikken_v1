<template>
    <div class="container">
        <header class="header">
            <h1>Confirmation of Order</h1>
            <p>Thank you for your order. Please see the information below.</p>
        </header>

        <section class="order-info">
            <div>
                <h3>Order number:</h3>
                <p>{{ orderDocumentDetails.orderId }}</p>
            </div>

            <div class="customer-info">
                <h3>Customer information:</h3>
                <p>Name: {{ orderDocumentDetails.customerDetails.customerInformation.name }}</p>
                <p>Email: {{ orderDocumentDetails.customerDetails.customerInformation.email }}</p>
                <p>Phone: {{ orderDocumentDetails.customerDetails.customerInformation.phone }}</p>
            </div>

            <div>
                <h3>Delivery information:</h3>
                <p>Address: {{ orderDocumentDetails.customerDetails.deliveryDetails.address }}</p>
                <p>City: {{ orderDocumentDetails.customerDetails.deliveryDetails.city }}</p>
                <p>Postal code: {{ orderDocumentDetails.customerDetails.deliveryDetails.postalCode }}</p>
            </div>
        </section>

        <ul class="order-items">
            <li v-for="item in orderDocumentDetails.orderDetails" :key="item.id">
                <div class="item">
                    <h2>{{ item.name }}</h2>
                    <div class="item-details">
                        <p>Quantity: {{ item.quantity }} gram</p>
                        <p>Price: {{ item.price * item.quantity }}</p>
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

.customer-info {
 color: blue;
 border: 5px , solid black;
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