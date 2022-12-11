<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  display: flex;
  font-family: "bootudy_font3";
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

@font-face {
  font-family: "bootudy_font";
  src: url("@/assets/font/bootudy_font.otf") format("opentype");
}

@font-face {
  font-family: "bootudy_font2";
  src: url("@/assets/font/bootudy_font2.ttf") format("truetype");
}

@font-face {
  font-family: "bootudy_font3";
  src: url("@/assets/font/bootudy_font3.otf") format("opentype");
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
