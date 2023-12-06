<template lang="">
  <div>
    <h1>Home page</h1>

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
        this.parent_hidden =  false
      }
    },

    change_variable_text(){
      this.lasses_besked_variabel = "Nu er der lavet om på texten i 'lasses_besked_variabel'"
    }
  }
}
</script>

<style lang="css">
  
</style>