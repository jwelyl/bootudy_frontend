<template>
  <div class="nav">
    <img
      alt="nav background"
      src="@/assets/icon/nav_background.png"
      id="nav-background"
      @click="backToDday"
    />
    <div class="go-menu">
      <img
        alt="notice board menu"
        src="@/assets/icon/menu_background_hover.png"
        id="notice-background"
        @click="goToNotice"
      />
    </div>
    <img
      src="@/assets/icon/menu_background_hover.png"
      id="notice-background-cover"
      class="background-cover"
      @click="goToNotice"
    />
    <h6 id="notice-text" @click="goToNotice">공지사항</h6>
    <div class="go-menu">
      <img
        alt="free board menu"
        src="@/assets/icon/menu_background_hover.png"
        id="free-background"
        @click="goToFree"
      />
    </div>
    <img
      src="@/assets/icon/menu_background_hover.png"
      id="free-background-cover"
      class="background-cover"
      @click="goToFree"
    />
    <h6 id="free-text" @click="goToFree">자유 게시판</h6>
    <div class="go-menu">
      <img
        alt="schedule menu"
        src="@/assets/icon/menu_background_hover.png"
        id="schedule-background"
        @click="goToSchedule"
      />
    </div>
    <img
      src="@/assets/icon/menu_background_hover.png"
      id="schedule-background-cover"
      class="background-cover"
      @click="goToSchedule"
    />
    <h6 id="schedule-text" @click="goToSchedule">일정</h6>
    <div class="go-menu">
      <img
        alt="news menu"
        src="@/assets/icon/menu_background_hover.png"
        id="news-background"
        @click="goToNews"
      />
    </div>
    <img
      src="@/assets/icon/menu_background_hover.png"
      id="news-background-cover"
      class="background-cover"
      @click="goToNews"
    />
    <h6 id="news-text" @click="goToNews">뉴스</h6>
    <div class="go-menu">
      <img
        alt="house info menu"
        src="@/assets/icon/menu_background_hover.png"
        id="house-background"
        @click="goToHouse"
      />
    </div>
    <img
      src="@/assets/icon/menu_background_hover.png"
      id="house-background-cover"
      class="background-cover"
      @click="goToHouse"
    />
    <h6 id="house-text" @click="goToHouse">부동산 거래 정보</h6>
  </div>
</template>

<script>
export default {
  methods: {
    backToDday() {
      this.$emit("navOff");
    },
    goToNotice() {
      this.$router.push("/menu/notice").catch(() => {});
    },
    goToFree() {
      this.$router.push("/menu/free").catch(() => {});
    },
    goToSchedule() {
      this.$router.push("/menu/schedule").catch(() => {});
    },
    goToNews() {
      this.$router.push("/menu/news").catch(() => {});
    },
    goToHouse() {
      this.$router.push("/menu/house").catch(() => {});
    },
  },
};
</script>

<style scoped>
.nav {
  position: relative;
  vertical-align: middle;
}

#nav-background {
  position: absolute;
  margin-top: 27.5%;
  width: 35%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#notice-background,
#notice-background-cover,
#notice-text {
  position: absolute;
  margin-top: 23%;
  width: 13%;
  top: 39%;
  left: 39%;
  transform: translate(-50%, -50%);
  font-family: "bootudy_font4";
  color: #9dc3e6;
}

#schedule-background,
#schedule-background-cover,
#schedule-text {
  position: absolute;
  margin-top: 27%;
  width: 10%;
  top: 47%;
  left: 47%;
  transform: translate(-50%, -50%);
  font-family: "bootudy_font4";
  color: #5ecfb6;
}

#free-background,
#free-background-cover,
#free-text {
  position: absolute;
  margin-top: 20%;
  width: 15%;
  top: 58%;
  left: 58%;
  transform: translate(-50%, -50%);
  font-family: "bootudy_font4";
  color: #a5a5a5;
}

#news-background,
#news-background-cover,
#news-text {
  position: absolute;
  margin-top: 35%;
  width: 10%;
  top: 57%;
  left: 57%;
  transform: translate(-50%, -50%);
  font-family: "bootudy_font4";
  color: #ffc000;
}

#house-background,
#house-background-cover,
#house-text {
  position: absolute;
  margin-top: 40%;
  width: 13%;
  top: 45%;
  left: 45%;
  transform: translate(-50%, -50%);
  font-family: "bootudy_font4";
  color: #bcbcbc;
}

#nav-background:hover {
  filter: brightness(0.95);
  transition: 0.3s;
}

h6:hover {
  filter: brightness(0.5);
  transition: 0.1s;
}
</style>
