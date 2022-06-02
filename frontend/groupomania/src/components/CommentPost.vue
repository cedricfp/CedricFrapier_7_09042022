<template>
  <div>
      <p>
      <span class="author">@{{author}}</span> 
      <span class="content">{{content}}</span>
      <span class="date">{{date}}</span>
      </p>
  </div>
</template>

<script>


export default {
    props: ['content', 'author', 'date'],
}
</script>


<style scoped>

p {
  width: 85%;
  padding: 10px;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
}

p > .content {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  
}


p > .author, .date {
  font-size: 12px;
  text-align: left;
  color: red;
}

</style>