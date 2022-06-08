import { elm_request } from "./request";

export const getCityList = (params) => {
  return elm_request.get("/v1/cities", {
    params: {
      type: params,
    },
  });
};

export const searchAddress = (...params) => {
  return elm_request.get("/v1/pois", {
    params: {
      city_id: params[0],
      keyword: params[1],
      type: "search",
    },
  });
};

export const searchShop = (...params) => {
  return elm_request.get("/v4/restaurants", {
    params: {
      geohash: params[0],
      keyword: params[1],
    },
  });
};

export const getFoodList = () => {
  return elm_request.get("/v2/index_entry");
};

export const getShopList = (...params) => {
  return elm_request.get("/shopping/restaurants", {
    params: {
      latitude: params[0], // 纬度
      longitude: params[1], // 经度
      order_by: params[1], // 排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高
    },
  });
};

export const getShopInfo = (params) => {
  return elm_request.get(`/shopping/restaurant/${params}`);
};

export const getShopFoodList = (params) => {
  return elm_request.get(`/shopping/v2/menu`, {
    params: {
      restaurant_id: params,
    },
  });
};

export const getShopRatingScore = (params) => {
  return elm_request.get(`/ugc/v2/restaurants/${params}/ratings/scores`);
};

export const getShopRatingType = (params) => {
  return elm_request.get(`/ugc/v2/restaurants/${params}/ratings/tags`);
};

export const getShopRatingInfo = (...params) => {
  return elm_request.get(`/ugc/v2/restaurants/${params[0]}/ratings`, {
    params: {
      offset: params[1],
      limit: params[2],
    },
  });
};

export const getShopActivies = (...params) => {
  return elm_request.get(`/shopping/v1/restaurants/activity_attributes`, {
    params: {
      latitude: params[1],
      longitude: params[2],
    },
  });
};
