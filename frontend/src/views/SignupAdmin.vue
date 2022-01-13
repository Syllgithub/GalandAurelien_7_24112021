<template>
  <div class="sign">
    <div class="signup">
      <div id="nav"><Logo /></div>
      <div class="signupform fade-in">
        <h1>INSCRIPTION ADMIN</h1>
        <div class="form">
          <p>ID Entreprise</p>
          <input type="text" value="GPA-41547-224X" disabled />
        </div>
        <div class="testest">
          <div class="form">
            <p>Nom</p>
            <input
              type="text"
              placeholder="Dupont"
              v-model="lastname"
              v-bind:class="{
                'input-base': inputLastnameBase,
                'input-failed': inputLastnameFailed,
              }"
              ref="lastname"
              @change="checkLastname(lastname)"
            />
            <p v-if="inputLastnameFailed" class="inputFailed">
              Merci de bien vouloir renseigner votre nom.
            </p>
          </div>
          <div class="form">
            <p>Prénom</p>
            <input
              type="text"
              placeholder="Jean"
              v-model="firstname"
              v-bind:class="{
                'input-base': inputFirstnameBase,
                'input-failed': inputFirstnameFailed,
              }"
              ref="firstname"
              @change="checkFirstname(firstname)"
            />
            <p v-if="inputFirstnameFailed" class="inputFailed">
              Merci de bien vouloir renseigner votre prénom.
            </p>
          </div>
        </div>
        <div class="form">
          <p>Adresse email</p>
          <input
            type="text"
            placeholder="jean.dupont@groupomania.fr"
            v-model="email"
            v-bind:class="{
              'input-base': inputEmailBase,
              'input-failed': inputEmailFailed,
            }"
            ref="email"
            @change="checkEmail(email)"
          />
          <p v-if="inputEmailFailed" class="inputFailed">
            Merci de bien vouloir renseigner une adresse email valide.
          </p>
        </div>

        <div class="form">
          <p>Mot de passe</p>
          <input
            type="password"
            placeholder="******"
            v-model="password"
            v-bind:class="{
              'input-base': inputPasswordBase,
              'input-failed': inputPasswordFailed,
            }"
            ref="password"
            @change="checkPassword(password)"
          />
          <p v-if="inputPasswordFailed" class="inputFailed">
            Merci de bien vouloir renseigner un mot de passe valide.<br />
            1 lettre minuscule 1 lettre majuscule 1 chiffre 1 caractère spécial
            6 caractères minimum
          </p>
        </div>

        <div class="form">
          <p>Confirmez le mot de passe</p>
          <input
            type="password"
            placeholder="******"
            v-model="passwordCheck"
            v-bind:class="{
              'input-base': inputPasswordBase,
              'input-failed': inputPasswordFailed,
            }"
            ref="password"
            @change="checkPassword(passwordCheck)"
          />
        </div>
        <button class="button" @click="signup()">S'inscrire (ADMIN)</button>
        <p id="err"></p>
        <hr />
        <p class="account">
          Vous avez déjà un compte ? <router-link to="/">Connexion</router-link>
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
export default {
  components: {
    Logo,
    Footer,
  },
  name: "SignupAdmin",
  data: () => ({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    passwordCheck: "",
    passwordsAreSame: false,
    inputEmailBase: true,
    inputEmailFailed: false,
    inputLastnameBase: true,
    inputLastnameFailed: false,
    inputFirstnameBase: true,
    inputFirstnameFailed: false,
    inputPasswordBase: true,
    inputPasswordFailed: false,
  }),
  methods: {
    checkPassword: function (password) {
      let passwordRegex = new RegExp(
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{6,})$",
        "g"
      );
      let testPassword = passwordRegex.test(password);
      if (!testPassword) {
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
    checkEmail: function (email) {
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
    checkLastname: function (lastname) {
      let nameRegex = new RegExp("^[a-zA-Z- ]+$", "g");
      let testName = nameRegex.test(lastname);
      if (!testName) {
        this.inputLastnameBase = false;
        this.inputLastnameFailed = true;
        this.$refs.lastname.focus();
        return false;
      } else {
        this.inputLastnameBase = true;
        this.inputLastnameFailed = false;
        return true;
      }
    },
    checkFirstname: function (firstname) {
      let nameRegex = new RegExp("^[a-zA-Z- ]+$", "g");
      let testName = nameRegex.test(firstname);
      if (!testName) {
        this.inputFirstnameBase = false;
        this.inputFirstnameFailed = true;
        this.$refs.firstname.focus();
        return false;
      } else {
        this.inputFirstnameBase = true;
        this.inputFirstnameFailed = false;
        return true;
      }
    },
    signup: function () {
      const lastname = this.lastname;
      const firstname = this.firstname;
      const email = this.email;
      const password = this.password;
      const passwordCheck = this.passwordCheck;

      if (password === passwordCheck) {
        this.passwordsAreSame = true;
      }
      if (
        this.checkLastname(lastname) &&
        this.checkFirstname(firstname) &&
        this.checkEmail(email) &&
        this.checkPassword(password) &&
        this.passwordsAreSame
      ) {
        axios
          .post("http://localhost:3000/signup", {
            lastname: lastname,
            firstname: firstname,
            email: email,
            password: password,
            isAdmin: 1,
          })
          .then((res) => {
            console.log(res);
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
            document.querySelector("#err").innerHTML =
              "Erreur : " + err.response.data.error;
          });
      } else if (!this.passwordsAreSame) {
        document.querySelector("#err").innerHTML =
          "Erreur : les mots de passes ne correspondent pas.";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/main.scss";
.signup {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  width: 100%;
  //height: 80vh;
  margin-top: 50px;
  @include desktop {
    height: 80vh;
    flex-direction: row;
    //width: 80%;
    margin: auto;
  }
  #nav {
    width: 90%;
    @include desktop {
      width: 40%;
    }
  }
}

.signupform {
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 10px;
  background-color: white;
  width: 100%;
  //border-radius: 4px;

  @include desktop {
    //height: 600px;
    height: 90%;
    //width: 25%;
    width: 450px;
    box-shadow: 0px 0px 5px 2px rgb(202, 202, 202);
  }
  h1 {
    font-size: 1.5em;
    margin-top: 30px;
    margin-bottom: 20px;
    color: rgb(255, 0, 0);
  }
  hr {
    width: 95%;
    opacity: 0.2;
  }

  .account {
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
    color: red;
    height: 15px;
    margin-top: 10px;
  }

  .form {
    display: flex;
    margin: auto;
    width: 80%;
    flex-direction: column;
    p {
      i {
        //border: 1px dashed blue;
        width: 7%;
        display: flex;
      }
      //border: 1px solid red;
      display: flex;
      margin-bottom: 8px;
    }
    input {
      //border: 0;
      width: 95%;
      height: 35px;
      padding-left: 10px;
      border-radius: 2px;

      box-shadow: 0 0 1px 1px lightgray;
      font-size: 1em;
      &::placeholder {
        color: rgb(185, 185, 185);
      }
      &::-moz-placeholder {
        opacity: 1;
      }
      &[type="text"]:disabled {
        border: 0;
        background: #ccc;
      }
      &:focus {
        outline: none;
      }
    }
    .inputFailed {
      text-align: left;
      margin: auto;
      color: red;
    }
  }
  button {
    margin: auto;
    margin-top: 25px;
    width: 60%;
    height: 40px;
    font-size: 1.1em;
    border: 0;
    border-radius: 3px;
    background: rgb(255, 0, 0);
    box-shadow: 0 0 3px 1px lightgray;
    color: #fff;
    cursor: pointer;
    &:hover {
      opacity: 0.85;
    }
  }
  .testest {
    display: flex;
    width: 80%;
    margin: auto;

    .form {
      p {
        gap: 10px;
      }
      input {
        width: 90%;
      }
    }
  }
}
</style>
