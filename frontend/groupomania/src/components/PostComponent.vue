<template>
  <div class="box">
    <div class="box-name">
      <p class="author">{{author}}</p>
      <p class="date" v-if="date">{{formattedDate(date)}}</p>
    </div>
    <p  v-if="image" >
     <img :src="image" alt="image téléversée"/>
     </p>
    <!--Création des boutons pour modifier et supprimer un post par l'auteur ou l'admin avec editPost-->
    <div v-if="isEditMode">
        <input v-model="postMessage" type="text" />
        <button @click="editPost()">Modifier</button>
        <button @click="isEditMode = false">Annuler</button>
    </div>

     <div v-else class="box-post">
      <h1>{{message}}</h1> 
      <div v-if="canEdit" class="box-post-modif">
        <div @click="deletePost()" class="box-post-modif-trash"><font-awesome-icon icon="fa-solid fa-trash" /></div>
        <div @click="isEditMode = true" class="box-post-modif-modif"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></div>
      </div>
    
      </div>
      
  
      
      <div class="all-comments" v-if="comments && comments.length !== 0">
      <comment-post v-for="comment in comments" :key="comment.id" 
      :content="comment.commentaire"
      :date="formattedDate(comment.date)"
      :author="`${comment.nom} ${comment.prenom}`"
      />
    </div>
    <div class="box-comment">
      <label>
        <p style="display:none">ajouter un commentaire</p>
        <input type="text" placeholder="Votre commentaire" v-model="content" name="addComment">
      </label>
      <button title="commenter" class="comment" @click="sendComment"><font-awesome-icon icon="fa-solid fa-paper-plane" /></button>
    </div>  

    
  </div>
</template>

<script>

import axios from 'axios';
import CommentPost from './CommentPost.vue';

export default {
  components: { CommentPost },
  name: "PostComponent",
    props: ['message', 'author', 'date', 'image', 'id', 'comments', 'canEdit'],
    data() {
      return {
        postMessage: this.message,
        content: '',
        isEditMode: false,
      }
    },

    methods: {
      formattedDate(date){
        if (date) {
          const tmpDate = new Date(date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return tmpDate.toLocaleDateString("FR-fr", options)+" "+tmpDate.toLocaleTimeString("FR-fr");
        }
        return "Pas de date"
        
      },

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
        },

        async deletePost() {
            
        const backendUrl = "http://localhost:3000/post/" + this.id
    
        try {
            const token = localStorage.getItem('token')
            const res = await axios.delete(backendUrl, {
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
        },

        async editPost() {
          const backendUrl = "http://localhost:3000/post/" + this.id
    
        try {
            const modifiedPost = {content: this.postMessage}
            const token = localStorage.getItem('token')
            const res = await axios.put(backendUrl, modifiedPost, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            } )
            this.isEditMode = false
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
  width: 98%;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  border: 1mm ridge rgba(229, 35, 35, 0.6);
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

.box-post {
  margin-top: 50px;
  margin-bottom: 25px;
  border-bottom: 1px solid rgb(131, 128, 128);
  
}

.box-post > h1 {
  padding-bottom:10px;
}

.box-post > .box-post-modif {
 display: flex;
 justify-content: flex-end;
}

.box-post > .box-post-modif > .box-post-modif-trash,.box-post-modif-modif {
  margin-right: 10px;
  font-size: 1.5rem;
}

.box-comment {
  margin-bottom: 20px;
}

.box-comment > label > input {
  width: 90%;
  height: 2.7rem;
  margin: auto;
  
}

.box-comment > button {
  position: absolute;
  background-color: white;
  margin-top: 3px;
  right: 70px;
  font-size: 22px;
  color: rgba(253, 45, 1, 255);
  height: 2.65rem;
  border: none;
}

@media (max-width:600px) {

  .box-comment > button {
    right: 32px;
  }
}

@media screen and (min-width : 601px) and (max-width : 900px){
  .box-comment > button {
    right: 50px;
  }
}




</style>