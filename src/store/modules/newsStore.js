import { getNewsList } from "@/api/news";

const newsStore = {
  namespaced: true,
  state: {
    lastBuildDate: "",
    newsList: [],
  },
  getters: {},
  mutations: {
    CLEAR_LAST_BUILD_DATE(state) {
      state.lastBuildDate = "";
    },
    CLEAR_NEWS_LIST(state) {
      state.newsList = [];
    },
    SET_LAST_BUILD_DATE(state, lastBuildDate) {
      state.lastBuildDate = lastBuildDate;
    },
    SET_NEWS_LIST(state, newsList) {
      state.newsList = newsList;
    },
  },
  actions: {
    async get10NewsList({ commit }) {
      await getNewsList(
        ({ data }) => {
          console.log(data);
          commit("SET_NEWS_LIST", data.items);
          commit("SET_LAST_BUILD_DATE", data.lastBuildDate);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default newsStore;
