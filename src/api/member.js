import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  console.log("로그인!!!!!");
  await api.post(`/api/member/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/api/member/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/api/member/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/api/member/logout/${userid}`).then(success).catch(fail);
}

async function update(user, success, fail) {
  await api.put(`/api/member/update`, JSON.stringify(user)).then(success).catch(fail);
}

async function join(user, success, fail) {
  await api.post(`/api/member/join`, JSON.stringify(user)).then(success).catch(fail);
}

async function deleteMember(memberId, success, fail) {
  await api.delete(`/api/member/delete/${memberId}`).then(success).catch(fail);
}

async function allInfo(success, fail) {
  await api.get(`/api/member/allinfo`).then(success).catch(fail);
}

async function waitInfo(success, fail) {
  await api.get(`/api/member/waitinginfo`).then(success).catch(fail);
}

async function acceptMember(memberId, success, fail) {
  console.log(memberId + "를 회원으로 승인");
  await api.put(`/api/member/approve/${memberId}`).then(success).catch(fail);
}

async function searchMember(memberId, success, fail) {
  console.log(memberId + "를 포함한 회원 정보 가져오기");
  await api.get(`/api/member/memberWithId/${memberId}`).then(success).catch(fail);
}

async function searchWaiting(memberId, success, fail) {
  console.log(memberId + "를 포함한 승인 대기 회원 정보 가져오기");
  await api.get(`/api/member/waitingMemberWithId/${memberId}`).then(success).catch(fail);
}

export { login, findById, tokenRegeneration, logout, update, join, allInfo, waitInfo, deleteMember, acceptMember, searchMember, searchWaiting };

