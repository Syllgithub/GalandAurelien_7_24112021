<template>
  <div class="sign">
    <div class="signup">
      <div id="nav"><Logo /></div>
      <div class="signupform fade-in">
        <h1>S'inscrire</h1>
        <div class="form">
          <p><i class="fas fa-passport"></i> ID Entreprise</p>
          <input type="text" value="GPA-41547-224X" disabled />
        </div>
        <div class="form">
          <p><i class="fas fa-user"></i> Nom</p>
          <input type="text" placeholder="Dupont" v-model="lastname" />
        </div>
        <div class="form">
          <p><i class="far fa-user"></i> Prénom</p>
          <input type="text" placeholder="Jean" v-model="firstname" />
        </div>
        <div class="form">
          <p><i class="fas fa-envelope"></i> Adresse email</p>
          <input
            type="text"
            placeholder="jean.dupont@groupomania.fr"
            v-model="email"
          />
        </div>
        <div class="form">
          <p><i class="fas fa-lock"></i> Mot de passe</p>
          <input type="password" placeholder="******" v-model="password" />
        </div>

        <div class="form">
          <p><i class="fas fa-lock"></i> Confirmez le mot de passe</p>
          <input type="password" placeholder="******" v-model="passwordCheck" />
        </div>
        <button class="button" @click="signup()">S'inscrire</button>
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
  name: "Signup",
  data: () => ({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    passwordCheck: "",
  }),
  methods: {
    signup: function () {
      const lastname = this.lastname;
      const firstname = this.firstname;
      const email = this.email;
      const password = this.password;

      axios
        .post("http://localhost:3000/signup", {
          lastname: lastname,
          firstname: firstname,
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res);
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss">
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
    width: 350px;
    box-shadow: 0px 0px 5px 2px rgb(202, 202, 202);
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
      border: 0;
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
        background: #ccc;
      }
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
    background: lightsteelblue;
    box-shadow: 0 0 3px 1px lightgray;
    color: #fff;
    cursor: pointer;
    &:hover {
      opacity: 0.85;
    }
  }
}
</style>
