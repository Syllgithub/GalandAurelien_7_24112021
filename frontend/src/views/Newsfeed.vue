<template>
  <div class="newsfeed">
    <div class="content">
      <div class="nav"><Navigation :userId="userId" /></div>
      <div class="profile">
        <button class="profile-btn" @click="toProfile()">
          <img v-if="!userPic" src="../../images/defaultprofilepic.jpg" />
          <img v-else :src="userPic" />
          <p>{{ firstname }} {{ lastname }}</p>
        </button>
        <hr />
      </div>

      <div class="createPost">
        <div class="write">
          <img v-if="!userPic" src="../../images/defaultprofilepic.jpg" />
          <img v-else :src="userPic" />
          <textarea
            @input="resize($event)"
            rows="1"
            cols="50"
            v-model="postContent"
            placeholder="Ecrire quelque chose..."
          >
          </textarea>
        </div>
        <button @click="createPost">Publier</button>
      </div>
      <div
        class="posts"
        v-for="(posts, index) in allPosts.posts"
        :key="posts.postId"
      >
        <div class="post">
          <div class="name">
            <img
              v-if="!posts.userPic"
              src="../../images/defaultprofilepic.jpg"
            />
            <img v-else :src="posts.userPic" />
            <div class="bloc-infos">
              <div class="bloc-username">
                <div class="username">
                  <router-link :to="`/profile/${posts.postUserID}`"
                    >{{ posts.userFirstname }}
                    {{ posts.userLastname }}</router-link
                  >
                </div>

                <div class="date">{{ posts.postDate }}</div>
              </div>
              <button
                v-if="posts.postUserID == userId || isAdmin === 1"
                @click="deletePost(posts.postId)"
              >
                <i class="fas fa-trash fa-lg"></i>
              </button>
            </div>
          </div>
          <div class="post-content">{{ posts.postContent }}</div>
          <div class="sub-content">
            <div class="like"><i class="far fa-thumbs-up fa-lg"></i></div>
            <div class="comments" @click="toggleComments(index)">
              Commentaires
            </div>
          </div>
          <div v-if="commentsOn[index]" class="comment-content">
            <textarea
              class="commentTextArea"
              @input="resize($event)"
              cols="30"
              rows="1"
              placeholder="Ecrire un commentaire..."
              @keyup.enter.exact="createComment(posts.postId)"
              v-model="commentContent"
            ></textarea>
            <div v-for="comments in posts.comments" :key="comments">
              <div class="comment">
                <img
                  v-if="!comments.commentUserPic"
                  src="../../images/defaultprofilepic.jpg"
                />
                <img v-else :src="comments.commentUserPic" />
                <div class="user-comment">
                  <div class="bloc-username">
                    <div class="username">
                      <router-link :to="`/profile/${comments.commentUserId}`"
                        >{{ comments.commentFirstname }}
                        {{ comments.commentLastname }}</router-link
                      >
                    </div>
                  </div>
                  <div class="comment-text">
                    <p>{{ comments.commentContent }}</p>
                  </div>
                </div>
                <button
                  v-if="comments.commentUserId == userId || isAdmin === 1"
                  @click="deleteComment(comments.commentId)"
                >
                  <i class="fas fa-trash fa-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
//import jwt from "jsonwebtoken";
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
    commentContent: "",
    allPosts: "",
    isAdmin: 0,
    commentsOn: [],
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
        this.isAdmin = res.data.user.isAdmin;
      })
      .catch((err) => {
        console.log(err);
      });
    this.getPosts();
  },
  methods: {
    resize(e) {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    },
    toProfile: function () {
      this.$router.push("/profile/" + this.userId);
    },
    toggleComments: function (index) {
      this.commentsOn[index] = !this.commentsOn[index];
    },
    deletePost: function (id) {
      axios
        .delete(`http://localhost:3000/posts/${id}`, {
          headers: { authorization: this.$cookies.get("token") },
        })
        .then((res) => {
          console.log(res);
          this.getPosts();
        });
    },
    deleteComment: function (id) {
      axios
        .delete(`http://localhost:3000/comments/${id}`, {
          headers: { authorization: this.$cookies.get("token") },
        })
        .then((res) => {
          console.log(res);
          this.getPosts();
        });
    },
    createPost: function () {
      axios
        .post(
          "http://localhost:3000/posts/",
          { content: this.postContent },
          {
            headers: { authorization: this.$cookies.get("token") },
          }
        )
        .then((res) => {
          console.log(res);
          this.getPosts();
          this.postContent = "";
          document.querySelector("textarea").style.height = "auto";
          this.commentsOn[0] = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createComment: function (postId) {
      axios
        .post(
          "http://localhost:3000/comments/",
          {
            postId: postId,
            content: this.commentContent,
          },
          { headers: { authorization: this.$cookies.get("token") } }
        )
        .then((res) => {
          console.log(res);
          this.getPosts();
          document.querySelector(".commentTextArea").style.height = "auto";
          this.commentContent = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPosts: function () {
      axios.get("http://localhost:3000/posts/").then((res) => {
        this.allPosts = res.data;
        this.allPosts.posts.forEach(() => {
          this.commentsOn.push(false);
        });
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
      display: flex;
      flex-direction: column;
      width: 100%;
      @include desktop {
        width: 40%;
      }
      margin: auto;
      margin-top: 10vh;
      margin-bottom: 15px;
      box-shadow: 0px 0px 5px 1px rgb(214, 214, 214);
      border-radius: 4px;
      //background: #fff;
      .write {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        //align-items: center;
      }
      img {
        object-fit: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      textarea {
        box-sizing: border-box;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        width: 80%;

        border: 0;
        border: 1px solid rgb(243, 243, 243);
        box-shadow: 0px 0px 2px 0px rgb(202, 202, 202);
        resize: none;
        font-family: "Roboto-regular";
        font-size: 1em;
        overflow: hidden;
        &:focus {
          outline: none;
        }
      }
      button {
        margin-top: 7px;
        margin-bottom: 7px;
        margin-right: 3%;
        border: 0;
        width: 20%;
        height: 30px;
        background: lightsteelblue;
        color: #fff;
        font-size: 1.1em;
        border-radius: 4px;
        align-self: end;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    .posts {
      .post {
        border-radius: 4px;
        box-shadow: 0px 0px 3px 3px rgb(228, 228, 228);
        background: white;
        width: 100%;
        @include desktop {
          width: 40%;
        }
        margin: auto;
        margin-top: 15px;
        margin-bottom: 15px;
        .post-content {
          text-align: left;
          display: flex;
          padding-top: 15px;
          padding-bottom: 15px;
          padding-left: 10px;
          padding-right: 10px;
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
            user-select: none;
          }
        }
        .comment-content {
          display: flex;
          flex-direction: column;
          width: 90%;
          margin: auto;
          border-top: 1px solid rgb(223, 223, 223);
          padding-bottom: 20px;
          padding-top: 20px;
          .comment {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
            button {
              border: 0;
              background: 0;
              cursor: pointer;
              margin-right: 5px;
              color: #2c3e50;
              &:hover {
                opacity: 0.75;
              }
            }
            img {
              border-radius: 50%;
              width: 45px;
              height: 45px;
              object-fit: cover;
            }
            &-text {
              text-align: left;
              white-space: pre-line;
            }
          }
          .user-comment {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            background: #f4f5fc;
            padding: 5px;
            border-radius: 4px;
            a {
              font-family: "Roboto-bold";
              text-decoration: none;
              color: #2c3e50;
            }
          }
          textarea {
            /* resize: none;
            font-family: "Roboto-regular";*/
            box-sizing: border-box;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-left: 10px;
            margin-bottom: 10px;

            border: 0;
            border: 1px solid rgb(243, 243, 243);
            box-shadow: 0px 0px 2px 0px rgb(202, 202, 202);
            resize: none;
            font-family: "Roboto-regular";
            font-size: 1em;
            overflow: hidden;
            &:focus {
              outline: none;
            }
          }
        }

        .name {
          height: 60px;
          display: flex;
          gap: 15px;
          align-items: center;
          padding-left: 10px;
          .bloc-infos {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            .date {
              font-size: 0.9em;
              color: grey;
            }
            .bloc-username {
              display: flex;

              flex-direction: column;
              align-items: flex-start;
            }
            button {
              border: 0;
              background: 0;
              cursor: pointer;
              margin-right: 5px;
              color: #2c3e50;
              &:hover {
                opacity: 0.75;
              }
            }
          }

          .username {
            font-family: "Roboto-bold";
            a {
              text-decoration: none;
              color: #2c3e50;
              &.router-link-exact-active {
                color: #2c3e50;
              }
            }
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
  display: none;
  //position: fixed;
  hr {
    display: none;
  }
  @include desktop {
    margin-top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    //border: 1px solid red;
    position: fixed;
    width: 20%;
    top: 10vh;
    height: auto;
    right: 12vh;
    hr {
      display: initial;
      width: 70%;
      margin-top: 30px;
      color: rgb(255, 255, 255);
    }
  }
}
.profile-btn {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 1em;
  gap: 30px;
  display: flex;
  align-items: center;
  height: auto;
  border: 0;
  background: #f4f5fc;
  cursor: pointer;
  transition: 250ms;
  &:hover {
    border-radius: 4px;
    //background: #fff;
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
