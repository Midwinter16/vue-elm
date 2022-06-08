<template>
  <div>
    <div class="footer"></div>
    <!-- 总价格部分 -->
    <div class="price_box">
      <div class="price">￥{{ all_price }}</div>
      <div class="limit">配送费￥{{ delivery }}</div>
    </div>
    <!-- 结算按钮 -->
    <div :class="this.minimun - this.all_price <= 0 ? 'order allow' : 'order'">
      <div @click="jumpToCart">
        {{ btn_content }}
      </div>
    </div>
    <!-- 购物车 -->
    <div @click="unfold" class="el-icon-shopping-cart-1 shop_car_icon">
      <div v-if="all_count" class="count">
        <div>{{ all_count }}</div>
      </div>
    </div>
    <!-- 购物车展开 -->
    <div class="unfold_par">
      <el-drawer
        class="unfold"
        title="清空购物车"
        :visible.sync="drawer"
        direction="btt"
        :modal-append-to-body="modal"
        :size="drawSize"
      >
        <span
          v-for="item in food_list"
          :key="item[1].food_info.specfoods[0].food_id"
          class="food_item"
        >
          <div class="food_name">{{ item[1].food_info.specfoods[0].name }}</div>
          <div class="food_price">
            {{ item[1].food_info.specfoods[0].price }}
          </div>
          <div class="food_count">
            <Count :food_info="item[1].food_info"></Count>
          </div>
        </span>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import Count from "@/components/common/count.vue";
export default {
  props: {
    minimun: {
      default: 0,
      type: Number,
      required: true,
    },
    delivery: {
      default: 0,
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      drawer: false,
      modal: false,
      drawSize: 0,
    };
  },
  computed: {
    all_count: {
      get() {
        return this.$store.state.shopCarList.all_count;
      },
    },
    all_price: {
      get() {
        return this.$store.state.shopCarList.all_price;
      },
    },
    btn_content: {
      get() {
        if (this.minimun - this.all_price > 0) {
          return `还差￥${this.minimun - this.all_price}起送`;
        } else {
          return `去结算`;
        }
      },
    },
    food_list: {
      get() {
        return Object.entries(this.$store.state.shopCarList).filter((ele) => {
          if (ele[0] != "all_price" && ele[0] != "all_count") {
            return ele;
          }
        });
      },
    },
  },
  methods: {
    unfold() {
      this.drawer = !this.drawer;
    },
    jumpToCart() {
      if (!this.$store.state.isLogin) {
        this.$confirm("请先登录");
        this.$router.push({
          path: "/login",
          query: {
            back: true,
          },
        });
        return;
      }
      if (this.minimun - this.all_price <= 0) {
        this.$router.push({
          path: "/home/shopCart",
          query: {
            shopId: this.$route.query.shopId,
            geohash: this.$store.state.geohash,
          },
        });
      }
    },
  },
  components: {
    Count,
  },
  mounted() {
    // 添加清空购物车的功能
    document
      .querySelector('span[role="heading"]')
      .addEventListener("click", () => {
        this.$store.commit("clear_shop_car");
      });
  },
  watch: {
    // 监听购物车列表，当列表清空时关闭购物车滑动菜单
    food_list: {
      immediate: true,
      handler() {
        if (this.food_list.length == 0) {
          this.drawer = false;
        }
        let size = Math.max(20 + this.food_list.length * 6, 25);
        this.drawSize = `${size}%`;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  color: #fff;
  background-color: #666;
  .price_box {
    flex: 3;
    background-color: #555;
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0 0.3rem 5rem;
    .price {
      font-size: 1.2rem;
    }
    .limit {
      font-size: 0.5rem;
    }
  }
  .order {
    flex: 2;
    background-color: #666;
    font-size: 0.8rem;
    text-align: center;
    display: flex;
    justify-content: center;
    div {
      align-self: center;
    }
  }
  .allow {
    background-color: #4cd964;
    cursor: pointer;
  }
  .shop_car_icon {
    position: absolute;
    left: 1.5rem;
    transform: scale(1.8);
    background-color: #555;
    border-radius: 50%;
    padding: 0.2rem;
    border: 0.1rem solid #666;
    .count {
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;
      background-color: red;
      border-radius: 50%;
      top: -0.1rem;
      right: -0.1rem;
      padding: 0.1rem;
      font-size: 0.1rem;
      div {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        line-height: 0.5rem;
        text-align: center;
        font-size: 0.5rem;
        transform: scale(0.6);
      }
    }
  }
}
.unfold_par {
  z-index: -10;
  .unfold {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    .food_item {
      color: #000;
      font-size: 0.5rem;
      display: flex;
      justify-content: space-between;
      padding: 0.3rem 1rem;
      font-size: 0.7rem;
      .food_count {
        width: 3rem;
        position: relative;
        .count {
          position: absolute;
          right: 0;
        }
      }
      .food_name {
        width: 5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
