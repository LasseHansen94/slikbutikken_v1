<template>
  <div class="container">
    <div class="map-container">
      <h1>Her finder du os:</h1>
      
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2250.3795411389465!2d12.54256907615486!3d55.66499989875141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4652539d9fc33167%3A0x9fe3aa5d21c772ca!2sR%C3%B8ddinggade%208%2C%201735%20K%C3%B8benhavn!5e0!3m2!1sen!2sdk!4v1702901296096!5m2!1sen!2sdk" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  max-width: 960px;
  margin: 0 auto;
}

.map-container {
  width: 200%; 
}


.text-container {
  width: 30%;
  border: 2px solid black; 
  padding: 10px; 
}
</style>