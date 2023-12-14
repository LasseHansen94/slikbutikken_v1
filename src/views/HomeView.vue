<template lang="">
  <div>
    <h1>Vores mission</h1>

    <div>
      Velkommen til Slikbutikken, <br>her stræber vi  efter at skabe en unik og lækker oplevelse midt på Vesterbro. <br>Vores mission er at glæde vores kunder med en himmelsk palet af økologisk slik, der ikke kun tilfredsstiller den søde tand, men også respekterer vores planet. <br>
      Hos os er du velkommen til at udforske vores netshop, hvor du kan opleve det samme fantastiske udvalg af økologisk slik. Bestil online, <br> vælg mellem bekvem afhentning i butikken eller få dine favoritter leveret direkte til din dør. <br> Vi ønsker at gøre det nemt og bekvemt for vores kunder at nyde vores lækre produkter, uanset hvor de befinder sig.

<br> Hos os  handler det ikke kun om at sælge slik; det handler om at dele en passion for kvalitet, bæredygtighed og glæden ved det søde liv. <br> Vi ser frem til at byde dig velkommen i vores butik eller online og dele de bedste økologiske slikoplevelser med dig.
    </div>

    <button @click="test_method()">Click here</button>

    <p @click="change_variable_text()"> Besked: {{ lasses_besked_variabel }} </p>

    <Test :component_hidden="parent_hidden" />
  </div>
</template>

<script>

import Test from "../components/test.vue"
export default {
    name: "Home",

    components: {
        Test,
    },

    data() {
        return {
            message: "",
            parent_hidden: false,
            lasses_besked_variabel: "Dette er Lasses egen text"
        };
    },


    methods: {
        test_method() {

            if (this.parent_hidden == false) {
                this.parent_hidden = true
            } else {
                this.parent_hidden = false
            }
        },

        change_variable_text() {
            this.lasses_besked_variabel = "Nu er der lavet om på texten i 'lasses_besked_variabel'"
        }
    }
}
</script>

<style lang="css"></style>