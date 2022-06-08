<template>
  <div v-if="showPage">
    <div class="order_main">
      <Header :title_middle="title_middel" :show_right="show_right">
        <div class="el-icon-arrow-left" @click="back"></div>
      </Header>
      <!-- 用户地址 -->
      <div @click="jumpToAddress" class="user_address">
        <div v-if="userAddress" class="user_info">
          <img class="local" src="../../assets/location.png" alt="" />
          <div class="info">
            <div class="info_top">
              <span class="user_name">{{ userAddress.name }}</span>
              <span class="sex">男</span>
              <span class="phone">{{ userAddress.phone }}</span>
            </div>
            <div class="info_bot">
              <span class="label">{{ userAddress.label }}</span>
              <span class="address">{{ userAddress.detailAddress }}</span>
            </div>
          </div>
        </div>
        <div class="tips" v-else>地址栏没有地址，请输入</div>
        <div class="el-icon-arrow-right"></div>
      </div>
      <!-- 送达时间 -->
      <section class="delivery_info">
        <span>送达时间</span>
        <div class="delivery_time">
          <span>尽快送达 | 预计{{ delivery_time }}</span>
          <div><span>蜂鸟专送</span></div>
        </div>
      </section>
      <!-- 支付方式 -->
      <section class="pay">
        <ul>
          <li class="pay_methods" @click="openDrawer">
            <span>支付方式</span>
            <span
              >{{ light == 1 ? "在线支付" : "货到付款" }}
              <div class="el-icon-arrow-right"></div
            ></span>
          </li>
          <li class="discounts">
            <span>红包</span>
            <span>暂时只支持在饿了么APP中支付</span>
          </li>
        </ul>
      </section>
      <!-- 订单信息 -->
      <section class="order">
        <div class="shop_info">
          <img
            :src="'https://elm.cangdu.org/img/' + shopInfo.image_path"
            alt=""
          />
          <span class="shop_name">{{ shopInfo.name }}</span>
        </div>
        <div class="shop_cart">
          <ul class="cart_list">
            <li v-for="(item, index) in food_cart" :key="index">
              <span class="food_name">{{ item[1].food_info.name }}</span>
              <span class="count">x{{ item[1].count }}</span>
              <span class="price">{{
                item[1].food_info.specfoods[0].price
              }}</span>
            </li>
            <li>
              <span class="food_name">餐盒</span>
              <span class="price">￥{{ shopInfo.float_delivery_fee }}</span>
            </li>
            <li>
              <span class="food_name">配送费</span>
              <span class="price">￥{{ shopInfo.float_delivery_fee }}</span>
            </li>
          </ul>
        </div>
        <div class="order_info">
          <span class="order_left">订单总价</span>
          <div class="order_right">
            <span>待支付</span>
            <span>￥{{ all_price }}</span>
          </div>
        </div>
      </section>
      <!-- 订单备注 -->
      <section class="order_extra">
        <ul>
          <li @click="jumpToOrderExtra" class="order_note">
            <span>订单备注</span>
            <span
              >{{
                this.$store.state.note == ""
                  ? "备注信息"
                  : this.$store.state.note
              }}
              <div class="el-icon-arrow-right"></div
            ></span>
          </li>
          <li class="bill">
            <span>发票抬头</span>
            <span>不需要开发票</span>
          </li>
        </ul>
      </section>
    </div>
    <section class="footer">
      <span>待支付￥{{ all_price }}</span>
      <span @click="confirm">确认下单</span>
    </section>
    <el-drawer
      title="支付方式"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="45%"
    >
      <div value="1" name="pay_way" @click="pay_methods" class="focus">
        <span>在线支付</span>
        <img
          v-if="light == '1'"
          name="pay_way"
          src="../../assets/correct_focus.png"
          alt=""
        />
        <img v-else name="pay_way" src="../../assets/correct.png" alt="" />
      </div>
      <div value="2" name="pay_way" @click="pay_methods">
        <span
          >货到付款<span v-if="!isSupportCOD"
            >（商家不支持货到付款）</span
          ></span
        >
        <img
          v-if="light == '2'"
          name="pay_way"
          src="../../assets/correct_focus.png"
          alt=""
        />
        <img v-else name="pay_way" src="../../assets/correct.png" alt="" />
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
import { getShopInfo, getShopActivies } from "@/api/index.js";
export default {
  data() {
    return {
      title_middel: "确认订单",
      show_right: "user",
      showPage: false,
      shopInfo: {},
      shopActivies: {},
      food_cart: {},
      drawer: false,
      direction: "btt",
      light: "1",
      isSupportCOD: true,
    };
  },
  components: {
    Header,
  },
  methods: {
    back() {
      this.$router.back();
    },
    async initShopInfo() {
      const { data: res } = await getShopInfo(this.$route.query.shopId);
      this.shopInfo = res;
    },
    async initShopActivies() {
      const { data: res } = await getShopActivies(
        this.$store.state.latitude,
        this.$store.state.longitude
      );
      this.shopActivies = res;
    },
    initFoodCart() {
      this.food_cart = Object.entries(this.$store.state.shopCarList).filter(
        (ele) => {
          if (ele[0] != "all_price" && ele[0] != "all_count") {
            return ele;
          }
        }
      );
    },
    openDrawer() {
      this.drawer = true;
    },
    // drawer适配方法
    handleClose(done) {
      done();
    },
    // 选择付款方式
    pay_methods(e) {
      if (this.isSupportCOD == false) {
        return;
      }
      let btn = document.querySelectorAll("div[name=pay_way]");
      btn.forEach((ele) => {
        ele.setAttribute("class", "");
      });
      e.currentTarget.setAttribute("class", "focus");
      this.light = e.currentTarget.getAttribute("value");
    },
    // 跳转到订单备注
    jumpToOrderExtra() {
      this.$router.push("/home/orderExtra");
    },
    jumpToAddress() {
      this.$router.push({
        path: "/home/address",
        query: {
          name: "order",
        },
      });
    },
    // 确认下单
    confirm() {
      let comfirmTime = new Date().getTime();
      let foodList = Object.entries(this.$store.state.shopCarList).filter(
        (ele) => {
          if (ele[0] != "all_count" && ele[0] != "all_price") {
            return ele;
          }
        }
      );
      let shopInfo = this.shopInfo;
      let address = "启达世家";
      let payWay = this.light == 1 ? "在线支付" : "货到付款";
      let all_price = this.$store.state.shopCarList.all_price;
      let username = localStorage.getItem("user");
      let orderNumber = this.$store.state.orderNumber;
      let detail = {
        shopInfo,
        address,
        payWay,
        foodList,
        comfirmTime,
        all_price,
        orderNumber,
        payWay: "",
      };
      this.$store.commit("addOrderNumber");
      this.$store.commit("User/addShopList", { username, orderNumber, detail });
      this.$store.commit("clear_shop_car");
      // 每次确认订单清除购物列表
      this.$router.push("/home/pay");
    },
  },
  created() {
    this.initShopInfo();
    this.initFoodCart();
    this.initShopActivies();
  },
  mounted() {
    this.showPage = true;
  },
  computed: {
    // 计算到达时间
    delivery_time() {
      let time = this.shopInfo.order_lead_time;
      if (time == "" || time == undefined) {
        time = 40;
      } else {
        time = time.replace("分钟", "");
      }
      const date = new Date();
      let hours = date.getHours();
      let mins = date.getMinutes() + 40;
      if (mins > 59) {
        mins -= 60;
        hours += 1;
      }
      if (hours > 23) {
        hours = 0;
      }
      let h = hours < 10 ? "0" : "";
      let m = mins < 10 ? "0" : "";
      return `${h}${hours}:${m}${mins}`;
    },
    all_price() {
      let price = this.$store.state.shopCarList.all_price;
      return price + this.shopInfo.float_delivery_fee * 2;
    },
    userAddress() {
      let user = localStorage.getItem("user");
      let addressList = this.$store.state.User.allUsers[user].address;
      for (let item in addressList) {
        if (addressList[item].isChoose) {
          return addressList[item];
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.user_address {
  cursor: pointer;
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.8rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAGCAYAAACMyr1NAAAAAXNSR0IArs4c6QAAANxJREFUOBFjZICCpoUPWhn+M7rD+OTQjP8ZztQmymfg0/tr95JlDAz/I/GpISTHyMiwj9Ul1hmbOiaQYNfSx6qUegZkDisD01QQjQv837NMD+iYCFzyxIr/Z2asxqWWBSTx49e/LAZGXEqIFP/PcLgiUfYyPtV/GP62/P9PmU3AANnM6hhzApc9TB3zH+sCrbDFpYBYcQ42pmn41P7av8QC6BlffGoIyTEyMv5nYWCuwaeO6TfDv2x8CoiSY/y/syxa9jY+tYx//7fikydGDhggKxhdoi4Ro3bYqAEAknE5DXYMR0IAAAAASUVORK5CYII=)
    0 100% repeat-x;
  min-height: 4.5rem;
  background-color: #fff;
  .user_info {
    display: flex;
    align-items: center;
    .local {
      width: 1rem;
      height: 1rem;
      margin-right: 0.2rem;
    }
    .info {
      display: flex;
      flex-direction: column;
      font-size: 0.7rem;
      span {
        margin: 0 0.3rem;
      }
      .info_top {
        .user_name {
          font-size: 1rem;
          font-weight: 700;
        }
      }
      .info_bot {
        .label {
          background-color: #ff5722;
          color: #fff;
          border-radius: 0.3rem;
          padding: 0 0.2rem;
          font-size: 0.6rem;
        }
        .address {
          color: #999;
        }
      }
    }
  }
}
.delivery_info {
  background-color: #fff;
  border-left: 0.2rem solid #3190e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  margin-bottom: 0.8rem;
  & > span {
    font-weight: 700;
    font-size: 1rem;
  }
  .delivery_time {
    min-height: 4.5rem;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    span {
      color: #3190e8;
    }
    div {
      position: relative;
    }
    div > span {
      position: relative;
      right: 0;
      color: #fff;
      background-color: #3190e8;
      border-radius: 0.2rem;
      padding: 0 0.2rem;
    }
  }
}
.pay {
  margin-bottom: 0.8rem;
  background-color: #fff;
  padding: 0 0.4rem;
  ul {
    font-size: 0.7rem;
    display: flex;
    flex-direction: column;
    li {
      padding: 0.6rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
    }
    li:last-child {
      border: none;
    }
    .pay_methods {
      cursor: pointer;
      span:nth-of-type(1) {
        font-size: 0.9rem;
        color: #666;
      }
      span:nth-of-type(2) {
        color: #999;
      }
    }
    .discounts {
      span {
        color: #999;
      }
    }
  }
}
.order {
  font-size: 0.8rem;
  margin-bottom: 0.8rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  div {
    border-bottom: 1px solid #eee;
  }
  div:last-child {
    border: none;
  }
  .shop_info {
    display: flex;
    align-items: center;
    padding: 1rem;
    img {
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 0.5rem;
    }
  }
  .shop_cart {
    padding: 0.5rem;
    .cart_list {
      display: flex;
      flex-direction: column;
      li {
        padding: 0.5rem;
        color: #666;
        display: flex;
        justify-content: space-between;
        .food_name {
          width: 5rem;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .count {
          color: #f60;
        }
        .price {
          width: 3rem;
        }
      }
    }
  }
  .order_info {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    .order_right {
      display: flex;
      flex-direction: column;
      color: #f60;
      justify-content: space-between;
      span {
        margin-right: 1rem;
        text-align: right;
      }
    }
  }
}
.order_extra {
  margin-bottom: 4rem;
  background-color: #fff;
  padding: 0 0.4rem;
  ul {
    font-size: 0.7rem;
    display: flex;
    flex-direction: column;
    li {
      padding: 0.6rem;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
    }
    li:last-child {
      border: none;
    }
    .order_note {
      cursor: pointer;
      span:nth-of-type(1) {
        font-size: 0.9rem;
        color: #666;
      }
      span:nth-of-type(2) {
        color: #999;
        max-width: 7rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .bill {
      span {
        color: #999;
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  font-size: 0.9rem;
  span:nth-of-type(1) {
    flex: 2.5;
    background-color: #3c3c3c;
    color: #fff;
    line-height: 2.5rem;
    padding-left: 1.5rem;
  }
  span:nth-of-type(2) {
    flex: 1;
    background-color: #56d176;
    color: #fff;
    text-align: center;
    line-height: 2.5rem;
    cursor: pointer;
  }
}
.botTool {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.el-drawer {
  div {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-content: center;
    font-size: 0.9rem;
    padding: 0.7rem;
    color: #999;
    img {
      width: 1rem;
      height: 1rem;
    }
  }
  .focus {
    color: #000;
  }
}
.tips {
  font-size: 0.7rem;
}
</style>
