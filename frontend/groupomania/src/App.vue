<template>
  <div id="app">
    <header v-if="!noNavbar">
      <div class="navbar">
        <nav-bar />
      </div>
    </header>
    <pre>{{noNavbar}}</pre>
    
    <router-view />
    <notifications/>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './components/NavBar.vue';
export default {
  components: { NavBar },
  computed: {
    noNavbar() {
      return this.$route.meta.noNavbar
    }
  },
  async mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      try {const userRes = await axios.get("http://localhost:3000/user/me", {
            headers : {
                Authorization: `Bearer ${token}`
            }
      })
      this.$store.commit('addUser', userRes.data)
      } catch (e) {console.log(e)}
    }
  }
}
</script>


<style>

img {
  max-width: 300px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0
}

</style>
