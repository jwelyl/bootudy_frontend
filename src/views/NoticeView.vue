<template>
  <div class="notice-wrapper">
    <h2 id="title" @click="goToRegist()">공지사항</h2>
    <b-table
      :items="items"
      :fields="fields"
      :hover="hover"
      :per-page="perPage"
      :current-page="currentPage"
      id="board"
      ><template #cell(title)="data">
        <router-link :to="{ name: 'noticeDetail', params: { articleNo: data.item.articleNo } }">
          {{ data.item.title }}
        </router-link>
      </template></b-table
    >
    <div v-show="memberInfo.role == 'administrator'">
      <b-button pill class="write" @click="goToWrite()">글 작성</b-button>
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
import { listNotice } from "@/api/board.js";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      perPage: 5,
      currentPage: 1,
      // fields: ["번호", "제목", "조회수"],
      fields: [
        { key: "articleNo", label: "글번호", tdClass: "tdClass" },
        { key: "title", label: "제목", tdClass: "tdSubject" },
        { key: "memberId", label: "작성자", tdClass: "tdClass" },
        { key: "regtime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      items: [],
      hover: true,
    };
  },
  created() {
    let param = {
      key: null,
      word: null,
    };
    listNotice(
      param,
      ({ data }) => {
        this.items = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  computed: {
    rows() {
      return this.items.length;
    },
    ...mapState(memberStore, ["memberInfo"]),
  },
  methods: {
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.status === "awesome") return "table-success";
    },
    goToWrite() {
      this.$router.push("/menu/noticeWrite").catch(() => {});
    },
    goToRegist() {
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.notice-wrapper {
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

.write {
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
</style>
