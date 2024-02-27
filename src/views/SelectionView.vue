<template lang="">
    <div>
        <h1>Slikudvalg</h1>

            Tilføj ved at skrive ønsket antal og derefter trykke på 'Tilføj'-knappen, og se din nuværende kurv ved at klikke på 'kurvikonet' øverst til højre på siden.

        <Selection />
    </div>
</template>

<script>
import Selection from "../components/Selection.vue";

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