<template lang="">
    <div>
        <h1>Orders page</h1>

        <Basket />
        <Selection />

    </div>
</template>

<script>
import Basket from "../components/Basket.vue"
import Selection from "../components/Selection.vue"

export default {
    name: "Home",

    components: {
        Basket,
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

<style lang="css">
    
</style>