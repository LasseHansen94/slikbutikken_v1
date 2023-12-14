<template>
    <div>
        <h1>Kontaktside</h1>
        <div>
            <p>Velkommen til vores kontaktside. Hvordan kan vi hjælpe dig i dag?</p>
        </div>
        <div>
            <label for="navn">Navn:</label>
            <input type="text" id="navn" v-model="brugerNavn" />
        </div>
        <div>
            <label for="besked">Besked:</label>
            <textarea id="besked" v-model="besked"></textarea>
        </div>
        <button @click="sendBesked">Send Besked</button>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            brugerNavn: '',
            besked: ''
        };
    },
    methods: {
        sendBesked() {
            // Logik til at håndtere beskedens afsendelse
            console.log('Besked sendt:', this.brugerNavn, this.besked);
            // Du kan tilføje yderligere logik her, f.eks. en HTTP-anmodning til en server
        }
    }
};
</script>
  
<style scoped>
/* Din CSS-styling her */
</style>
  