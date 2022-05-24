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
import NavBar from './components/NavBar.vue';
export default {
  components: { NavBar },
  computed: {
    noNavbar() {
      return this.$route.meta.noNavbar
    }
  },
}
</script>


<style lang="scss">


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
