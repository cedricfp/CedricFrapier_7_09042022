<template>
  <div>
      <p><span class="author">@{{author}}</span> - {{content}}</p>
  </div>
</template>

<script>


export default {
    props: ['content', 'author'],
}
</script>


<style scoped>

p {
  padding: 20px;
  border: 2px solid black;
}

.author {
  color: red;
}

</style>