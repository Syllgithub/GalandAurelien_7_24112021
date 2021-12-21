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
          <img :src="userPic" :key="userPic" />
          <div class="userInfos">
            <p class="name">{{ firstname }} {{ lastname }}</p>
            <p class="job">Développeur Web</p>
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
  }),
  created() {
    this.getUserInfos();
  },
  methods: {
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
  margin-top: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-around;

  &__picname {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 450px;
    width: 15%;
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
      width: 100%;
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
    justify-content: space-between;
    height: 800px;
    width: 60%;
    margin-bottom: 30px;
    h1 {
      text-align: left;
      width: 90%;
      margin: auto;
      margin-top: 20px;
    }
    .bio {
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
  //border: 1px solid red;
  width: 100%;
  height: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 5px 2px rgb(202, 202, 202);
}
</style>
