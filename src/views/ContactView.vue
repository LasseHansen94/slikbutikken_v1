<template>
  <div class="contact-container">
    <h1>Kontaktside</h1>

    <div class="contact-info">
      <p>Velkommen til vores kontaktside. Her er vores oplysninger, så du kan tage kontakt til os</p>
      <p>Vores email: slik/buttikken@gmail.com</p>
      <p>Vores telefonnummer: 504783001</p>
    </div>
  </div>
</template>
  
<script>
export default {
    data() {
        return {
            brugerNavn: '',
            besked: ''
        };
    },  }
    
;
</script>
  
<style scoped>
/* Generel container styling */
.contact-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* Overskrift styling */
h1 {
  color: #a87373;
}

/* Kontaktinformation styling */
.contact-info {
  margin-top: 20px;
}

.contact-info p {
  margin-bottom: 10px;
}

.contact-info a {
  color: #007BFF;
}
</style>
  