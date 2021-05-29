import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/index",
    component: () => import("@/views/index"),
    children: [
      { path: "", component: () => import("@/views/home") },
      { path: "/myAccount", component: () => import("@/views/myAccount") },
      { path: "/home", component: () => import("@/views/home") },
      { path: "/table", component: () => import("@/views/table") },
      { path: "/info", component: () => import("@/views/info") },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守衛
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.userToken ? true : false;
  if (to.path == "/login") {
    // 除了這個頁面可以無視token直接訪問以外
    next();
  } else {
    // 其他頁面沒token就送往登入頁
    isLogin ? next() : next("/login");
  }
});

export default router;
