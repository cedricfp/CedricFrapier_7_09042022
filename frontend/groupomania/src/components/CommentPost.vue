<template>
  <div>
      <p><span class="author">@{{author}}</span> <span class="content">{{content}}</span></p>
  </div>
</template>

<script>


export default {
    props: ['content', 'author'],
}
</script>


<style scoped>

p {
  width: 85%;
  margin: 10px, 30px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
}


.author {
  position: relative;
  bottom: 20px;
  color: red;
}

</style>