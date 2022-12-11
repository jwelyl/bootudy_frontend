<template>
  <div class="manage-wrapper">
    <h2 id="title" @click="goToManage">회원 관리</h2>

    <b-button pill v-b-toggle.waiting-list class="waiting-list-button">승인 대기</b-button>
    <b-collapse id="waiting-list">
      <b-card>
        <div id="child-title">대기 리스트</div>

        <b-form-input
          v-model="id_waiting"
          placeholder="아이디로 검색"
          id="search-waiting"
          @keyup.enter="searchById_waiting()"
        ></b-form-input>

        <b-table
          :items="items_waiting"
          :fields="fields_waiting"
          :hover="hover"
          :per-page="perPage_waiting"
          :current-page="currentPage_waiting"
          id="board-waiting"
        >
          <template #cell(승인)="row">
            <b-button pill @click="row.toggleDetails" class="mr-2" id="detail-button1"
              >{{ row.detailsShowing ? "CANCEL" : "GO" }}
            </b-button>
          </template>

          <template #row-details="row">
            <b-card>
              <b-row class="mb-2">
                <b-col>{{ row.item.memberId }}님의 가입을 승인하시겠습니까?</b-col>
              </b-row>
              <div class="buttons">
                <b-button pill size="sm" @click="accept(row.item)" id="accept" class="inner-button"
                  >승인</b-button
                >
                <b-button
                  pill
                  size="sm"
                  @click="removeRow_waiting(row.item)"
                  id="delete"
                  class="inner-button"
                  >거절</b-button
                >
              </div>
            </b-card>
          </template>
        </b-table>

        <b-pagination
          pills
          v-model="currentPage_waiting"
          :per-page="perPage_waiting"
          :total-rows="rows_waiting"
          aria-controls="board-waiting"
          size="sm"
          align="center"
          id="page-waiting"
        ></b-pagination>
      </b-card>
    </b-collapse>

    <b-card class="member-list-card">
      <div id="child-title">회원 리스트</div>

      <b-form-input
        v-model="id_member"
        placeholder="아이디로 검색"
        id="search-member"
        @keyup.enter="searchById_member()"
      ></b-form-input>

      <b-table
        :items="items"
        :fields="fields"
        :hover="hover"
        :per-page="perPage"
        :current-page="currentPage"
        id="board"
      >
        <template #cell(내보내기)="row">
          <b-button pill @click="row.toggleDetails" class="mr-2"
            >{{ row.detailsShowing ? "CANCEL" : "GO" }}
          </b-button>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col>{{ row.item.memberId }}님을 내보내시겠습니까?</b-col>
            </b-row>
            <b-button pill size="sm" @click="removeRow_member(row.item)" class="inner-button"
              >내보내기</b-button
            >
          </b-card>
        </template>
      </b-table>

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
    </b-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const memberStore = "memberStore";

export default {
  data() {
    return {
      // 검색
      id_waiting: "",
      id_member: "",

      // 회원 리스트
      perPage: 5,
      currentPage: 1,
      fields: [
        { key: "memberId", label: "아이디" },
        { key: "email", label: "이메일" },
        { key: "phoneNumber", label: "전화번호" },
        { key: "role", label: "권한" },
        "내보내기",
      ],
      items: [],
      hover: true,

      // 대기 리스트
      perPage_waiting: 5,
      currentPage_waiting: 1,
      fields_waiting: [
        { key: "memberId", label: "아이디" },
        { key: "email", label: "이메일" },
        { key: "phoneNumber", label: "전화번호" },
        "승인",
      ],
      items_waiting: [],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
    rows_waiting() {
      return this.items_waiting.length;
    },
    ...mapState(memberStore, [
      "memberInfo",
      "allMember",
      "memberId",
      "waitMember",
      "searchMember",
      "searchWaiting",
    ]),
  },
  methods: {
    ...mapActions(memberStore, [
      "getAllInfo",
      "memberDelete",
      "getWaitInfo",
      "memberAccept",
      "memberSearch",
      "waitingSearch",
    ]),
    goToManage() {
      this.$router.go();
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.status === "awesome") return "table-success";
    },
    async accept(item) {
      alert(`${item.memberId}님의 가입이 승인되었습니다.`);
      await this.memberAccept(item.memberId);
      this.$router.go();
    },
    async removeRow_waiting(item) {
      alert(`${item.memberId}님이 거절되었습니다.`);
      // console.log("item.memberId : ", item.memberId);
      await this.memberDelete(item.memberId);
      this.$router.go();
    },
    async removeRow_member(item) {
      alert(`${item.memberId}님이 내보내기되었습니다.`);
      // console.log("item.memberId : ", item.memberId);
      await this.memberDelete(item.memberId);
      this.$router.go();
    },
    async getMembers() {
      await this.getAllInfo();
      this.items = this.allMember;
      // console.log("check", this.items);
      await this.getWaitInfo();
      this.items_waiting = this.waitMember;
      // console.log("items : ", this.items);
    },
    async searchById_member() {
      await this.memberSearch(this.id_member);
      this.items = this.searchMember;
    },
    async searchById_waiting() {
      await this.waitingSearch(this.id_waiting);
      this.items_waiting = this.searchWaiting;
    },
  },
  created() {
    this.getMembers();
  },
};
</script>

<style scoped>
.manage-wrapper {
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

#board_waiting {
  accent-color: #6ad9c1;
  margin-bottom: 2%;
}

.waiting-list-button {
  font-size: 12px;
  padding-bottom: 0.5%;
  padding-left: 3%;
  padding-right: 3%;
  margin-left: 85%;
  margin-bottom: 2%;
  background-color: #d0cece;
  border: 0;
  outline: 0;
  font-family: "bootudy_font4";
}

#child-title {
  font-size: 20px;
  color: darkgray;
  margin-bottom: 2%;
}

#waiting-list {
  margin-bottom: 5%;
}

#search-waiting,
#search-member {
  width: 30%;
  font-size: 11px;
  border-radius: 50px;
  margin-top: 10px;
  margin-bottom: 2%;
  margin-left: 70%;
}

.remove-wrapper > b-button {
  height: 5%;
}

.buttons {
  display: flex;
  width: 15%;
  margin-left: 42%;
}

#accept,
#delete {
  flex: 1;
}

#accept {
  margin-right: 2%;
}

.member-list-card {
  margin-bottom: 10%;
}

.mr-2 {
  font-size: 12px;
  background-color: white;
  border: 0;
  outline: 0;
  color: dimgrey;
}

.inner-button {
  font-size: 12px;
  background-color: white;
  border: 0;
  outline: 0;
  color: dimgrey;
}
</style>
