<template>
  <div class="newsfeed">
    <div class="content">
      <div class="nav"><Navigation /></div>
      <button class="profile" @click="toProfile()">
        <img v-if="!userPic" src="../../images/defaultprofilepic.jpg" />
        <img v-else :src="userPic" />
        <p>{{ firstname }} {{ lastname }}</p>
      </button>

      <div class="posts">
        <div class="test"></div>
        <div class="test"></div>
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
  },
  methods: {
    toProfile: function () {
      this.$router.push("/profile/" + this.userId);
    },
    requireImg: function (picPath) {
      return require("../../images/" + picPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.newsfeed {
  //height: 100vh;
  //margin: auto;
  width: 80%;
  background: #f4f5fc;
  margin: auto;
  box-shadow: 0px 0px 5px 1px rgb(202, 202, 202);
  .content {
    //border: 1px solid red;
    // background: #f4f5fc;
    display: flex;
    flex-direction: column;
    .posts {
      .test {
        box-shadow: 0px 0px 3px 3px rgb(219, 219, 219);
        background: white;
        height: 500px;
        width: 50%;
        margin: auto;
        margin-top: 10vh;
        margin-bottom: 10vh;
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
  width: 15%;
  top: 10vh;
  right: 25vh;
  height: 100px;
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
    width: 20%;
    height: 60%;

    object-fit: cover;
  }
  hr {
    width: 50%;
  }
}
</style>
