<template>
  <div class="main">
    <div>
      <div class="main-wrapper">
        <header-comp></header-comp>
        <dday-comp v-show="dDayOn" @dDayOff="toggle"></dday-comp>
        <nav-comp v-show="!dDayOn" @navOff="toggle"></nav-comp>
      </div>
      <footer-comp></footer-comp>
    </div>
  </div>
</template>

<script>
import FooterComp from "@/components/include/FooterComp.vue";
import HeaderComp from "@/components/include/HeaderComp.vue";
import DdayComp from "@/components/mainPage/DdayComp.vue";
import NavComp from "@/components/mainPage/NavComp.vue";
export default {
  name: "StartView",
  components: {
    HeaderComp,
    FooterComp,
    DdayComp,
    NavComp,
  },
  data() {
    return {
      dDayOn: true,
    };
  },
  methods: {
    toggle() {
      this.dDayOn = !this.dDayOn;
    },
  },
};
</script>

<style scoped>
.main {
  width: 100%;
  animation: fadein 1s;
}

.main-wrapper {
  display: flex;
  height: auto;
  min-height: 100%;
  padding-bottom: 100px;
  flex-direction: column;
  height: 100vh;
}
</style>
