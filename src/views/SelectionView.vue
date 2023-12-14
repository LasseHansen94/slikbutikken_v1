<template lang="">
    <div>
        <h1>Candy selection</h1>
        <p>This is a page which shows the wide range of candy selection that we offer. 
            Add by selecting the "Add" button and see your current basket by clicking on the "basket icon" 
            on the top right of the page
        </p>

        <Selection />
    </div>
</template>

<script>
import Selection from "../components/Selection.vue"

export default {
    name: "Home",

    components: {
        Selection
    },

    methods: {

    },

    data() {
        return {

        }
    },

}
</script>

<style lang="css"></style>