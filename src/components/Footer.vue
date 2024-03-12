<template>
  <div class="footer">
    <div class="col1">
      <h3>Slikbutikken</h3>
      <p>Vi elsker slik lige så meget som dig!</p>
      <div class="sociale-medier">
        <a href="link-til-din-facebook-side">Facebook</a>
        &nbsp;&nbsp; 
        <a href="link-til-din-instagram-profil">Instagram</a>
      </div>
    </div>
    <div class="col2">
      <h3>Åbningstider</h3>
      <p>Mandag-fredag: 10:00 - 17:00</p>
      <p>Weekend: 10:00 - 19:00</p>
    </div>
    <div class="col3">
      <h3>Nyttige Links</h3>
      <p><router-link to="/About" class="link">Om os</router-link></p>
      <p><a href="/contact" class="link">Kontakt</a></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isVisible'],
  methods: {},
  data() {
    return {};
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 20px;
  margin-top: 20px;
}

.col1,
.col2,
.col3 {
  flex-basis: 30%;
}

.sociale-medier {
  margin-top: 10px;
}

.link {
  text-decoration: none;
  color: #333;
}

.nav-button {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  display: inline-block;
  margin-top: 10px;
}
</style>
