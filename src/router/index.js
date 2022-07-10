import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  { // 注册
    path: "/enroll",
    name: "enroll",
    component: () => import("@/views/enroll"),
  },
  { //登录
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
  {
    path: "/",
    // name:'layout',
    component: () => import("@/views/layout"),
    children: [
      {
        path: '', // 默认子路由，只能有1个
        redirect: 'home'
      },
      {

        path: "/home",
        name: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "/find",
        name: "find",
        component: () => import("@/views/find"),
      },
      {
        path: "/information",
        name: "information",
        component: () => import("@/views/information"),
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my"),
      },
    ],
  },
  { //收藏
    path: "/collection",
    name: "collection",
    component:() => import("@/views/my/components/Collection.vue")
  },
  {
    path: "/lease",
    name: "lease", component: () => import("@/views/my/components/Lease.vue")
  },
  {  // 城市列表
    path: "/city",
    name: "city", component: () => import("@/views/city")
  },
  { 
    path: "/housedetails",
    name: "housedetails", component: () => import("@/components/HouseDetails.vue")
  },
  { // 地图
    path: "/map",
    name: "map", component: () => import("@/views/map")
  },
  { // 去出租
    path: "/hire",
    name: "hire", component: () => import("@/views/hire")
  }

]

const router = new VueRouter({
  routes
})

export default router
