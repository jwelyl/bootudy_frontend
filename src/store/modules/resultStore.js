import { selectByAYM } from "@/api/result";

const resultStore = {
  namespaced: true,
  state: {
    sidoName: "none",
    gugunName: "none",
    dongName: "none",
    dealYear: 0,
    dealMonth: 0,
    resultsList: [],
    result: null,
    location: [37.5015, 127.0397],
  },
  getters: {},
  mutations: {
    CLEAR_SIDONAME(state) {
      state.sidoName = "none";
    },
    CLEAR_GUGUNNAME(state) {
      state.gugunName = "none";
    },
    CLEAR_DONGNAME(state) {
      state.dongName = "none";
    },
    CLEAR_DEALYEAR(state) {
      state.dealYear = 0;
    },
    CLEAR_DEALMONTH(state) {
      state.dealMonth = 0;
    },
    CLEAR_RESULTS_LIST(state) {
      state.resultsList = [];
    },
    SET_SIDONAME(state, sidoName) {
      state.sidoName = sidoName;
    },
    SET_GUGUNNAME(state, gugunName) {
      state.gugunName = gugunName;
    },
    SET_DONGNAME(state, dongName) {
      state.dongName = dongName;
    },
    SET_DEALYEAR(state, dealYear) {
      state.dealYear = dealYear;
    },
    SET_DEALMONTH(state, dealMonth) {
      state.dealMonth = dealMonth;
    },
    SET_RESULTS_LIST(state, resultsList) {
      state.resultsList = resultsList;
    },
    SET_RESULT(state, result) {
      state.result = result;
    },
    SET_LOCATION(state, location) {
      state.location = location;
    },
  },
  actions: {
    getResultsList: ({ commit }, params) => {
      selectByAYM(
        params,
        ({ data }) => {
          console.log(data);
          commit("SET_RESULTS_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getResult: ({ commit }, result) => {
      commit("SET_RESULT", result);
    },
  },
};

export default resultStore;
