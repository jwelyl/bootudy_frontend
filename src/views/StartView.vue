<template>
  <div class="startPage">
    <img
      alt="bootudy logo"
      src="../assets/logo/logo_startPage.png"
      id="logo"
      @click="goToStart()"
    />
    <login-comp></login-comp>
  </div>
</template>

<script>
import LoginComp from "@/components/startPage/LoginComp.vue";
export default {
  name: "StartView",
  components: {
    LoginComp,
  },
  methods: {
    goToStart() {
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.startPage {
  display: flex;
  flex-direction: column;
  height: 100vh;
  animation: fadein 1s;
}

#logo {
  width: 20%;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#logo:hover {
  filter: brightness(0.5);
  transition: 0.3s;
}
</style>
