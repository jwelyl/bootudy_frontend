<template>
  <div class="loginForm">
    <b-form-input v-model="member.memberId" placeholder="아이디" id="id"></b-form-input>
    <b-form-input
      type="password"
      v-model="member.password"
      placeholder="비밀번호"
      id="pw"
    ></b-form-input>

    <b-button pill class="submit" @click="onConfirm">로그인</b-button>

    <b-button class="regist" @click="goToRegist">회원가입</b-button>
    <b-button class="findId" @click="onFind">아이디 찾기</b-button>
    <b-button class="findPw" @click="onFind">비밀번호 찾기</b-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  data() {
    return {
      member: {
        memberId: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "memberInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["memberConfirm", "getMemberInfo"]),
    async onConfirm() {
      // console.log("Confirm start!!!");
      await this.memberConfirm(this.member);
      let token = sessionStorage.getItem("access-token");
      // console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        await this.getMemberInfo(token);
        // console.log("4. confirm() memberInfo :: ", this.memberInfo);
        alert(this.memberInfo.memberId + "님 환영합니다!");
        this.$router.push({ name: "main" });
      } else {
        alert("아이디나 비밀번호를 다시 확인해주세요.");
        this.member.memberId = "";
        this.member.password = "";
      }
    },
    goToRegist() {
      this.$router.push("/regist").catch(() => {});
    },
    onFind() {
      alert("관리자에게 문의하세요.");
    },
  },
};
</script>

<style scoped>
.loginForm {
  position: absolute;
  width: 30%;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#id,
#pw {
  font-size: 11px;
  border-radius: 50px;
  margin-top: 15px;
  font-family: "bootudy_font4";
}

#id:hover,
#pw:hover {
  box-shadow: 1px 1px 1px 1px rgb(200, 200, 200) inset;
}

.submit {
  width: 100%;
  font-size: 11px;
  margin-top: 30px;
  background-color: #a6ccc4;
  color: white;
  outline: 0;
  border: 0;
  font-family: "bootudy_font4";
}

.regist,
.findId,
.findPw {
  width: 25%;
  font-size: 11px;
  color: dimgray;
  margin-top: 25px;
  background-color: white;
  outline: 0;
  border: 0;
  border-radius: 50px;
}
</style>
