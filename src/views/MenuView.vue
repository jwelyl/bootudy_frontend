<template>
  <div class="menu">
    <div class="menu-wrapper">
      <header-comp></header-comp>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderComp from "@/components/include/HeaderComp.vue";
export default {
  name: "StartView",
  components: {
    HeaderComp,
  },
};
</script>

<style scoped>
.menu {
  width: 100%;
  animation: fadein 1s;
}

.menu-wrapper {
  display: flex;
  height: auto;
  min-height: 100%;
  padding-bottom: 100px;
  flex-direction: column;
  height: 100vh;
}
</style>
