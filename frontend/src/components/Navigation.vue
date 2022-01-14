<template>
  <header>
    <div class="nav">
      <div class="nav__menu">
        <img
          class="desktoplogo"
          src="../../images/icon-left-font-monochrome-black.svg"
          alt=""
        />
        <img class="mobilelogo" src="../../images/icon-black.png" alt="" />
        <div class="search">
          <i class="fas fa-search fa-lg"></i
          ><input type="text" placeholder="Rechercher..." />
        </div>
        <div class="nav__menu--buttons">
          <router-link to="/newsfeed"
            ><i class="fas fa-home fa-lg"></i
          ></router-link>
          <i @click="toProfile()" class="fas fa-user fa-lg"></i>
          <i class="fas fa-bell fa-lg"></i>

          <button class="disconnect" @click="disconnect()">
            Déconnexion <i class="fas fa-sign-out-alt fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Navigation",
  methods: {
    disconnect: function () {
      this.$cookies.remove("token");
      this.$router.push("/");
    },
    toProfile: function () {
      this.$router.push("/profile/" + this.userId);
    },
  },
  props: ["userId"],
};
</script>

<style lang="scss" scoped>
@import "../scss/Utils/_mixins.scss";
.nav {
  position: fixed;
  width: 100%;
  box-shadow: 0 4px 3px -3px rgb(202, 202, 202);
  height: 7vh;
  background: #fff;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  @include desktop {
    width: 90%;
  }

  &__menu {
    display: flex;
    height: 7vh;
    width: 100%;
    margin: auto;
    align-items: center;
    justify-content: space-between;
    color: #2c3e50;
    font-size: 1em;
    .desktoplogo {
      display: none;
      @include desktop {
        display: initial;
        width: 15%;
        margin-left: 15px;
      }
    }
    .mobilelogo {
      display: initial;
      width: 12%;
      max-width: 60px;
      @include desktop {
        display: none;
      }
    }
    &--buttons {
      height: 7vh;
      width: 70%;
      justify-content: space-around;
      display: flex;
      align-items: center;
      .fa-user {
        cursor: pointer;
      }
      a {
        color: #2c3e50;

        &.router-link-exact-active {
          color: #2a3d94;
        }
      }
      @include desktop {
        width: 20%;
      }
    }
    button {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 40%;
      height: 25px;
      font-size: 1em;
      border: 0;
      background: #fff;
      color: #2c3e50;
      cursor: pointer;
      &:hover {
        opacity: 0.85;
      }
    }
    .search {
      display: none;
      @include desktop {
        display: flex;
        width: 20%;
        height: 50%;
        align-items: center;
        border-radius: 3px;
        box-shadow: 0 0 1px 1px lightgray;
        i {
          margin-left: 10px;
        }
        input {
          border: 0;
          margin-left: 15px;
          font-size: 1em;
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
      }
    }
  }
}
</style>
