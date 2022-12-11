<template>
  <div class="myPage">
    <div id="title">내 정보</div>
    <mypage-comp></mypage-comp>
  </div>
</template>

<script>
import MypageComp from "@/components/mainPage/MypageComp.vue";

export default {
  name: "MypageView",
  components: {
    MypageComp,
  },
};
</script>

<style scoped>
.myPage {
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

#title {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
}
</style>
