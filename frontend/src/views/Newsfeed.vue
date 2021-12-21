<template>
  <div class="newsfeed">
    <div class="content">
      <div class="nav"><Navigation /></div>
      <button class="profile" @click="toProfile()">
        <img v-if="!userPic" src="../../images/defaultprofilepic.jpg" />
        <img v-else :src="userPic" />
        <p>{{ firstname }} {{ lastname }}</p>
      </button>
      <div class="createPost">
        <textarea rows="2" cols="50" v-model="postContent"> </textarea
        ><button @click="createPost">Valider</button>
      </div>
      <div class="posts" v-for="posts in allPosts.posts" :key="posts.id">
        <div class="post">
          <div class="name">
            <img
              v-if="!posts.userProfilePic"
              src="../../images/defaultprofilepic.jpg"
            />
            <img v-else :src="posts.userProfilePic" />
            <div class="bloc-infos">
              <div class="username">
                {{ posts.userFirstname }} {{ posts.userLastname }}
              </div>

              <div class="date">{{ posts.postDate }}</div>
              <button @click="deletePost(posts.id)">Supprimer</button>
            </div>
          </div>
          <div class="post-content">{{ posts.content }}</div>
          <div class="sub-content">
            <div class="like"><i class="far fa-thumbs-up fa-lg"></i></div>
            <div class="comments" @click="toggleComments">Commentaires</div>
          </div>
          <div v-if="commentsOn">
            <hr />
            ...Commentaires
            <hr />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Footer from "../components/Footer.vue";
import Navigation from "../components/Navigation.vue";
export default {
  name: "Newsfeed",
  components: {
    Footer,
    Navigation,
  },
  data: () => ({
    lastname: "",
    firstname: "",
    userId: "",
    userPic: "",
    postContent: "",
    allPosts: "",
    commentsOn: false,
  }),
  created() {
    axios
      .get("http://localhost:3000/profile", {
        headers: { authorization: this.$cookies.get("token") },
      })
      .then((res) => {
        this.lastname = res.data.user.lastname;
        this.firstname = res.data.user.firstname;
        this.userId = res.data.userId;
        this.userPic = res.data.user.userPic;
      })
      .catch((err) => {
        console.log(err);
      });
    this.getPosts();
  },
  /*beforeCreate() {
    
  },*/
  methods: {
    toProfile: function () {
      this.$router.push("/profile/" + this.userId);
    },
    toggleComments: function () {
      this.commentsOn = !this.commentsOn;
    },
    deletePost: function (id) {
      axios.delete(`http://localhost:3000/posts/${id}`).then((res) => {
        console.log(res);
        this.getPosts();
      });
    },
    createPost: function () {
      axios
        .post("http://localhost:3000/posts/", {
          userId: this.userId,
          userLastname: this.lastname,
          userFirstname: this.firstname,
          userProfilePic: this.userPic,
          content: this.postContent,
        })
        .then((res) => {
          console.log(res);
          this.getPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPosts: function () {
      axios.get("http://localhost:3000/posts/").then((res) => {
        this.allPosts = res.data;
        console.log(this.allPosts);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/Utils/_mixins.scss";
.newsfeed {
  //height: 100vh;
  //margin: auto;
  @include desktop {
    width: 90%;
  }

  background: #f4f5fc;
  margin: auto;
  box-shadow: 0px 0px 5px 1px rgb(202, 202, 202);
  .content {
    //border: 1px solid red;
    // background: #f4f5fc;
    display: flex;
    flex-direction: column;
    .createPost {
      margin-top: 10vh;
      textarea {
        resize: none;
        font-family: "Roboto-regular";
      }
    }
    .posts {
      .post {
        box-shadow: 0px 0px 3px 3px rgb(219, 219, 219);
        background: white;
        width: 50%;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        .post-content {
          text-align: left;
          display: flex;
          padding-top: 15px;
          padding-bottom: 15px;
          padding-left: 10px;
          align-items: flex-start;
          white-space: pre-line;
        }
        .sub-content {
          height: 50px;
          padding-left: 10px;
          padding-right: 10px;
          align-items: center;
          display: flex;
          justify-content: space-between;
          .comments {
            cursor: pointer;
          }
        }
        .name {
          height: 60px;
          display: flex;
          gap: 15px;
          align-items: center;
          padding-left: 10px;
          .bloc-infos {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .username {
            font-family: "Roboto-bold";
          }
          img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            //max-width: 50px;
            //height: 60%;
            // height: auto;

            object-fit: cover;
          }
        }
      }
    }
  }
}

.profile {
  display: flex;
  justify-content: center;
  font-size: 1em;
  gap: 30px;
  align-items: center;
  width: 20%;
  top: 10vh;
  right: 12vh;
  height: auto;
  position: fixed;
  border: 0;
  background: #f4f5fc;
  cursor: pointer;
  transition: 400ms;
  &:hover {
    background: #fff;
    box-shadow: 0px 0px 5px 2px rgb(202, 202, 202);
  }
  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;

    object-fit: cover;
  }
  hr {
    width: 50%;
  }
}
</style>
