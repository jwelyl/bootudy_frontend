import { apiInstance } from "./index.js";

const api = apiInstance();

//  get all schedules
async function allScheduleList(success, fail) {
  console.log("모든 schedule 가져오기 axios");
  await api.get(`/api/schedule/schedule`).then(success).catch(fail);
}

//  get schedules from now
async function fromNowScheduleList(success, fail) {
  console.log("현재 시각 이후 schedule 가져오기 axios");
  await api.get(`/api/schedule/schedule/fromnowschedulelist`).then(success).catch(fail);
}

//  get schedules by title
async function searchSchedulesByTitle(title, success, fail) {
  console.log("제목 포함된 schedule 가져오기 axios");
  await api.get(`/api/schedule/schedule/title/${title}`).then(success).catch(fail);
}

//  get schedules by content
async function searchSchedulesByContent(content, success, fail) {
  console.log("내용 포함된 schedule 가져오기 axios");
  await api.get(`/api/schedule/schedule/content/${content}`).then(success).catch(fail);
}

//  get schedule by scheduleNo
async function getSchedule(scheduleNo, success, fail) {
  console.log("scheduleNo로 해당 schedule 가져오기 axios");
  await api.get(`/api/schedule/schedule/${scheduleNo}`).then(success).catch(fail);
}

//  get top schedule
async function getTopSchedule(success, fail) {
  console.log("추후 schedule 중 가장 가까운 schedule 가져오기");
  await api.get(`/api/schedule/schedule/top`).then(success).catch(fail);
}

//  get d-day from now
async function calcDateDiff(success, fail) {
  console.log("현재 날짜로부터 D-Day 계산 axios");
  await api.get(`/api/schedule/schedule/dday`).then(success).catch(fail);
}

//  post(create) schedule
async function createSchedule(schedule, success, fail) {
  console.log("새로운 schedule 등록 axios");
  console.log(schedule);
  await api.post(`/api/schedule/schedule`, JSON.stringify(schedule)).then(success).catch(fail);
}

//  put(update) schedule
async function updateSchedule(schedule, success, fail) {
  console.log("schedule 갱신 axios");
  console.log(schedule);
  await api.put(`/api/schedule/schedule`, JSON.stringify(schedule)).then(success).catch(fail);
}

//  delete schedule
async function deleteSchedule(scheduleNo, success, fail) {
  console.log("schedule 삭제 axios");
  console.log("삭제할 schedule 번호 = ", scheduleNo);
  await api.delete(`/api/schedule/schedule/${scheduleNo}`).then(success).catch(fail);
}

export {
  allScheduleList,
  fromNowScheduleList,
  calcDateDiff,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  searchSchedulesByTitle,
  searchSchedulesByContent,
  getSchedule,
  getTopSchedule,
};
