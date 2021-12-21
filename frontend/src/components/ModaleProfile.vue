<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay"></div>

    <div class="modale">
      <div class="btn-modale" @click="toggleModale">
        <i class="fas fa-window-close fa-lg"></i>
      </div>
      <h2>Paramètres du compte</h2>
      <hr />
      <div class="modale__name">
        <p>Nom et Prénom</p>
        <input type="text" v-model="lastname" />
        <input type="text" v-model="firstname" />
      </div>

      <div class="modale__profilePic">
        <p>Photo de profil</p>
        <div class="pic">
          <img
            :src="tempUserPic"
            :key="tempUserPic"
          /><!--src="../../images/aurelien.galand.jpg" />-->
          <form @submit.prevent="onSubmit" enctype="multipart/form-data">
            <label for="picture" class="picture">Choisir une image</label>
            <div class="fields">
              <input
                ref="file"
                id="picture"
                type="file"
                accept=".jpg, .jpeg, .png"
                @change="onSelect"
              />
            </div>
          </form>
        </div>
      </div>
      <div class="modale__email">
        <p>Email</p>
        <input type="text" v-model="email" />
      </div>
      <div class="modale__mdp">
        <p>Mot de passe</p>
        <a href="#">Modifier le mot de passe</a>
      </div>
      <div class="modale__delete">
        <p>Compte</p>
        <a href="#">Supprimer le compte</a>
      </div>

      <div class="modale__buttons">
        <button class="btn-blue" @click="updateProfile()">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ModaleProfile",
  props: ["revele", "toggleModale", "routeId"],
  data: () => ({
    lastname: "",
    firstname: "",
    email: "",
    userPic: "",
    tempUserPic: "",
    userId: "",
    bio: "",
    file: "",
  }),
  methods: {
    onSelect() {
      const file = this.$refs.file.files[0];
      this.file = file;
      this.tempUserPic = window.URL.createObjectURL(this.file);
    },
    getUserInfos() {
      axios
        .get("http://localhost:3000/profile/" + this.routeId, {
          headers: { authorization: this.$cookies.get("token") },
        })
        .then((res) => {
          this.lastname = res.data.user.lastname;
          this.firstname = res.data.user.firstname;
          this.email = res.data.user.email;
          this.bio = res.data.user.bio;
          this.userPic = res.data.user.userPic;
          this.tempUserPic = this.userPic;
          this.userId = res.data.userId;
          if (this.userId == this.routeId) {
            this.userIsCurrent = true;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$router.push("/");
        });
    },
    updateProfile: function () {
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
        .put("http://localhost:3000/profile/" + this.routeId, formData, {
          headers: {
            Authorization: this.$cookies.get("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          //this.getUserInfos();
          console.log(res);
          this.toggleModale();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.getUserInfos();
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/Utils/_mixins.scss";
.bloc-modale {
  a {
    font-family: "Roboto-bold";
    color: #2c3e50;
    text-decoration: none;
  }
  input {
    font-size: 1em;
    padding-left: 10px;
    &::placeholder {
      color: rgb(185, 185, 185);
    }
    &::-moz-placeholder {
      opacity: 1;
    }
    &:focus {
      outline: none;
    }
  }
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .overlay {
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .modale {
    background: #f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    top: 10%;
    display: flex;
    flex-direction: column;
    @include desktop {
      max-width: 800px;
      width: 60%;
    }

    hr {
      width: 90%;
      color: rgb(255, 255, 255);
    }
    h2 {
      font-size: 1.5em;
      color: #2c3e50;
      height: 50px;
    }
    .btn-modale {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      color: #2c3e50;
      font-size: 1.1em;
    }
    &__name {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: auto;
      height: 70px;
      p {
        display: flex;
      }
      input {
        width: 35%;
        height: 40%;
        border: 0;
        border-radius: 2px;

        box-shadow: 0 0 1px 1px lightgray;
      }
      div {
        width: 48%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    &__profilePic {
      display: flex;
      width: 90%;
      height: 70px;
      margin: auto;
      align-items: center;
      justify-content: flex-start;
      img {
        width: 30%;
        height: 62px;
        object-fit: cover;
        border-radius: 50%;
      }
      .pic {
        display: flex;
        width: 30%;
        align-items: center;
        justify-content: space-between;
        input {
          display: none;
        }
        .picture {
          cursor: pointer;
          font-family: "Roboto-bold";
          color: #2c3e50;
        }
      }
      p {
        text-align: left;
        width: 21.5%;
      }
    }
    &__email {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: auto;
      height: 70px;
      input {
        width: 77%;
        height: 40%;
        border: 0;
        border-radius: 2px;

        box-shadow: 0 0 1px 1px lightgray;
      }
    }
    &__mdp {
      width: 90%;
      display: flex;
      margin: auto;
      height: 70px;
      align-items: center;
      p {
        text-align: left;
        width: 21.5%;
      }
    }
    &__delete {
      width: 90%;
      display: flex;
      margin: auto;
      height: 70px;
      align-items: center;
      p {
        text-align: left;
        width: 21.5%;
      }
      a {
        color: red;
      }
    }
    &__buttons {
      width: 90%;
      display: flex;
      margin: auto;
      gap: 10px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      button {
        width: 35%;
        height: 40px;
        font-size: 1.1em;
        border: 0;
        border-radius: 3px;

        box-shadow: 0 0 3px 1px lightgray;
        color: #fff;
        cursor: pointer;

        &:hover {
          opacity: 0.85;
        }
      }
      .btn-blue {
        background: lightsteelblue;
      }
    }
  }
}
</style>
