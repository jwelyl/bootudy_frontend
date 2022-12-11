import {
  allScheduleList,
  fromNowScheduleList,
  getTopSchedule,
  createSchedule,
  deleteSchedule,
  calcDateDiff,
} from "@/api/schedule";

const scheduleStore = {
  namespaced: true,
  state: {
    scheduleNo: 0,
    date: "",
    startTime: "",
    title: "",
    content: "",
    scheduleList: [],
    topSchedule: null,
    dDay: 0,
    scheduleInfo: null,
  },
  getters: {},
  mutations: {
    CLEAR_SCHEDULENO(state) {
      state.scheduleNo = 0;
    },
    CLEAR_DATE(state) {
      state.date = "";
    },
    CLEAR_STARTTIME(state) {
      state.startTime = "";
    },
    CLEAR_TITLE(state) {
      state.title = "";
    },
    CLEAR_CONTENT(state) {
      state.content = "";
    },
    CLEAR_SCHEDULE_LIST(state) {
      state.scheduleList = [];
    },
    CLEAR_TOP_SCHEDULE(state) {
      state.topSchedule = null;
    },
    CLEAR_DDAY(state) {
      state.dDay = 0;
    },
    SET_SCHEDULENO(state, scheduleNo) {
      state.scheduleNo = scheduleNo;
    },
    SET_DATE(state, date) {
      state.date = date;
    },
    SET_STARTTIME(state, startTime) {
      state.startTime = startTime;
    },
    SET_TITLE(state, title) {
      state.title = title;
    },
    SET_CONTENT(state, content) {
      state.content = content;
    },
    SET_SCHEDULE_LIST(state, scheduleList) {
      state.scheduleList = scheduleList;
    },
    SET_TOP_SCHEDULE(state, topSchedule) {
      state.topSchedule = topSchedule;
    },
    SET_DDAY(state, dDay) {
      state.dDay = dDay;
    },
    SET_SCHEDULEINFO(state, scheduleInfo) {
      state.scheduleInfo = scheduleInfo;
    },
  },
  actions: {
    //  모든 스케쥴 리스트 가져오기
    async getAllSchedulesList({ commit }) {
      await allScheduleList(
        ({ data }) => {
          // console.log(data);
          commit("SET_SCHEDULE_LIST", data);
        },
        async (error) => {
          console.log(error);
        }
      );
    },
    //  현재 시각 이후 스케쥴 리스트 가져오기
    async getFromNowScheduleList({ commit }) {
      await fromNowScheduleList(
        ({ data }) => {
          // console.log(data);
          commit("SET_SCHEDULE_LIST", data);
        },
        async (error) => {
          console.log(error);
        }
      );
    },
    // 새로운 스케줄 등록하기
    async submitSchedule({ commit }, scheduleInfo) {
      console.log("submitScheduleInfo!!!", scheduleInfo);
      await createSchedule(
        scheduleInfo,
        ({ data }) => {
          // console.log("data : ", { data });
          if (data.length > 0) {
            commit("SET_SCHEDULEINFO");
          } else {
            // console.log("스케줄 정보 없음!!!");
          }
        },
        async (error) => {
          console.log(error);
        }
      );
    },
    // 디데이 가져오기
    selectDday: ({ commit }) => {
      // console.log("selectDday");
      calcDateDiff(
        ({ data }) => {
          // console.log("000000000000", data);
          commit("SET_DDAY", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // 가장 가까운 한 개의 스케쥴 가져오기
    selectTopSchedule: ({ commit }) => {
      // console.log("selectTopSchedule");
      getTopSchedule(
        ({ data }) => {
          // console.log(data);
          commit("SET_TOP_SCHEDULE", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async dropSchedule({ commit }, scheduleNo) {
      await deleteSchedule(
        scheduleNo,
        ({ data }) => {
          commit("SET_SCHEDULE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default scheduleStore;
