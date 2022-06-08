<template>
  <div v-if="showAlready" class="shop_body">
    <!-- 虚化的背景以及标题部分 -->
    <div
      class="bg-img"
      :style="`background-image:url(https://elm.cangdu.org/img/${this.shopInfo.image_path})`"
    >
      <div class="title">
        <div
          class="el-icon-arrow-left"
          style="cursor: pointer; position: absolute"
          @click="back"
        ></div>
        <div class="desc">
          <img
            :src="'https://elm.cangdu.org/img/' + this.shopInfo.image_path"
            alt=""
          />
          <div class="detail">
            <div class="shop_name">{{ this.shopInfo.name }}</div>
            <div class="attr">
              商家配送/分钟送达/配送费￥{{ this.shopInfo.float_delivery_fee }}
            </div>
            <div class="notice">公告: {{ this.shopInfo.promotion_info }}</div>
          </div>
        </div>
        <div v-if="this.shopInfo.activities.length != 0" class="activity">
          <div class="discounts">
            <p>{{ activity_icon }}</p>
            {{ activity_title }}
          </div>
          <div class="acts">
            {{ this.shopInfo.activities.length }}个活动
            <div class="el-icon-arrow-right"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品和评价主页面 -->
    <div class="shop_content">
      <!-- 导航 -->
      <div class="dev" ref="dev">
        <div @click="show_activity" class="show_activity">商品</div>
        <div @click="show_activity" class="">评价</div>
      </div>
      <!-- 商品页面 -->
      <div v-if="isShowShop" class="shop_page">
        <!-- 左侧导航 -->
        <BScroll style="flex: 1">
          <el-menu default-active="0" class="el-menu-vertical-demo">
            <el-menu-item
              v-for="(item, index) in shopFoodList"
              :key="item.id"
              :index="index.toString()"
            >
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </BScroll>
        <!-- 右侧商品列表 -->
        <BScroll style="flex: 3">
          <div class="card_list">
            <el-card
              v-for="item in shopFoodList"
              :key="item.id"
              class="box-card"
            >
              <!-- 商品类型 -->
              <div slot="header" class="clearfix">
                <div>
                  <span class="main_title">{{ item.name }}</span>
                  <span class="sub_title">{{ item.description }}</span>
                </div>
                <el-button style="float: right; padding: 3px 0" type="text"
                  >>>></el-button
                >
              </div>
              <!-- 商品 -->
              <div
                v-for="subItem in item.foods"
                :key="subItem.item_id"
                class="food_item"
              >
                <img
                  :src="'https://elm.cangdu.org/img/' + subItem.image_path"
                  alt=""
                />
                <div class="food_detail">
                  <div class="food_name">{{ subItem.name }}</div>
                  <div class="food_info">{{ subItem.tips }}</div>
                  <div class="food_price">
                    <span>￥{{ subItem.specfoods[0].price }}</span>
                    <Count
                      @add_shop_car="add_shop_car(subItem, $event)"
                      @sub_shop_car="sub_shop_car(subItem, $event)"
                      :food_info="subItem"
                      v-if="subItem"
                    ></Count>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </BScroll>
      </div>
      <!-- 评分页面 -->
      <div v-if="!isShowShop" class="rating_page">
        <!-- 评分主体 -->
        <BScroll @upLoadMore="upLoadMore" v-if="ratingInfo && ratingScore">
          <div class="rating_main">
            <!-- 主评分 -->
            <div class="rating_left">
              <span>{{ overall_score }}</span>
              <span>综合评价</span>
              <span>高于周边商家{{ compare_rating }}</span>
            </div>
            <!-- 评分基准 -->
            <div class="rating_right">
              <div class="serve_atti">
                <span>服务态度</span><Rating :rating="service_score"></Rating>
              </div>
              <div class="food_rate">
                <span>菜品评价</span><Rating :rating="food_score"></Rating>
              </div>
              <div class="ontime"><span>送达时间</span>分钟</div>
            </div>
          </div>

          <!-- 评分种类 -->
          <div class="rating_type" v-if="this.ratingType">
            <div
              v-for="(item, index) in ratingType"
              :key="item._id"
              :class="
                index == labelIndex ? 'rating_label choose' : 'rating_label'
              "
              @click="chooseLabel"
              ref="label"
              :index="index"
            >
              {{ `${item.name}(${item.count})` }}
            </div>
          </div>
          <!-- 用户评论 -->
          <div class="user_rating">
            <div v-for="item in ratingInfo" :key="item._id" class="user_item">
              <!-- 头像 -->
              <div class="user_icon">
                <img
                  src="	https://elm.cangdu.org/img/180230b388d104892.jpg"
                  alt=""
                />
              </div>
              <!-- 右侧内容 -->
              <div class="content">
                <div class="content_top">
                  <!-- 评论内容 -->
                  <div>
                    <div class="username">{{ item.username }}</div>
                    <div class="rating_content">
                      <Rating :rating="item.rating_star"></Rating
                      ><span>{{ item.time_spent_desc }}</span>
                    </div>
                  </div>
                  <!-- 日期 -->
                  <div class="date">{{ item.rated_at }}</div>
                </div>
                <!-- 附带照片 -->
                <div class="content_mid">
                  <img
                    v-for="(img, index) in item.item_ratings"
                    :key="index"
                    :src="'	https://fuss10.elemecdn.com/5/38/' + img.image_hash"
                    alt=""
                  />
                </div>
                <!-- 食物标签 -->
                <div class="content_bot">
                  <div
                    v-for="(food, index) in item.item_ratings"
                    :key="index"
                    class="food_label"
                  >
                    {{ food.food_name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BScroll>
      </div>
    </div>
    <Footer
      :delivery="shopInfo.float_delivery_fee"
      :minimun="shopInfo.float_minimum_order_amount"
      class="footer"
    ></Footer>
  </div>
</template>

<script>
import {
  getShopInfo,
  getShopFoodList,
  getShopRatingScore, // 一参为餐馆ID
  getShopRatingInfo, // 一参为餐馆ID，二参为跳过数据数，三参为单次获取数据量
  getShopRatingType, // 一参为餐馆ID
} from "@/api/index.js";
import BScroll from "@/page/scroll/index.vue";
import Rating from "@/components/common/rating.vue";
import Footer from "@/page/shop/children/footer.vue";
import Count from "@/components/common/count.vue";

export default {
  data() {
    return {
      scroll_left: null, // 存储滑动信息
      scroll_right: null, // 存储滑动信息
      shopId: "", // 存储传递过来的商店ID
      shopInfo: "", // 存储商店详细信息
      shopFoodList: "", // 存储商店ID下所有商品
      isShowShop: true, // 判断展示shop页面还是rating页面
      ratingInfo: [],
      ratingScore: [],
      ratingType: [],
      labelIndex: 0,
      limitInfo: 10, // 初始加载条数为10
      shop_car_price: 0, // 购物车当前价格

      // 设置请求数据标签，代表数据已获取
      shopInfoAlready: false,
      shopFoodListAlready: false,
      ratingScoreAlready: false,
      ratingInfoAlready: false,
      ratingTypeAlready: false,

      // 购物车物品列表
      shopCarList: {
        all_count: 0,
        all_price: 0,
      },
    };
  },
  methods: {
    // 初始化商店详细信息
    async initShopInfo(id) {
      const { data: res } = await getShopInfo(id);
      this.shopInfo = res;
      this.shopInfoAlready = true;
    },
    // 得到该商店ID下的商品信息
    async initShopFoodList(id) {
      const { data: res } = await getShopFoodList(id);
      this.shopFoodList = res;
      this.shopFoodListAlready = true;
    },
    // 得到评分信息
    async initRatingInfo(id, jump, limit) {
      const { data: res } = await getShopRatingInfo(id, jump, limit);
      this.ratingInfo = res;
      this.ratingInfoAlready = true;
    },
    // 得到所有评分
    async initRatingScore(id) {
      const { data: res } = await getShopRatingScore(id);
      this.ratingScore = res;
      this.ratingScoreAlready = true;
    },
    // 得到评分种类
    async initRatingType(id) {
      const { data: res } = await getShopRatingType(id);
      this.ratingType = res;
      // 得到数据后初始化标签状态
      this.ratingTypeAlready = true;
    },
    // 得到商店ID
    getShopId() {
      this.shopId = this.$route.query.shopId;
    },
    // 点击改变导航高亮样式
    show_activity(e) {
      this.$refs.dev.childNodes.forEach((ele) => {
        ele.setAttribute("class", "");
      });
      e.target.setAttribute("class", "show_activity");
      if (e.target.innerHTML == "商品") {
        this.isShowShop = true;
      } else {
        this.isShowShop = false;
      }
    },
    initLabel() {
      this.$refs.label.forEach((ele) => {
        if (ele.getAttribute("index") == this.labelIndex) {
          ele.setAttribute("class", "rating_label choose");
        }
      });
    },
    // 点击改变评论标签样式
    chooseLabel(e) {
      this.labelIndex = e.target.getAttribute("index");
      this.initLabel();
    },
    upLoadMore() {
      this.limitInfo += 10;
      this.initRatingInfo(this.shopId, 0, this.limitInfo);
    },
    back() {
      this.$router.back();
    },
  },
  created() {
    this.getShopId();
    this.initShopInfo(this.shopId);
    this.initShopFoodList(this.shopId);
    this.initRatingScore(this.shopId);
    this.initRatingInfo(this.shopId, 0, this.limitInfo);
    this.initRatingType(this.shopId);
  },
  components: {
    BScroll,
    Rating,
    Footer,
    Count,
  },
  computed: {
    service_score: {
      get() {
        return +this.ratingScore.service_score;
      },
    },
    food_score: {
      get() {
        return +this.ratingScore.food_score;
      },
    },
    overall_score: {
      get() {
        return +this.ratingScore.overall_score;
      },
    },
    compare_rating: {
      get() {
        let num = this.ratingScore.compare_rating * 100;
        return `${num.toFixed(2)}%`;
      },
    },
    activity_icon: {
      get() {
        if (this.shopInfo.activities.length == 0) {
          return "";
        } else {
          return this.shopInfo.activities[0].icon_name;
        }
      },
    },
    activity_title: {
      get() {
        if (this.shopInfo.activities.length == 0) {
          return "";
        } else {
          return this.shopInfo.activities[0].description;
        }
      },
    },
    showAlready: {
      get() {
        return (
          this.shopInfoAlready &&
          this.shopFoodListAlready &&
          this.ratingScoreAlready &&
          this.ratingTypeAlready &&
          this.ratingInfoAlready
        );
      },
    },
  },
};
</script>

<style lang="less" scoped>
.shop_body {
  .title {
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 0.4rem;
    height: 5.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    .desc {
      display: flex;
      img {
        width: 3.6rem;
        height: 3.6rem;
      }
      .detail {
        padding: 0 0.2rem;
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        color: #fff;
        font-size: 0.9rem;
        div:nth-of-type(n + 2) {
          font-size: 0.7rem;
        }
        .shop_name {
          font-weight: 700;
        }
      }
    }
    .activity {
      display: flex;
      justify-content: space-between;
      font-size: 0.6rem;
      color: #fff;
      align-items: center;
      .discounts {
        display: flex;
        align-items: center;
        height: 1.5rem;
        p {
          border-radius: 0.25rem;
          height: 0.75rem;
          width: 0.75rem;
          color: #fff;
          background-color: rgb(240, 115, 115);
          text-align: center;
          line-height: 0.75rem;
        }
      }
    }
  }
  .shop_content {
    background-color: #fff;
    .dev {
      display: flex;
      justify-content: space-around;
      padding: 0.2rem 0;
      div {
        cursor: pointer;
        font-size: 0.75rem;
        color: #666;
        padding: 0.2rem 0.1rem;
        border-bottom: 0.12rem solid #fff;
      }
      .show_activity {
        border-bottom: 0.12rem solid #3190e8;
        color: #3190e8;
      }
    }
    .shop_page {
      display: flex;
      justify-content: space-between;
      .el-menu-vertical-demo {
        flex: 1;
        flex-shrink: 1;
        & /deep/ .el-menu-item {
          padding: 0 !important;
          width: 5rem;
          span {
            width: 5rem;
            font-size: 0.7rem;
            word-wrap: break-word;
          }
        }
      }
      .card_list {
        flex: 3;
        overflow-y: auto;
        flex: 3;
        flex-grow: 10;
        display: flex;
        flex-direction: column;
        .box-card {
          flex-direction: column;
          border: none;
          box-shadow: none;
          padding: none;
          /deep/ .el-card__body {
            padding: 0.3rem 0.1rem;
          }
          /deep/ .el-card__header {
            padding: 0.3rem 0.1rem;
          }
          .clearfix {
            display: flex;
            justify-content: space-between;
            .main_title {
              font-size: 0.75rem;
              font-weight: 700;
            }
            .sub_title {
              margin-left: 0.3rem;
              font-size: 0.6rem;
              color: #666;
            }
          }
          .food_item {
            padding: 0.2rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            img {
              flex: 1;
              flex-grow: 0;
              width: 3rem;
              height: 3rem;
              margin-right: 0.4rem;
            }
            .food_detail {
              flex: 2;
              display: flex;
              justify-content: space-around;
              flex-direction: column;
              font-size: 0.7rem;
              .food_name {
                font-weight: 700;
              }
              .food_price {
                display: flex;
                justify-content: space-between;
                color: #f60;
              }
            }
          }
        }
      }
    }
    .rating_page {
      .rating_main {
        border-bottom: 0.8rem solid #e6e6e6;
        padding: 1rem 1.5rem;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-around;
        font-size: 0.5rem;
        background-color: #fff;
        .rating_left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          span {
            text-align: center;
          }
          span:nth-of-type(1) {
            font-size: 1.2rem;
            color: #ff6000;
            font-weight: 700;
          }
          span:nth-of-type(2) {
            font-size: 0.9rem;
            color: #666;
          }
          span:nth-of-type(3) {
            font-size: 0.7rem;
            color: #999;
          }
        }
        .rating_right {
          display: flex;
          width: 8rem;
          flex-direction: column;
          justify-content: space-around;
          div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              font-size: 0.7rem;
            }
          }
        }
      }
      .rating_type {
        padding: 0.7rem;
        display: flex;
        flex-wrap: wrap;
        .rating_label {
          cursor: pointer;
          color: #6d7885;
          font-size: 0.6rem;
          border-radius: 0.2rem;
          background-color: #ebf5ff;
          padding: 0.3rem;
          margin: 0 0.3rem 0.3rem 0;
        }
        .choose {
          color: #fff;
          background-color: #3190e8;
        }
      }
      .user_rating {
        .user_item {
          display: flex;
          padding: 1rem 0;
          font-size: 0.5rem;
          .user_icon {
            flex: 1;
            img {
              width: 2rem;
              height: 2rem;
            }
          }
          .content {
            flex: 7;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .content_top {
              display: flex;
              justify-content: space-between;
              .rating_content {
                display: flex;
                justify-content: center;
                span {
                  margin-left: 0.3rem;
                  text-align: center;
                  line-height: 1rem;
                }
              }
              .date {
                margin-right: 0.3rem;
              }
            }
            .content_mid {
              display: flex;
              img {
                width: 1.2rem;
                height: 1.2rem;
              }
            }
            .content_bot {
              display: flex;
              .food_label {
                width: 3rem;
                height: 0.8rem;
                line-height: 0.8rem;
                border: 1px solid #999;
                border-radius: 0.2rem;
                color: #777;
                font-size: 0.5rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
}
.bg-img {
  background-repeat: no-repeat;
  background-size: cover;
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
