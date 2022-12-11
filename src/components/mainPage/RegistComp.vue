<template>
  <div class="registForm">
    <div class="id_wrapper">
      <span id="id_text">아이디</span
      ><b-form-input v-model="id" placeholder="id" id="id"></b-form-input>
    </div>
    <div class="pw_wrapper">
      <span id="pw_text">비밀번호</span>
      <b-form-input type="password" v-model="pw" placeholder="pw" id="pw"></b-form-input>
    </div>
    <div class="email_wrapper">
      <span id="email_text">이메일</span>
      <b-form-input v-model="email" placeholder="email" id="email"></b-form-input>
    </div>
    <div class="ph_wrapper">
      <span id="ph_text">전화번호</span>
      <b-form-input v-model="ph" placeholder="phone number" id="ph"></b-form-input>
    </div>

    <div class="button_wrapper">
      <b-button pill class="submit" @click="regist">가입 신청</b-button>
      <b-button pill class="cancel" @click="goToStart">취소</b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  computed: {
    ...mapState(memberStore, ["memberInfo"]),
  },
  data() {
    return {
      id: "",
      pw: "",
      email: "",
      ph: "",
    };
  },
  methods: {
    ...mapActions(memberStore, ["registMember"]),
    async regist() {
      if (confirm("가입 신청하시겠습니까?")) {
        let memberInfo_now = {
          memberId: this.id,
          password: this.pw,
          email: this.email,
          phoneNumber: this.ph,
        };
        // console.log("memberInfo_now : ", memberInfo_now);
        await this.registMember(memberInfo_now);
        this.$router.push("/").catch(() => {});
        alert("가입 신청이 완료되었습니다.");
      }
    },
    goToStart() {
      this.$router.push("/").catch(() => {});
    },
  },
};
</script>

<style scoped>
.registForm {
  position: absolute;
  width: 30%;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.id_wrapper,
.pw_wrapper,
.email_wrapper,
.ph_wrapper {
  margin-top: 7%;
  display: flex;
}

#id_text,
#pw_text,
#email_text,
#ph_text {
  flex: 1;
  font-size: 12px;
  margin-top: 2%;
}

#id,
#pw,
#email,
#ph {
  flex: 7;
  font-size: 11px;
  border-radius: 50px;
}

#id:hover,
#pw:hover,
#email:hover,
#ph:hover {
  box-shadow: 1px 1px 1px 1px rgb(200, 200, 200) inset;
}

.button_wrapper {
  display: flex;
  margin-top: 7%;
}

.submit,
.cancel {
  width: 100%;
  font-size: 11px;
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
  color: white;
  outline: 0;
  border: 0;
  font-family: "bootudy_font4";
}

.submit {
  background-color: #a6ccc4;
}

.cancel {
  background-color: #d0cece;
}
</style>
