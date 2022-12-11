<template>
  <div class="schedule-wrapper">
    <h2 id="title" @click="goToSchedule()">스터디 일정</h2>
    <b-table
      :items="items"
      :fields="fields"
      :hover="hover"
      :per-page="perPage"
      :current-page="currentPage"
      id="board"
      ><template #cell(상세)="row">
        <b-button pill @click="row.toggleDetails" class="mr-2"
          >{{ row.detailsShowing ? "CANCEL" : "GO" }}
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col>시간 | {{ row.item.startTime }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col>내용 | {{ row.item.content }}</b-col>
          </b-row>
          <div v-show="memberInfo.role == 'administrator'" class="buttons">
            <b-button pill size="sm" @click="removeRow(row.item)" class="inner-button"
              >삭제</b-button
            >
          </div>
        </b-card>
      </template></b-table
    >
    <div v-show="memberInfo.role == 'administrator'">
      <b-button pill class="submit-button" @click="goToWrite()">일정 등록</b-button>
    </div>
    <b-pagination
      pills
      v-model="currentPage"
      :per-page="perPage"
      :total-rows="rows"
      aria-controls="board"
      size="sm"
      align="center"
      id="page"
    ></b-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";
const scheduleStore = "scheduleStore";

export default {
  computed: {
    rows() {
      return this.items.length;
    },
    ...mapState(memberStore, ["memberInfo"]),
    ...mapState(scheduleStore, ["scheduleList"]),
  },
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      fields: [{ key: "title", label: "주제" }, { key: "date", label: "날짜" }, "상세"],
      items: [],
      hover: true,
    };
  },
  methods: {
    ...mapActions(scheduleStore, ["getFromNowScheduleList", "dropSchedule"]),
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.status === "awesome") return "table-success";
    },
    goToSchedule() {
      this.$router.go();
    },
    goToWrite() {
      this.$router.push("/menu/scheduleWrite").catch(() => {});
    },
    async getList() {
      await this.getFromNowScheduleList();
      this.items = this.scheduleList;
    },
    async removeRow(item) {
      if (confirm(`${item.title} 일정을 삭제하시겠습니까?`)) {
        await this.dropSchedule(item.scheduleNo);
        alert("일정이 삭제되었습니다.");
        this.$router.go();
      }
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.schedule-wrapper {
  margin-left: auto;
  margin-right: auto;
  margin-top: 12%;
  width: 70%;
  animation: fadein 1s;
}

#title {
  margin-bottom: 5%;
}

#board {
  accent-color: #6ad9c1;
  margin-bottom: 2%;
}

.submit-button {
  font-size: 12px;
  padding-bottom: 0.5%;
  padding-left: 3%;
  padding-right: 3%;
  margin-left: 85%;
  background-color: #d0cece;
  border: 0;
  outline: 0;
  font-family: "bootudy_font4";
}

#page {
  margin-top: 5%;
}

.mr-2,
.inner-button {
  font-size: 12px;
  background-color: white;
  border: 0;
  outline: 0;
  color: dimgrey;
}
</style>
