<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@font-face {
  font-family: "Roboto-regular";
  src: url("./assets/fonts/Roboto-Regular.ttf");
}
@font-face {
  font-family: "Roboto-bold";
  src: url("./assets/fonts/Roboto-Bold.ttf");
}

.fade-in {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.4s;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

body {
  background: linear-gradient(
      180deg,
      rgba(235, 235, 235, 1) 22%,
      rgba(213, 227, 255, 1) 100%
    )
    fixed;
}

#app {
  font-family: "Roboto-regular", Avenir, Helvetica, Arial, sans-serif;
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //height: 100%;
}
</style>
