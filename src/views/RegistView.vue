<template>
  <div class="registPage">
    <div>
      <img
        alt="bootudy regist logo"
        src="../assets/logo/logo_startPage.png"
        id="logo"
        @click="goToStart"
      />
    </div>
    <regist-comp></regist-comp>
  </div>
</template>

<script>
import RegistComp from "@/components/mainPage/RegistComp.vue";
export default {
  name: "RegistView",
  components: {
    RegistComp,
  },
  methods: {
    goToStart() {
      this.$router.push("/").catch(() => {});
    },
  },
};
</script>

<style scoped>
.registPage {
  display: flex;
  flex-direction: column;
  height: 100vh;
  animation: fadein 1s;
}

#logo {
  width: 20%;
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#logo:hover {
  filter: brightness(0.5);
  transition: 0.3s;
}
</style>
