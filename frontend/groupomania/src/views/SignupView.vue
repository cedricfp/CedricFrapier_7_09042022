<template>
  <div class="home">
    <img alt="Logo Groupomania" src="../assets/icon-left-font.png">
      <div class="create">
      <h1>Créer un identifiant</h1>
        <div class="create_form">
          <p>Nom</p>
          <input v-model="nom" type="text">
        </div>
        <div class="create_form">
          <p>Prenom</p>
          <input v-model="prenom" type="text">
        </div>
        <div class="create_form">
          <p>Email</p>
          <input v-model="email" type="email">
        </div>
        <div class="create_form">
          <p>Mot de passe * <br> (le mot de passe doit contenir au moins un chiffre, une lettre, une majuscule et un caractère spécial)</p>
          <input v-model="password" type="password">
        </div>  
      <button @click="createUser"> Créer utilisateur</button> 

      <p>J'ai un compte <router-link to="/">me connecter</router-link> </p>
    </div>
  </div>
  
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      password: "",
    }
  },

  methods: {
    async createUser() {
      const userToCreate = {
        email: this.email,
        password: this.password,
        nom: this.nom,
        prenom: this.prenom
      }
      const backendUrl = "http://localhost:3000/user/signup"
  
      try {
        if (
          (this.email === "" ||
          this.password === "" ||
          this.nom === "" ||
          this.prenom === "")
        )throw  "veuillez saisir tous les champs";

        await axios.post(backendUrl, userToCreate)

        this.$notify('Utilisateur creéé !')
        this.$router.push("/")

        
      } catch (error) {
        let message = ""
        if (error.response) {
          message = error.response.data.message
        } else {
          message = error
        }
        this.$notify({type: 'error', text: message})
        
      }
      
      
    }
  },

}
</script>

<style scoped lang="scss">

img {
  max-width: 80%;
  height: auto;
  margin: -28% 0 -25% -7%;
  position: relative;
}
.create{
  position: relative;
  display: flex;
  flex-direction: column;
  top: 35%; left: 15%;
  width: 70%;
  border: 1px solid rgba(253,45,1,255);
  border-radius: 20px;
  background-color: rgba(249,229,197,255);
  box-shadow: 1px 5px 10px 1px;
  margin-bottom: 15%;
  padding-bottom: 7%;
  
  h1 {
    color: rgba(253,45,1,255);
  }

  .create_form{
    margin-bottom: 3%;
    p {
      margin-bottom: 1%;
      color: rgba(13,113,165,255);
    }
    input {
      border: 3px solid rgba(255,215,215,255);
      border-radius: 10px;
      width: 70%;
      height: 30px;
    }
  }
  button {
      margin: 7% 20%;
      border: 2px solid rgba(253,45,1,255);
      border-radius: 10px;
      width: 60%;
      height: 30px;
      background-color: rgba(255,215,215,255);
      &:hover{
        background: linear-gradient(170deg, rgba(253,45,1,255), rgba(255,215,215,255) );
        opacity: 0.8;
    }

  }

}



</style>
