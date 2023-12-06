<template lang="">
    <div>
        <h1 v-if=!component_hidden> This is hidden </h1>
        <h1 v-else> Nothing to show </h1>
    </div>
</template>
<script>
export default {
    name: "Test",

    props: {
        component_hidden: Boolean,
    },

    data() {
        return {
            
        }
    },
    
}
</script>
<style lang="">
    
</style>