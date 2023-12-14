<template>
    <div>
        <h1>confirmation of order</h1>
    </div>

    <div>
        {{ orderDocumentDetails }}
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

<style></style>