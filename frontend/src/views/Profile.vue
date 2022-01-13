<template>
  <div class="profile">
    <Navigation />

    <div class="profileContainer">
      <div class="profileInfos">
        <transition name="fade"
          ><modale-profile
            :revele="revele"
            :toggleModale="toggleModale"
            :routeId="this.$route.params.id"
        /></transition>
        <div class="profileInfos__picname">
          <img v-if="!userPic" src="../../images/defaultprofilepic.jpg" />
          <img v-else :src="userPic" :key="userPic" />
          <div class="userInfos">
            <p class="name">{{ firstname }} {{ lastname }}</p>
            <p class="job" v-if="paramsUserId == 8">Développeur Web</p>
          </div>
          <button v-if="userIsCurrent" @click="toggleModale">
            <i class="fas fa-cog"></i> Modifier le profil
          </button>
        </div>
        <div class="profileInfos__desc">
          <div class="bio">
            <h1>
              Description
              <i
                class="fas fa-pen"
                @click="triggerEditing()"
                v-if="userIsCurrent"
              ></i>
            </h1>
            <div>
              <textarea
                class="bioEdit"
                v-if="isEditing"
                v-model="bio"
                rows="10"
                cols="50"
              ></textarea>
              <p v-else class="bioRender">{{ bio }}</p>
              <div class="editButton">
                <button v-if="isEditing" @click="modifyBio()">
                  <i class="fas fa-pen"></i> Valider
                </button>
              </div>
            </div>
          </div>
          <div class="profilePosts">
            <h1>Mes posts</h1>
            <div class="posts" v-for="posts in allPosts.posts" :key="posts.id">
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
                        <router-link :to="`/profile/${posts.user_id}`"
                          >{{ posts.firstname }}
                          {{ posts.lastname }}</router-link
                        >
                      </div>

                      <div class="date">{{ posts.postDate }}</div>
                    </div>
                    <button
                      v-if="posts.user_id == userId"
                      @click="deletePost(posts.id)"
                    >
                      <i class="fas fa-trash fa-lg"></i>
                    </button>
                  </div>
                </div>
                <div class="post-content">{{ posts.content }}</div>
                <div class="sub-content">
                  <div class="like"><i class="far fa-thumbs-up fa-lg"></i></div>
                  <div class="comments" @click="toggleComments">
                    Commentaires
                  </div>
                </div>
                <div v-if="commentsOn">
                  <hr />
                  ...Commentaires
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import ModaleProfile from "../components/ModaleProfile.vue";
import axios from "axios";
import Footer from "../components/Footer.vue";
import Navigation from "../components/Navigation.vue";
export default {
  name: "Newsfeed",
  components: {
    Footer,
    Navigation,
    ModaleProfile,
  },
  data: () => ({
    lastname: "",
    firstname: "",
    email: "",
    paramsUserId: "",
    userId: "",
    userIsCurrent: false,
    bio: "",
    isEditing: false,
    file: "",
    message: "",
    revele: false,
    userPic: "",
    allPosts: "",
  }),
  created() {
    this.getUserInfos();
    this.getPosts();
  },
  methods: {
    getPosts: function () {
      axios
        .get(`http://localhost:3000/posts/${this.$route.params.id}`)
        .then((res) => {
          this.allPosts = res.data;
          console.log(this.allPosts);
        });
    },
    toggleModale: function () {
      this.revele = !this.revele;
      this.getUserInfos();
    },

    getUserInfos() {
      axios
        .get("http://localhost:3000/profile/" + this.$route.params.id, {
          headers: { authorization: this.$cookies.get("token") },
        })
        .then((res) => {
          this.lastname = res.data.user.lastname;
          this.firstname = res.data.user.firstname;
          this.email = res.data.user.email;
          this.bio = res.data.user.bio;
          this.userPic = res.data.user.userPic;
          this.userId = res.data.userId;
          this.paramsUserId = this.$route.params.id;
          console.log("User connecté : " + this.userId);
          console.log("User page : " + this.paramsUserId);
          if (this.userId == this.paramsUserId) {
            this.userIsCurrent = true;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$router.push("/");
        });
    },

    triggerEditing: function () {
      this.isEditing = !this.isEditing;
    },
    modifyBio: function () {
      console.log(this.userPic);
      if (!this.userPic) {
        this.userPic = "";
      }
      const formData = new FormData();
      const userInfos = {
        lastname: this.lastname,
        firstname: this.firstname,
        email: this.email,
        bio: this.bio,
        userPic: this.userPic,
      };
      formData.append("image", this.file);
      formData.append("user", JSON.stringify(userInfos));
      axios
        .put(
          "http://localhost:3000/profile/" + this.$route.params.id,
          formData,
          {
            headers: {
              Authorization: this.$cookies.get("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          this.getUserInfos();
          console.log(res);
          this.isEditing = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/Utils/_mixins.scss";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.profile {
  width: 100%;
  @include desktop {
    width: 90%;
  }

  margin: auto;
  box-shadow: 0px 0px 5px 1px rgb(202, 202, 202);
}
.profileContainer {
  //height: 500px;
  display: flex;
  flex-direction: column;
  //width: 80%;

  background: #f4f5fc;
  margin: auto;
}
.profileInfos {
  margin: auto;
  margin-top: 10vh;
  @include desktop {
    width: 80%;
  }
  display: flex;
  flex-direction: column;
  @include desktop {
    flex-direction: row;
  }
  justify-content: space-around;

  &__picname {
    background-color: #fff;
    @include desktop {
      border-radius: 4px;
    }
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 450px;
    @include desktop {
      width: 15%;
    }
    box-shadow: 0px 0px 5px 2px rgb(202, 202, 202);
    .userInfos {
      width: 80%;
    }
    .name {
      font-family: "Roboto-bold";
      height: 25px;
      display: flex;
      font-size: 1.1em;
    }
    .job {
      display: flex;
    }
    img {
      box-shadow: 0px 0px 5px 2px rgb(202, 202, 202);
      margin-top: 20px;
      @include desktop {
        margin-top: 0;
        width: 100%;
        border-radius: 4px 4px 0 0;
      }
      width: 50%;
      object-fit: cover;
      height: 60%;
    }

    button {
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
      width: 80%;
      height: 40px;
      font-size: 100%;
      border: 0;
      border-radius: 3px;
      background: rgb(169, 189, 216);
      box-shadow: 0 0 3px 1px lightgray;
      color: #fff;
      cursor: pointer;
      margin-bottom: 20px;
      &:hover {
        opacity: 0.85;
      }
    }
  }
  &__desc {
    //background-color: #fff;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    height: 600px;
    @include desktop {
      margin-top: 0;
      width: 50%;
    }

    gap: 20px;
    h1 {
      text-align: left;
      width: 90%;
      margin: auto;
      margin-top: 20px;
    }
    .bio {
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0px 0px 5px 2px rgb(202, 202, 202);
      height: 40%;
      .bioRender {
        border-top: 1px solid rgb(228, 228, 228);
        padding-top: 8px;
        width: 90%;
        text-align: left;
        margin: auto;
        margin-top: 20px;
        height: 200px;
        white-space: pre-line;
        overflow: auto;
      }
      i {
        cursor: pointer;
      }
      .editButton {
        width: 90%;

        margin: auto;
        display: flex;
      }
      button {
        margin-top: 20px;
        width: 25%;
        height: 40px;
        font-size: 1.1em;
        border: 0;
        border-radius: 3px;
        background: rgb(169, 189, 216);
        box-shadow: 0 0 3px 1px lightgray;
        color: #fff;
        cursor: pointer;
        &:hover {
          opacity: 0.85;
        }
      }
    }
    .bioEdit {
      margin-top: 30px;
      box-shadow: 0px 0px 5px 2px rgb(202, 202, 202);
      font-family: "Roboto-regular";
      border: 0;
      resize: none;
      outline: none;
      width: 90%;
      height: 150px;
    }
  }
}

.profilePosts {
  border-radius: 4px;
  overflow: auto;
  width: 100%;
  height: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 5px 2px rgb(202, 202, 202);
  h1 {
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(228, 228, 228);
  }
  .posts {
    .post {
      box-shadow: 0px 0px 3px 3px rgb(219, 219, 219);
      background: white;
      width: 90%;
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
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
</style>
