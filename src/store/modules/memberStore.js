import jwtDecode from "jwt-decode";
import router from "@/router";
import {
  login,
  findById,
  tokenRegeneration,
  logout,
  update,
  join,
  allInfo,
  waitInfo,
  deleteMember,
  acceptMember,
  searchMember,
  searchWaiting,
} from "@/api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    memberInfo: null,
    isValidToken: false,
    allMember: null,
    memberId: null,
    waitMember: null,
    searchMember: null,
    searchWaiting: null,
  },
  getters: {
    checkMemberInfo: function (state) {
      return state.memberInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_MEMBER_INFO: (state, memberInfo) => {
      console.log("set_member_info", memberInfo);
      state.isLogin = true;
      state.memberInfo = memberInfo;
    },
    UPDATE_MEMBER_INFO: () => {},
    REGIST_MEMBER: () => {},
    GET_ALL_INFO: (state, allMember) => {
      state.allMember = allMember;
    },
    DELETE_MEMBER: (state, memberId) => {
      state.memberId = memberId;
    },
    GET_WAIT_INFO: (state, waitMember) => {
      state.waitMember = waitMember;
    },
    ACCEPT_MEMBER: (state, memberId) => {
      state.memberId = memberId;
    },
    SEARCH_MEMBER: (state, searchMember) => {
      state.searchMember = searchMember;
    },
    SEARCH_WAITING: (state, searchWaiting) => {
      state.searchWaiting = searchWaiting;
    },
  },
  actions: {
    async memberConfirm({ commit }, member) {
      console.log("memberConfirm start!!!");
      console.log("member = ", member);
      await login(
        member,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            // console.log("login success token created!!!! >> ", accessToken, refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getMemberInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      console.log("2!!!!!!. getMemberInfo() decodeToken :: ", decodeToken);
      await findById(
        decodeToken.memberId,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_MEMBER_INFO", data.memberInfo);
            console.log("3!!!!!!!!!!!!!. getMemberInfo data >> ", data);
            console.log("4!!!!!!!!!!!!!. >> ", data.memberInfo);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "getMemberInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async updateMember({ commit, dispatch }, memberInfo) {
      console.log("updateMemberInfo!!!", memberInfo);
      await update(
        memberInfo,
        ({ data }) => {
          if (data.message === "success") {
            commit("UPDATE_MEMBER_INFO");
            console.log("updateMemberInfo data >> ", data);
            console.log("updateMemberInfo data >> ", data.memberInfo);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "setMemberInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async registMember({ commit, dispatch }, memberInfo) {
      console.log("registMemberInfo!!!", memberInfo);
      await join(
        memberInfo,
        ({ data }) => {
          if (data.message === "success") {
            commit("REGIST_MEMBER");
            console.log("registMemberInfo data >> ", data);
            console.log("registMemberInfo data >> ", data.memberInfo);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "setMemberInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async getAllInfo({ commit }) {
      await allInfo(({ data }) => {
        console.log({ data });
        commit("GET_ALL_INFO", data);
      });
    },
    async getWaitInfo({ commit }) {
      // console.log("getWaitInfo!!!");
      await waitInfo(({ data }) => {
        // console.log({ data });
        commit("GET_WAIT_INFO", data);
      });
    },
    async tokenRegeneration({ commit, state }) {
      console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
      await tokenRegeneration(
        JSON.stringify(state.memberInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.memberInfo.memberId,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_MEMBER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_MEMBER_INFO", null);
              }
            );
          }
        }
      );
    },
    async memberDelete({ commit }, memberId) {
      // console.log("deleteMember@@@@@@@@@");
      await deleteMember(
        memberId,
        ({ data }) => {
          // console.log("ddddddddd");
          commit("DELETE_MEMBER", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async memberAccept({ commit }, memberId) {
      await acceptMember(
        memberId,
        ({ data }) => {
          commit("ACCEPT_MEMBER", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async memberSearch({ commit }, memberId) {
      // console.log("searchMember!!!");
      await searchMember(memberId, ({ data }) => {
        // console.log({ data });
        commit("SEARCH_MEMBER", data);
      });
    },
    async waitingSearch({ commit }, memberId) {
      // console.log("searchWaiting!!!");
      await searchWaiting(memberId, ({ data }) => {
        // console.log({ data });
        commit("SEARCH_WAITING", data);
      });
    },
    async memberLogout({ commit }, memberId) {
      await logout(
        memberId,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_MEMBER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default memberStore;
