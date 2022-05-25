<template>
  <div class="box">
    <div class="box-name">
      <p class="author">{{author}}</p>
      <p class="date">{{date}}</p>
    </div>
    <p  v-if="image" >
     <img :src="image"/>
     </p>
      <h1>{{id}}. {{message}}</h1>
    <div class="box-comment">
      <input type="text" placeholder="Votre commentaire" v-model="content">
      <button class="comment" @click="sendComment"><font-awesome-icon icon="fa-solid fa-paper-plane" /></button>
    </div>  

    <div class="all-comments" v-if="comments && comments.length !== 0">
      <comment-post v-for="comment in comments" :key="comment.id" 
      :content="comment.commentaire"
      :author="`${comment.nom} ${comment.prenom}`"
      />
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import CommentPost from './CommentPost.vue';

export default {
  components: { CommentPost },
  name: "PostComponent",
    props: ['message', 'author', 'date', 'image', 'id', 'comments'],
    data() {
      return {
        content: ''
      }
    },

    methods: {

        async sendComment() {
            const postToComment = {
                content: this.content,
                postId: this.id
            }
        const backendUrl = "http://localhost:3000/comment"
    
        try {
            if (
            (this.content === "")
            ) throw "Votre réponse est vide";

            const token = localStorage.getItem('token')
            const res = await axios.post(backendUrl, postToComment, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            } )

            this.$emit('refresh-post', res.data)
            
            this.$notify(res.data.message)
            
        } catch (error) {
            console.warn(error)
            //affiche un message d'erreur
            this.error = error.response.data.error
        }
        }
    },

}


</script>



<style scoped>
.box {
  background-color: rgb(245, 238, 238);
  width: 100%;
  margin: 50px 0;
}

.box-name {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(131, 128, 128);
}

.author {
 margin-left: 10px;
}

.date {
  margin-right: 10px;
}

h1 {
  margin-top: 50px;
  margin-bottom: 50px;
}

.box-comment {
  margin-bottom: 20px;
}

input {
  width: 90%;
  height: 2.7rem;
  
}

.comment {
  font-size: 18px;
  color: rgba(253, 45, 1, 255);
  background-color: white;
  position: relative;
  right: 40px;
  height: 2.65rem;
  border: none;
}


</style>