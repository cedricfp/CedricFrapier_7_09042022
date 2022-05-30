<template>
  <div class="user" >
    <br><br>
    <input type="text" v-model="nom">
    <br>
    <input type="text" v-model="prenom">
    <br>
    <input type="email" v-model="email">
    <br>
    <input type="password" placeholder="******">
    <br>
    <button @click="modifyUser">MODIFIER</button>
    <br>
    <button @click="deleteUser" disabled>SUPPRIMER</button>
  </div>
    
</template>

<script>
import axios from "axios"

export default {
  data() {
      return {
      nom: "",
      prenom: "",
      id: "",
      email: "",
      password: "",
      }
    },

    methods: {
      async modifyUser() {
        const backendUrl = "http://localhost:3000/user/"+this.id
      try {
        const token = localStorage.getItem('token')
        const data = {prenom: this.prenom, nom: this.nom}
        const res = await axios.put(backendUrl, data, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res)
      } catch (error) {
        let message = ""
        if (error.response) {
          message = error.response.data.message
        } else {
          message = error
        }
        this.$notify({type: 'error', text: message})
        
      }
      },
      async deleteUser() {
        const backendUrl = "http://localhost:3000/user/"+this.id
      try {
        const token = localStorage.getItem('token')
        const res = await axios.delete(backendUrl, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(res)
        localStorage.removeItem("token")
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
      },
    },

    async mounted () {
      // prendre les infos du user avec le token;
      const backendUrl = "http://localhost:3000/user/me"
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get(backendUrl, {
            headers : {
                Authorization: `Bearer ${token}`
            }
        })
        this.nom = res.data.nom
        this.prenom = res.data.prenom
        this.email = res.data.email
        this.id = res.data.id
      } catch (error) {
        let message = ""
        if (error.response) {
          message = error.response.data.message
        } else {
          message = error
        }
        this.$notify({type: 'error', text: message})
        
      }
    },

}
</script>

<style scoped>
h1 {
  margin-top: 3rem;
}

</style>