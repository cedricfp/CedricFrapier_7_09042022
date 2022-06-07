<template>
  <div class="post">
    <div class="post_img">
      <label><p style="display:none">ajouter une image</p>
        <font-awesome-icon
          @drop="dragFile"
          class="post-icone"
          icon="fa-solid fa-file-image"
          @click="$refs.file.click()"
        />
        <input class="post-img-select" type="file" multiple @change="downloadImg" style="display:none" ref="file"/>
      </label>
    </div>
    <label><p style="display:none">ajouter un message</p>

    <textarea class="post-comment"
      type="text"
      placeholder="Quoi de neuf aujourd'hui !"
      v-model="content"
    > </textarea>
    </label>
    <button @click="sendPost">Poster</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      content: "",
      file: [],
    };
  },
  methods: {
    downloadImg(e) {
      this.file = e.target.files;
    },

    dragFile(e) {
      this.file = e.dataTransfert.files;
    },
    async sendPost() {
      try {
        if (this.content === "" && this.file.length===0) throw "Votre post est vide";

        const postToSend = new FormData();
        const backendUrl = "http://localhost:3000/post";
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
        if (this.content !== "" ) postToSend.append("content", this.content);
        if (this.file.length > 0) {
          postToSend.append("image", this.file[0]);
          headers["Content-type"] = "multipart/form-data";
        }
        const res = await axios.post(backendUrl, postToSend, {
          headers,
        });

        this.$emit('refresh-post', res.data)

        this.$notify(res.data.message);
      } catch (error) {
        console.warn(error);
        //affiche un message d'erreur
        this.error = error.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.post-icone {
  font-size: 3.5rem;
  margin-bottom: 30px;
}

.post {
  margin-top: 6rem;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 50px;
  width: 80%;
  background-color: rgba(249, 229, 197, 255);
  border: 1mm ridge rgba(229, 35, 35, 0.6);
  border-radius: 20px;
  padding: 10% 0 10% 0;
}

.post-comment {
  z-index: 1;
  padding: 2rem 1rem;
  width: 70%; /* THE WIDTH (%) */
  font-size: 15px;
  font-weight: 80;
  color: #333;
  border: none;
  outline: none;
  border-radius: 3px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background: rgb(245, 238, 238);
}
input::-webkit-input-placeholder {
  color: black;
}
input:-ms-input-placeholder {
  color: black;
}
input::-ms-input-placeholder {
  color: black;
}
input::placeholder {
  color: black;
}

/* 
  THE BUTTON
*/

button {
  user-select: none;
  border: none;
  outline: none;
  cursor: pointer;
  background: rgba(255, 215, 215, 255);
  margin-top: 10px;
  width: 60%;
  color: black;
  font-family: "Roboto", sans-serif;
  border-radius: 3px;
  padding: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  transition: 0.7s;
}
button:hover {
  background: rgba(253, 45, 1, 255);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
}
button:active {
  transform: scale(1.1);
}
</style>
