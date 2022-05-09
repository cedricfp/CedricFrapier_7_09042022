<template>
  <div>
      <h1>{{title}}</h1>
      <p>{{description}}</p>
      <a href="#">{{author}}</a>
  </div>
</template>

<script>
export default {
  name: "PostComponent",
    props: ['title', 'description', 'author'],
}
</script>

<style>

</style>