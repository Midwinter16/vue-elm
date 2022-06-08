<template>
  <div v-if="shopList">
    <Header
      :title_middle="address"
      :show_right="this.$store.state.isLogin == false ? 'login' : 'user'"
    >
      <svg
        t="1649318913912"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2595"
        width="200"
        height="200"
        @click="jumpToSearch"
      >
        <path
          d="M797.525333 752.266667c62.069333-72.736 97.28-165.002667 97.28-262.186667C894.816 266.528 713.621333 85.333333 490.08 85.333333 266.538667 85.333333 85.333333 266.538667 85.333333 490.069333 85.333333 713.610667 266.538667 894.826667 490.069333 894.826667a404.693333 404.693333 0 0 0 118.208-17.546667 32 32 0 0 0-18.666666-61.216 340.693333 340.693333 0 0 1-99.541334 14.762667C301.888 830.816 149.333333 678.261333 149.333333 490.069333 149.333333 301.888 301.888 149.333333 490.069333 149.333333 678.261333 149.333333 830.826667 301.888 830.826667 490.069333c0 89.28-35.381333 173.696-97.141334 237.322667a36.992 36.992 0 0 0 0.384 51.925333l149.973334 149.973334a32 32 0 0 0 45.258666-45.248L797.525333 752.266667z"
          p-id="2596"
          fill="#ffffff"
        ></path>
      </svg>
    </Header>
    <div class="home_main">
      <div class="nav swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div
              v-for="item in foodListPageOne"
              :key="item.id"
              class="food_item"
            >
              <img
                :src="'https://fuss10.elemecdn.com' + item.image_url"
                :alt="item.title"
              />
              <p>{{ item.title }}</p>
            </div>
          </div>
          <div class="swiper-slide">
            <div
              v-for="item in foodListPageTwo"
              :key="item.id"
              class="food_item"
            >
              <img
                :src="'https://fuss10.elemecdn.com' + item.image_url"
                :alt="item.title"
              />
              <p>{{ item.title }}</p>
            </div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="nearby">
        <div class="nearby_title">
          <div class="el-icon-s-shop"></div>
          <p>附近商家</p>
        </div>
        <div class="nearby_list">
          <div
            class="shop_item"
            @click="jumpToShop(item.id)"
            v-for="item in shopList"
            :key="item.id"
          >
            <img
              :src="'https://elm.cangdu.org/img/' + item.image_path"
              alt=""
            />
            <div class="desc">
              <div class="desc_top">
                <div class="top_left">
                  <div v-if="item.status" class="brand">品牌</div>
                  <div class="desc_name">{{ item.name }}</div>
                </div>
                <div class="top_right">
                  <div
                    v-for="(subItem, index) in item.supports"
                    :key="index"
                    class="top_right"
                  >
                    {{ subItem.icon_name }}
                  </div>
                </div>
              </div>
              <div class="desc_mid">
                <div class="mid_left">
                  <Rating :rating="item.rating"></Rating>
                  <div class="sales">月售{{ item.recent_order_num }}单</div>
                </div>

                <div class="mid_right">
                  <div class="hum_bird">蜂鸟转送</div>
                  <div class="ontime">准时达</div>
                </div>
              </div>
              <div class="desc_bot">
                <div class="bot_left">
                  ￥{{ item.float_minimum_order_amount }}起送 / 配送费为{{
                    item.float_delivery_fee
                  }}￥
                </div>
                <div class="bot_right">
                  {{ item.distance }} / <span>{{ item.order_lead_time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
import Footer from "@/components/footer/index.vue";
import "@/plugins/swiper-3.4.2.min.js";
import "@/style/swiper-3.4.2.min.css";
import { getFoodList, getShopList, getShopInfo } from "@/api/index.js";
import "@/style/common.css";
import Rating from "@/components/common/rating.vue";

export default {
  data() {
    return {
      foodList: [],
      shopList: [],
    };
  },
  components: {
    Header,
    Footer,
    Rating,
  },
  methods: {
    async jumpToShop(id) {
      // 获取到商铺的ID信息后将经纬度，商铺ID传到vuex
      const { data: res } = await getShopInfo(id);
      this.$store.commit("alterShopId", id);
      this.$store.commit("alterLongitude", res.latitude);
      this.$store.commit("alterLatitude", res.longitude);
      const geohash = `${res.latitude},${res.longitude}`;
      this.$store.commit("alterGeohash", geohash);
      this.$router.push({
        path: "/home/shop",
        query: {
          shopId: id,
        },
      });
    },
    jumpToSearch() {
      this.$router.push("/home/search");
    },
    back() {
      this.$router.back();
    },
    async initFoodList() {
      const { data: res } = await getFoodList();
      new Swiper(".swiper-container", {
        direction: "horizontal", // 水平滑动
        loop: false, // 不允许循环，因为循环后会发生页面对接不上的情况

        // 如果需要分页器
        pagination: ".swiper-pagination",
      });
      this.foodList = res;
    },
    async initShopList() {
      const { data: res } = await getShopList(
        this.$store.state.latitude,
        this.$store.state.longitude
      );
      this.shopList = res;
    },
  },
  computed: {
    latitude: {
      get() {
        return this.$store.state.latitude;
      },
    },

    longitude: {
      get() {
        return this.$store.state.longitude;
      },
    },
    address: {
      get() {
        return this.$store.state.address;
      },
    },
    foodListPageOne: {
      get() {
        return this.foodList.slice(0, 8);
      },
    },
    foodListPageTwo: {
      get() {
        return this.foodList.slice(8, 16);
      },
    },
  },
  created() {
    this.initFoodList();
    this.initShopList();
  },
};
</script>

<style lang="less" scoped>
.home_main {
  width: 100%;
  height: 11rem;
  .nav {
    background-color: #fff;
    height: inherit;
    .swiper-slide {
      display: flex;
      flex-wrap: wrap;
      .food_item {
        width: 25%;
        font-size: 0.65rem;
        text-align: center;
        img {
          width: 2rem;
        }
      }
    }
    .swiper-pagination {
      padding-top: 0.5rem;
    }
  }
  .nearby {
    margin-top: 1rem;
    background-color: #fff;
    .nearby_title {
      padding: 0.5rem;
      display: flex;
      align-items: center;
      height: 1rem;
      color: #999;
      p {
        margin-left: 0.5rem;
        font-size: 0.675rem;
      }
    }
    .nearby_list {
      padding-bottom: 2.5rem;
      .shop_item {
        padding: 0.5rem;
        display: flex;
        img {
          flex: 1;
          width: 4rem;
          height: 4rem;
        }
        .desc {
          font-size: 0.65rem;
          flex: 4;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 0.3rem;
          .desc_top {
            display: flex;
            justify-content: space-between;
            .top_left {
              display: flex;

              .brand {
                padding: 0 0.1rem;
                margin-right: 0.3rem;
                background-color: #ffd930;
                color: #000;
                border-radius: 0.2rem;
                font-weight: 900;
              }
              .desc_name {
                font-weight: 700;
              }
            }
            .top_right {
              display: flex;
              align-items: center;
              justify-content: center;
              div {
                border-radius: 0.2rem;
                height: 0.65rem;
                width: 0.65rem;
                color: #888;
                border: 1px solid #888;
                font-size: 0.3rem;
              }
            }
          }
          .desc_mid {
            display: flex;
            justify-content: space-between;
            .mid_left {
              width: 50%;
              display: flex;
              justify-content: space-between;
              .rating {
                display: flex;
                .star {
                  position: relative;
                  top: 0.25rem;
                  .stars,
                  .l_stars {
                    position: relative;
                    display: flex;
                    img {
                      width: 0.5rem;
                      height: 0.5rem;
                    }
                  }
                  .l_stars {
                    top: -0.5rem;
                    overflow: hidden;
                  }
                }
                .score {
                  margin-left: 0.2rem;
                  font-size: 0.65rem;
                  color: #ff6000;
                  text-align: center;
                  line-height: 1rem;
                }
              }
              .sales {
                font-size: 0.5rem;
                text-align: center;
                line-height: 1rem;
              }
            }
            .mid_right {
              font-size: 0.4rem;
              display: flex;
              .hum_bird,
              .ontime {
                line-height: 1rem;
                text-align: center;
                border-radius: 0.2rem;
                margin-left: 0.2rem;
                padding: 0 0.3rem;
              }
              .hum_bird {
                background-color: #3190e8;
                color: #fff;
              }
              .ontime {
                background-color: #fff;
                color: #3190e8;
                border: 1px solid #3190e8;
              }
            }
          }
          .desc_bot {
            display: flex;
            justify-content: space-between;
            font-size: 0.5rem;
            .bot_right {
              span {
                color: #3190e8;
              }
            }
          }
        }
      }
    }
  }
}
.icon {
  width: 0.9rem;
  height: 0.9rem;
  cursor: pointer;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
