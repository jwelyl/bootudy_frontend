<template>
  <div class="d-day">
    <img
      alt="d-day background"
      src="@/assets/icon/dDay_background.png"
      id="d-day-background"
      @click="goToMenu()"
    />
    <div class="day">
      <div id="big-day">
        D-<span v-show="dDay != 0">{{ dDay }}</span
        ><span v-show="dDay == 0">day</span>
      </div>
      <div>
        <div id="title">{{ topSchedule.title }}</div>
        <p class="arrow-box">{{ topSchedule.content }}</p>
      </div>
      <div id="small-day">{{ topSchedule.date }} {{ topSchedule.startTime }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const scheduleStore = "scheduleStore";

export default {
  data() {
    return {
      isStatusOn: true,
    };
  },
  computed: {
    ...mapState(scheduleStore, ["topSchedule", "dDay"]),
  },
  methods: {
    ...mapActions(scheduleStore, ["selectTopSchedule", "selectDday"]),
    goToMenu() {
      this.isStatusOn = false;
      this.$emit("dDayOff");
    },
  },
  created() {
    this.selectTopSchedule();
    this.selectDday();
  },
};
</script>

<style scoped>
.d-day {
  margin-top: 10%;
  position: relative;
}

#d-day-background {
  width: 35%;
  vertical-align: middle;
}

#d-day-background:hover {
  filter: brightness(0.95);
  transition: 0.3s;
}

.day {
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  padding: 5px 10px;
  transform: translate(-50%, -50%);
  color: white;
}

#big-day {
  margin-top: -30px;
  font-size: 90px;
}

#small-day {
  margin-top: -40px;
  font-size: 15px;
}

#title {
  font-family: "bootudy_font4";
}

#id {
  margin-top: -30px;
  font-size: 10px;
}

.arrow-box {
  visibility: hidden;
  position: absolute;
  text-align: center;
  margin-top: 10%;
  left: 50%;
  padding: 5px 10px;
  transform: translate(-50%, -50%);
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  background: #333;
  color: #fff;
  font-size: 14px;
  width: 100%;
}

#title:hover ~ .arrow-box {
  visibility: visible;
}

#title:hover {
  color: #333;
}
</style>
