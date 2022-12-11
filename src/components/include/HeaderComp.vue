<template>
  <div class="header">
    <img
      alt="bootudy header logo"
      src="@/assets/logo/logo_header.png"
      id="logo"
      @click="goToMain"
    />
    <!-- <img alt="bootudy header logo" src="@/assets/icon/message_button.png" id="message" /> -->
    <div class="my-zone">
      <div v-show="memberInfo.role == 'administrator'" class="buttons">
        <div>
          <b-button pill class="manage" @click="goToManage">회원관리</b-button>
        </div>
        <div><b-button pill class="logout" @click="onLogout">로그아웃</b-button></div>
      </div>
      <div v-show="memberInfo.role != 'administrator'" class="logout-for-member">
        <b-button pill class="logout" @click="onLogout">로그아웃</b-button>
      </div>
      <span id="login-info"
        ><a @click="goToMyPage" id="my-page">{{ memberInfo.memberId }}</a
        >님 안녕하세요.</span
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  computed: {
    ...mapState(memberStore, ["isLogin", "memberInfo"]),
    ...mapGetters(["checkMemberInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["memberLogout"]),
    goToMain() {
      this.$router.push("/main").catch(() => {});
    },
    onLogout() {
      // console.log(this.memberInfo.memberId);
      if (confirm("정말 로그아웃하시겠습니까?")) {
        this.memberLogout(this.memberInfo.memberId);
        // 저장된 토큰 없애기
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("refresh-token");
        if (this.$route.path != "/") {
          this.$router.push("/").catch(() => {});
        }
        alert("로그아웃되었습니다.");
      }
    },
    goToManage() {
      this.$router.push("/menu/manage").catch(() => {});
    },
    goToMyPage() {
      this.$router.push("/menu/myPage").catch(() => {});
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
}

#logo {
  width: 10%;
  position: absolute;
  top: 12%;
  left: 12%;
  transform: translate(-50%, -50%);
}

#logo:hover {
  filter: brightness(0.5);
  transition: 0.3s;
}

.my-zone {
  position: absolute;
  right: 4%;
  top: 13%;
  transform: translate(-50%, -50%);
}

#login-info {
  font-size: 13px;
  color: dimgrey;
  font-family: "bootudy_font2";
}

.buttons {
  display: flex;
}

.logout,
.manage {
  flex: 1;
  font-size: 11px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 5px;
  outline: 0;
  border: 0;
  font-family: "bootudy_font4";
}

.logout-for-member {
  float: right;
}

.logout {
  background-color: #e2f7f3;
  color: rgb(114, 114, 114);
  margin-left: 10px;
}

.manage {
  background-color: #b9b9b9;
  color: white;
}

#message {
  width: 2%;
  position: absolute;
  right: 18%;
  top: 15%;
  transform: translate(-50%, -50%);
}

#my-page {
  font-weight: bold;
}

#my-page:hover {
  color: #00bda4;
}
</style>
