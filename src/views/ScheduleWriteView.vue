<template>
  <div class="schedule-wrapper">
    <h2 id="big-title">스터디 일정 등록</h2>
    <div class="title-wrapper">
      <span id="title-text">제목</span>
      <b-form-input v-model="title" placeholder="제목을 입력하세요." id="title"></b-form-input>
    </div>
    <div class="date-wrapper">
      <span id="date-text">일시</span>
      <div class="date-input-wrapper">
        <b-form-input v-model="year" id="year" class="date-input" placeholder="년"></b-form-input>
        <b-form-input v-model="month" id="month" class="date-input" placeholder="월"></b-form-input>
        <b-form-input v-model="day" id="day" class="date-input" placeholder="일"></b-form-input>
        <b-form-input v-model="time" id="time" class="date-input" placeholder="시"></b-form-input>
        <b-form-input
          v-model="minute"
          id="minute"
          class="date-input"
          placeholder="분"
        ></b-form-input>
      </div>
    </div>
    <div class="context-wrapper">
      <span id="context-text">내용</span>
      <b-container fluid id="context-content">
        <b-form-textarea
          v-model="content"
          id="textarea-auto-height"
          placeholder="내용을 입력하세요."
          rows="5"
          max-rows="10"
        ></b-form-textarea>
      </b-container>
    </div>
    <div class="button-wrapper">
      <b-button pill class="submit" @click="onSubmit()">등록</b-button>
      <b-button pill class="cancel" @click="goToList()">취소</b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const scheduleStore = "scheduleStore";

export default {
  computed: {
    ...mapState(scheduleStore, ["scheduleInfo"]),
  },
  data() {
    return {
      title: "",
      year: "",
      month: "",
      day: "",
      time: "",
      minute: "",
      content: "",
    };
  },
  methods: {
    ...mapActions(scheduleStore, ["submitSchedule"]),
    goToList() {
      this.$router.push("/menu/schedule").catch(() => {});
    },
    async onSubmit() {
      if (confirm("일정을 등록하시겠습니까?")) {
        let scheduleInfo_now = {
          title: this.title,
          content: this.content,
          date: this.year + "-" + this.month + "-" + this.day,
          startTime: this.time + ":" + this.minute,
        };
        // console.log("등록할 scheduleInfo : ", scheduleInfo_now);
        await this.submitSchedule(scheduleInfo_now);
        this.$router.push("/menu/schedule").catch(() => {});
        alert("등록이 완료되었습니다.");
      }
    },
  },
};
</script>

<style scoped>
.schedule-wrapper {
  margin-left: auto;
  margin-right: auto;
  margin-top: 12%;
  width: 50%;
  animation: fadein 1s;
}

#big-title {
  margin-bottom: 5%;
  font-family: "bootudy_font3";
}

#title,
#date {
  margin-bottom: 3%;
}

#title-text,
#context-text,
#date-text {
  font-size: 15px;
  color: dimgray;
  margin-right: 95%;
  margin-bottom: 1%;
}

.write {
  font-size: 12px;
  padding-bottom: 0.5%;
  padding-left: 3%;
  padding-right: 3%;
  margin-left: 85%;
  margin-bottom: 5%;
  background-color: #d0cece;
  border: 0;
  outline: 0;
}

.button-wrapper {
  margin-top: 7%;
}

.date-wrapper,
.title-wrapper {
  margin-bottom: 2%;
}

.submit,
.cancel {
  width: 15%;
  margin-left: 1%;
  margin-right: 1%;
  font-size: 12px;
  border: 0;
  outline: 0;
  font-family: "bootudy_font4";
}

#context-content {
  padding: 0;
}

.submit {
  background-color: #a6ccc4;
}

.cancel {
  background-color: #d0cece;
}

.date-input-wrapper {
  display: flex;
}

.date-input {
  flex: 1;
}

#year,
#month,
#day,
#time {
  margin-right: 3%;
}

#year:hover,
#month:hover,
#day:hover,
#time:hover,
#minute:hover,
#title:hover,
#textarea-auto-height:hover {
  box-shadow: 1px 1px 1px 1px rgb(200, 200, 200) inset;
}
</style>
