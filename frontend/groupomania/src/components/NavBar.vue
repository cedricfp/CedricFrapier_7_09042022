<template>
  <div class="nav">
  <input type="checkbox" id="nav-check">
  <div class="nav-header">
    <div class="nav-img">
      <img src="../assets/icon-left-font-monochrome-white.png" alt="Logo Groupomania" />
    </div>
  </div>
  <div class="nav-btn">
    <label for="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div class="nav-links">
    <router-link to="/user"><font-awesome-icon icon="fa-solid fa-user-gear" /></router-link>
    <span class="logout" @click="logout"><font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" /></span>
    <router-link to="/home"><font-awesome-icon icon="fa-solid fa-house" /></router-link>

    
  </div>
</div>
</template>

<script>
export default {
    name: 'NavBar',
    methods: {
      logout() {
        //Qand l'utilisateur souhaite se déconnecter le token se supprime du local storage
        localStorage.removeItem('token')
        this.$store.commit('removeUser')

        //Retour a la page de connection
        this.$router.push('/')
      }
    },
}
</script>

<style scoped lang="scss">

* {
  box-sizing: border-box;
}

.nav {
  height: 50px;
  width: 100%;
  top: 0;
  background-color: #4d4d4d;
  position: fixed;
  z-index: 999;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-img {
  display: flex;
  position: absolute;
  margin-top: -75px;
  height: 200px;
  font-size: 22px;
  color: #fff;
  padding: 10px 10px 10px 10px;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links{
  display: inline;
  float: right;
  font-size: 18px;
}

.nav > .nav-links > a, .logout{
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #efefef;
  margin-right: 20px;
}

.nav > .nav-links > a:hover, .logout:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.nav > #nav-check {
  display: none;
}

@media (max-width:600px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label{
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #333;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .nav > .nav-links > a, .logout{
    display: block;
    width: 100%;
  }
  .nav > .nav-links {
    display: block;
    width: 100%;
  }
  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: calc(30vh - 70px);
    overflow-y: auto;
  }
}

</style>