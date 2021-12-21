<template>
  <div class="log">
    <div class="login">
      <div id="nav"><Logo /></div>
      <div class="loginform fade-in">
        <h1>Connexion</h1>
        <div class="form">
          <input
            type="text"
            placeholder="Adresse mail"
            v-model="email"
            v-bind:class="{
              'input-base': inputEmailBase,
              'input-failed': inputEmailFailed,
            }"
            ref="email"
            @change="checkEmail(email)"
            @keyup.enter="login()"
          />
          <p v-if="inputEmailFailed">
            Merci de bien vouloir renseigner une adresse email valide.
          </p>
        </div>
        <div class="form">
          <input
            type="password"
            placeholder="Mot de passe"
            v-model="password"
            v-bind:class="{
              'input-base': inputPasswordBase,
              'input-failed': inputPasswordFailed,
            }"
            ref="password"
            @change="checkPassword(password)"
            @keyup.enter="login()"
          />
          <p v-if="inputPasswordFailed">
            Merci de bien vouloir renseigner un mot de passe.
          </p>
        </div>
        <button class="button" @click="login()">Se connecter</button>
        <p id="err"></p>
        <hr />
        <p class="noaccount">
          Pas encore de compte ?
          <router-link to="/sign-up">S'inscrire</router-link>
        </p>
      </div>
    </div>
    <footer class="foot"><Footer /></footer>
  </div>
</template>

<script>
import axios from "axios";

import Logo from "../components/Logo.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "Login",
  components: {
    Logo,
    Footer,
  },
  data: () => ({
    email: "",
    password: "",
    inputEmailBase: true,
    inputEmailFailed: false,
    inputPasswordBase: true,
    inputPasswordFailed: false,
  }),

  methods: {
    checkEmail: function (email) {
      //simplifier la regex REFC
      let emailRegex = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z-]{2,10}$",
        "g"
      );
      let testEmail = emailRegex.test(email);
      if (!testEmail) {
        this.inputEmailBase = false;
        this.inputEmailFailed = true;
        this.$refs.email.focus();
        return false;
      } else {
        this.inputEmailBase = true;
        this.inputEmailFailed = false;
        return true;
      }
    },
    checkPassword: function (password) {
      if (password.trim() == "") {
        this.inputPasswordBase = false;
        this.inputPasswordFailed = true;
        this.$refs.password.focus();
        return false;
      } else {
        this.inputPasswordBase = true;
        this.inputPasswordFailed = false;
        return true;
      }
    },

    login: function () {
      const email = this.email;
      const password = this.password;
      if (this.checkEmail(email) && this.checkPassword(password)) {
        axios
          .post("http://localhost:3000/login", {
            email: email,
            password: password,
          })
          .then((res) => {
            this.$cookies.set("token", res.data.token);
            this.$router.push("/newsfeed");
          })
          .catch((err) => {
            document.querySelector("#err").innerHTML =
              "Erreur : " + err.response.data.error;
          });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../scss/main.scss";
.login {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  @include desktop {
    flex-direction: row;
    //width: 80%;
    margin: auto;
    height: 80vh;
  }
  #nav {
    width: 90%;
    @include desktop {
      width: 40%;
    }
  }
}
.loginform {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  @include desktop {
    box-shadow: 0px 0px 5px 2px rgb(202, 202, 202);

    width: 25%;
    max-width: 380px;
  }
  h1 {
    font-size: 1.5em;
    margin-top: 30px;
    margin-bottom: 20px;
    color: #000;
  }
  hr {
    width: 95%;
    opacity: 0.2;
  }
  .noaccount {
    margin-bottom: 20px;
    a {
      font-family: "Roboto-bold";
      color: #2c3e50;

      &.router-link-exact-active {
        color: #2a3d94;
      }
    }
  }
  #err {
    height: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: red;
  }

  .form {
    input {
      width: 75%;
      height: 35px;
      border-radius: 2px;
      box-shadow: 0 0 1px 1px lightgray;
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
    p {
      text-align: left;
      width: 77%;
      margin: auto;
      color: red;
    }
  }
  button {
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
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
</style>
