import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/city",
  },
  {
    path: "/location",
    name: "location",
    component: () => import("../page/location/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../page/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../components/common/home.vue"),
    children: [
      {
        path: "elm",
        name: "elm",
        component: () => import("../page/elm/index.vue"),
      },
      {
        path: "search",
        name: "search",
        component: () => import("@/components/common/search.vue"),
      },
      {
        path: "user",
        name: "user",
        component: () => import("../page/user/index.vue"),
      },
      {
        path: "order",
        name: "order",
        component: () => import("../page/order/index.vue"),
      },
      {
        path: "shop",
        name: "shop",
        component: () => import("../page/shop/index.vue"),
      },
      {
        path: "shopCart",
        name: "shopCart",
        component: () => import("../page/shopCart/index.vue"),
      },
      {
        path: "orderExtra",
        name: "orderExtra",
        component: () => import("../page/orderExtra/index.vue"),
      },
      {
        path: "pay",
        name: "pay",
        component: () => import("../page/pay/index.vue"),
      },
      {
        path: "orderDetail",
        name: "orderDetail",
        component: () => import("../page/orderDetail/index.vue"),
      },
      {
        path: "userInfo",
        name: "userInfo",
        component: () => import("../page/userInfo/index.vue"),
      },
      {
        path: "address",
        name: "address",
        component: () => import("../page/address/index.vue"),
      },
      {
        path: "addAddress",
        name: "addAddress",
        component: () => import("../page/addAddress/index.vue"),
      },
      {
        path: "newAddress",
        name: "newAddress",
        component: () => import("../page/addAddress/children/newAddress.vue"),
      },
    ],
  },
  {
    path: "/city",
    name: "city",
    component: () => import("../page/city/index.vue"),
  },
  {
    path: "/selectcity",
    name: "selectcity",
    component: () => import("../page/selectcity/index.vue"),
  },
];

const originalPush = VueRouter.prototype.push;
// 修改 原型对象中的push方法 使其不再因为路由重复报错
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
