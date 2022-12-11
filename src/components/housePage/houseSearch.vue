<template>
  <div class="search-wrapper">
    <div class="location-wrapper">
      <span id="location-text">지역</span>
      <b-form-input
        v-model="info.sidoName"
        placeholder="시/도"
        id="sido"
        class="input-box1"
      ></b-form-input>
      <b-form-input
        v-model="info.gugunName"
        placeholder="구/군"
        id="gugun"
        class="input-box2"
      ></b-form-input>
      <b-form-input
        v-model="info.dongName"
        placeholder="동"
        id="dong"
        class="input-box3"
      ></b-form-input>
    </div>

    <div class="date-wrapper">
      <span id="date-text">날짜</span>
      <b-form-input
        v-model="info.dealYear"
        placeholder="년"
        id="year"
        class="input-box4"
      ></b-form-input>
      <b-form-input
        v-model="info.dealMonth"
        placeholder="월"
        id="month"
        class="input-box5"
      ></b-form-input>
      <b-button pill class="search-button" @click="onSearch">검색</b-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const resultStore = "resultStore";

export default {
  name: "HouseSearch",
  data() {
    return {
      info: {
        sidoName: "",
        gugunName: "",
        dongName: "",
        dealYear: "",
        dealMonth: "",
      },
    };
  },
  computed: {
    ...mapState(resultStore, [
      "sidoName",
      "gugunName",
      "dongName",
      "dealYear",
      "dealMonth",
      "resultsList",
      "result",
    ]),
  },
  methods: {
    ...mapActions(resultStore, ["getResultsList", "selectByAYM", "getResult"]),
    onSearch(event) {
      this.getResultsList(this.info);
      alert("검색이 완료되었습니다.");
      event.preventDefault();
    },
  },
};
</script>

<style scoped>
.search-wrapper {
  margin-bottom: 5%;
}

.location-wrapper,
.date-wrapper,
.button-wrapper {
  display: flex;
}

#sido,
#gugun,
#dong,
#year,
#month,
.search-button {
  flex: 1;
}

.location-wrapper {
  margin-bottom: 1%;
}

.search {
  margin-right: 2%;
}

.input-box1,
.input-box2,
.input-box4,
.input-box5 {
  margin-right: 2%;
}

.input-box1,
.input-box2,
.input-box3,
.input-box4,
.input-box5 {
  border-radius: 50px;
  height: 30px;
  font-size: 15px;
}

.input-box1:hover,
.input-box2:hover,
.input-box3:hover,
.input-box4:hover,
.input-box5:hover {
  box-shadow: 1px 1px 1px 1px rgb(200, 200, 200) inset;
}

#location-text,
#date-text {
  margin-right: 3%;
  margin-top: 0.5%;
  font-size: 15px;
  color: dimgray;
}

.search-button {
  font-size: 12px;
  outline: 0;
  border: 0;
  background-color: #fff3c4;
  color: rgb(105, 105, 105);
}
</style>
