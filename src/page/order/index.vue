<template>
  <div>
    <Header :title_middle="middle_title" :show_right="show_right"></Header>
    <section class="order_list">
      <div
        @click="jumpToOrderDetail(item.orderNumber)"
        v-for="item in orderList"
        :key="item.shopInfo.id"
        class="order_item"
      >
        <img
          :src="'https://elm.cangdu.org/img/' + item.shopInfo.image_path"
          alt=""
        />
        <div class="info">
          <div class="info_top">
            <div>
              <span>{{ item.shopInfo.name }}</span>
              <span>{{ item.address }}</span>
            </div>
            <Timer :initTime="fixTime(item.comfirmTime)" class="time"></Timer>
          </div>
          <div class="info_mid">
            <div>
              {{ item.foodList[0][1].food_info.name }}
              <span v-if="item.foodList.length > 1">{{
                `等${item.foodList.length}件产品`
              }}</span>
            </div>
            <div>￥{{ item.all_price }}</div>
          </div>
          <div class="info_bot">
            <span @click="jumpToShop(item.shopInfo.id)">再来一单</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Timer from "@/components/common/setTime.vue";
import Header from "@/components/header/index.vue";
export default {
  data() {
    return {
      middle_title: "订单列表",
      show_right: "",
      updata: [],
      orderList: {},
    };
  },
  components: {
    Header,
    Timer,
  },
  methods: {
    // 获取到所有订单信息
    initOrderList() {
      let username = localStorage.getItem("user");
      this.orderList = this.$store.state.User.allUsers[username].shopList;
    },
    jumpToShop(id) {
      this.$router.push({
        path: "/home/shop",
        query: {
          shopId: id,
        },
      });
    },
    // 跳转到对应订单号的详情
    jumpToOrderDetail(num) {
      this.$router.push({
        path: "/home/orderDetail",
        query: {
          orderNumber: num,
        },
      });
    },
    // 将时间修改为剩余时间
    fixTime(comfirm) {
      let now = new Date().getTime();
      return 900000 - (now - comfirm);
    },
  },
  mounted() {
    this.initOrderList();
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.order_list {
  display: flex;
  flex-direction: column;
  .order_item {
    cursor: pointer;
    font-size: 0.7rem;
    background-color: #fff;
    margin-bottom: 0.8rem;
    display: flex;
    img {
      margin-top: 0.5rem;
      width: 1.5rem;
      height: 1.5rem;
      padding: 0.4rem;
    }
    .info {
      flex-grow: 1;
      padding: 0.4rem;
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
      }
      div:last-child {
        border: none;
      }
      .info_top {
        & > div {
          display: flex;
          flex-direction: column;
          span {
            padding: 0.4rem;
          }
        }
        .time {
          margin-top: 0.4rem;
        }
      }
      .info_mid {
        div {
          padding: 0.4rem;
        }
      }
      .info_bot {
        justify-content: flex-end;
        span {
          cursor: pointer;
          border: 1px solid #3190e8;
          border-radius: 0.3rem;
          color: #3190e8;
          margin-top: 0.4rem;
          padding: 0.2rem;
        }
      }
    }
  }
}
</style>
