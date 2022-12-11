import Vue from "vue";
import VueRouter from "vue-router";
import StartView from "../views/StartView.vue";
import RegistView from "../views/RegistView.vue";
import MainView from "../views/MainView.vue";
import MenuView from "../views/MenuView.vue";
import NoticeView from "../views/NoticeView.vue";
import FreeView from "../views/FreeView.vue";
import ScheduleView from "../views/ScheduleView.vue";
import ScheduleWriteView from "../views/ScheduleWriteView.vue";
import NewsView from "../views/NewsView.vue";
import HouseView from "../views/HouseView.vue";
import ManageView from "../views/ManageView.vue";
import MypageView from "../views/MypageView.vue";
import NoticeWriteView from "../views/NoticeWriteView.vue";
import FreeWriteView from "../views/FreeWriteView.vue";
import NoticeDetailView from "../views/NoticeDetailView.vue";
import FreeDetailView from "../views/FreeDetailView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "start",
    component: StartView,
  },
  {
    path: "/regist",
    name: "regist",
    component: RegistView,
  },
  {
    path: "/main",
    name: "main",
    component: MainView,
  },
  {
    path: "/menu",
    name: "menu",
    component: MenuView,
    children: [
      {
        path: "notice",
        name: "notice",
        component: NoticeView,
      },
      {
        path: "free",
        name: "free",
        component: FreeView,
      },
      {
        path: "schedule",
        name: "schedule",
        component: ScheduleView,
      },
      {
        path: "news",
        name: "news",
        component: NewsView,
      },
      {
        path: "house",
        name: "house",
        component: HouseView,
      },
      {
        path: "manage",
        name: "manage",
        component: ManageView,
      },
      {
        path: "mypage",
        name: "mypage",
        component: MypageView,
      },
      {
        path: "noticeWrite",
        name: "noticeWrite",
        component: NoticeWriteView,
      },
      {
        path: "freeWrite",
        name: "freeWrite",
        component: FreeWriteView,
      },
      {
        path: "noticeDetail",
        name: "noticeDetail",
        component: NoticeDetailView,
      },
      {
        path: "freeDetail",
        name: "freeDetail",
        component: FreeDetailView,
      },
      {
        path: "scheduleWrite",
        name: "scheduleWrite",
        component: ScheduleWriteView,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
