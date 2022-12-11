<template>
  <div class="house-wrapper">
    <h2 id="title-text" @click="goToHouse">부동산 거래 정보</h2>
    <house-search></house-search>
    <div class="info-wrapper">
      <kakao-map class="map-wrapper"></kakao-map>
      <div class="table-wrapper">
        <b-table
          :items="resultsList"
          :fields="fields"
          :hover="hover"
          :per-page="perPage"
          :current-page="currentPage"
          id="table"
        >
          <template #cell(상세)="row">
            <b-button
              pill
              @click="[row.toggleDetails(), showMarker(row.detailsShowing, row.item)]"
              class="mr-2"
              id="detail-button"
              >{{ row.detailsShowing ? "CANCEL" : "GO" }}
            </b-button>
          </template>
          <template #row-details="row">
            <b-card>
              <b-row class="mb-2">
                <b-col
                  >주소 | {{ row.item.sidoName }} {{ row.item.gugunName }}
                  {{ row.item.dongName }}</b-col
                >
              </b-row>
              <b-row class="mb-2">
                <b-col
                  >거래 | {{ row.item.dealYear }}년 {{ row.item.dealMonth }}월
                  {{ row.item.dealDay }}일</b-col
                >
              </b-row>
              <b-row class="mb-2">
                <b-col>건축 | {{ row.item.buildYear }}년</b-col>
              </b-row>
              <b-row class="mb-2">
                <b-col>면적 | {{ row.item.area }}㎡</b-col>
              </b-row>
            </b-card>
          </template></b-table
        >
        <b-pagination
          pills
          v-model="currentPage"
          :per-page="perPage"
          :total-rows="rows"
          aria-controls="table"
          size="sm"
          align="center"
          id="page"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import KakaoMap from "@/components/housePage/KakaoMap.vue";
import HouseSearch from "@/components/housePage/HouseSearch.vue";
import { mapState, mapMutations } from "vuex";

const resultStore = "resultStore";

export default {
  name: "HouseView",
  components: {
    KakaoMap,
    HouseSearch,
  },
  data() {
    return {
      perPage: 7,
      currentPage: 1,
      fields: [
        { key: "dongName", label: "동" },
        { key: "aptName", label: "아파트 명" },
        { key: "dealAmount", label: "거래 금액 (만원)" },
        "상세",
      ],
      hover: true,
    };
  },
  computed: {
    ...mapState(resultStore, ["resultsList"]),
    rows() {
      // console.log("!!!!", this.resultsList);
      if (this.resultsList) {
        return this.resultsList.length;
      }
      return 0;
    },
  },
  methods: {
    ...mapMutations(resultStore, [
      "CLEAR_RESULTS_LIST",
      "CLEAR_SIDONAME",
      "CLEAR_GUGUNNAME",
      "CLEAR_DONGNAME",
      "CLEAR_DEALYEAR",
      "CLEAR_DEALMONTH",
      "SET_LOCATION",
    ]),
    goToHouse() {
      this.$router.go();
    },
    rowClass(item, type) {
      if (!item || type !== "row") return;
      if (item.status === "awesome") return "table-success";
    },
    showMarker(show, item) {
      // 디테일 화면
      // console.log("show : ", show);
      if (!show) {
        // console.log("여기들어와따", item.lat, " ", item.lng);
        this.SET_LOCATION([item.lat, item.lng]);
      }
      // 디테일 화면 종료
      else {
        this.SET_LOCATION([37.5015, 127.0397]);
      }
    },
  },
  created() {
    this.CLEAR_RESULTS_LIST();
    this.CLEAR_SIDONAME();
    this.CLEAR_GUGUNNAME();
    this.CLEAR_DONGNAME();
    this.CLEAR_DEALYEAR();
    this.CLEAR_DEALMONTH();
  },
};
</script>

<style scoped>
.house-wrapper {
  margin-left: auto;
  margin-right: auto;
  margin-top: 12%;
  width: 70%;
  animation: fadein 1s;
}

#title-text {
  margin-bottom: 5%;
}

.info-wrapper {
  display: flex;
}

.map-wrapper {
  flex: 3.5;
}

.table-wrapper {
  flex: 4.5;
}

#table {
  margin-bottom: 5%;
}

#detail-button {
  font-size: 12px;
  background-color: white;
  border: 0;
  outline: 0;
  color: dimgrey;
}
</style>
