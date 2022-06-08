import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import User from "./modules/user";

export default new Vuex.Store({
  state: {
    isLogin: false,
    guessCity: "",
    searchShop: "",
    cityHistoryList: [],
    shopHistoryList: [],
    address: "",
    longitude: "",
    latitude: "",
    geohash: "",
    shopId: "",
    shopCarList: {
      all_count: 0,
      all_price: 0,
    },
    note: "",
    orderNumber: 1,
    editStatus: false,
  },
  getters: {},
  mutations: {
    add_shop_car(state, [food_info, count]) {
      state.shopCarList[food_info.specfoods[0].food_id] = {
        food_info,
        count,
      };
      state.shopCarList.all_count++;
      state.shopCarList.all_price += food_info.specfoods[0].price;
    },
    sub_shop_car(state, [food_info, count]) {
      if (count == 0) {
        delete state.shopCarList[food_info.specfoods[0].food_id];
      } else {
        state.shopCarList[food_info.specfoods[0].food_id] = {
          food_info,
          count,
        };
      }
      state.shopCarList.all_count--;
      state.shopCarList.all_price -= food_info.specfoods[0].price;
    },
    clear_shop_car(state) {
      state.shopCarList = { all_count: 0, all_price: 0 };
    },
    alterGuessCity(state, newCity) {
      state.guessCity = newCity;
    },
    alterCityHistoryList(state, item) {
      state.cityHistoryList.push(item);
      state.cityHistoryList = [...new Set(state.cityHistoryList)];
    },
    resetCityHistoryList(state) {
      state.cityHistoryList = [];
    },
    alterShopHistoryList(state, item) {
      state.shopHistoryList.push(item);
      state.shopHistoryList = [...new Set(state.shopHistoryList)];
    },
    resetShopHistoryList(state) {
      state.shopHistoryList = [];
    },
    alterAddress(state, val) {
      state.address = val;
    },
    alterGeohash(state, val) {
      state.geohash = val;
    },
    alterLongitude(state, val) {
      state.longitude = val;
    },
    alterLatitude(state, val) {
      state.latitude = val;
    },
    alterNote(state, val) {
      state.note = val;
    },
    alterShopId(state, val) {
      state.shopId = val;
    },
    addOrderNumber(state) {
      state.orderNumber += 1;
    },
    loginOut(state) {
      state.isLogin = false;
    },
    loginIn(state) {
      state.isLogin = true;
    },
    changeEditStatus(state) {
      state.editStatus = !state.editStatus;
    },
  },
  actions: {},
  modules: {
    User,
  },
});
