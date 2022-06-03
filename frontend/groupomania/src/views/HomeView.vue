<template>
  <div class="home">
    <div class="newPost">
      <post-maker @refresh-post="getPosts"/>
    </div>

    <div class="all-posts" v-if="allPosts.length > 0">
      <post-component v-for="post in allPosts" @refresh-post="getPosts" 
        :key="post.id" 
        :image="post.image" 
        :id="post.id" 
        :message="post.message" 
        :date="post.datecreation" 
        :comments="post.comments" 
        :canEdit="canEdit(post.authorId)"
        :author="`${post.nom} ${post.prenom}`" 
      />
    </div>
    
    
  </div>
</template>

<script>
// @ is an alias to /src
import PostMaker from '@/components/PostMaker.vue';
import PostComponent from '@/components/PostComponent.vue';
import axios from 'axios';

export default {
  name: "HomeView",
  components: {
    PostMaker,
    PostComponent,
  },
  data() {
    return {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      allPosts: [],
    }
  },
  computed: {
    userData() {
      const user = this.$store.state.user 
      if (user) return {id: user.id, isAdmin: user.isAdmin}
      return null
    }
  },
  methods: {
    async downloadImg() {
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
      
      
    },
    async getPosts() {
      const backendUrl = 'http://localhost:3000/post/'
      const token = localStorage.getItem('token')
      const res = await axios.get(backendUrl, {
          headers : {
              Authorization: `Bearer ${token}`
          }
      })
      this.allPosts = res.data
    },
    canEdit(authorId) {
      if (this.userData) {
        return this.userData.id === authorId || this.userData.isAdmin === 1
      }
      return false
    }
  },

  mounted () {
    this.getPosts();
  },

}
</script>

<style scoped lang="scss">


</style>
