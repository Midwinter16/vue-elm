<template>
  <div class="pay_main">
    <Header :show_right="show_right" :title_middle="middle_title">
      <div @click="back" class="el-icon-arrow-left"></div>
    </Header>
    <section class="timeOut">
      <span>支付剩余时间</span>
      <Timer></Timer>
    </section>
    <div class="choose">选择支付方式</div>
    <section class="pay_way">
      <div value="1" name="pay_way" @click="pay_methods" class="focus">
        <span> <img src="../../assets/weixin-pay.png" alt="" /> 微信支付</span>
        <img
          v-if="light == '1'"
          name="pay_way"
          src="../../assets/correct_focus.png"
          alt=""
        />
        <img v-else name="pay_way" src="../../assets/correct.png" alt="" />
      </div>
      <div value="2" name="pay_way" @click="pay_methods">
        <span>
          <img src="../../assets/zhifubao-pay.png" alt="" /> 支付宝支付</span
        >
        <img
          v-if="light == '2'"
          name="pay_way"
          src="../../assets/correct_focus.png"
          alt=""
        />
        <img v-else name="pay_way" src="../../assets/correct.png" alt="" />
      </div>
    </section>
    <div class="button" @click="jumpToOrder">确认支付</div>
  </div>
</template>

<script>
import Timer from "@/components/common/setTime.vue";
import Header from "@/components/header/index.vue";
export default {
  data() {
    return {
      middle_title: "在线支付",
      show_right: "",
      light: 1,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    pay_methods(e) {
      let btn = document.querySelectorAll("div[name=pay_way]");
      btn.forEach((ele) => {
        ele.setAttribute("class", "");
      });
      e.currentTarget.setAttribute("class", "focus");
      this.light = e.currentTarget.getAttribute("value");
    },
    jumpToOrder() {
      let username = localStorage.getItem("user");
      let orderNumber = --this.$store.state.orderNumber;
      let pay_way = this.light == 1 ? "微信支付" : "支付宝支付";
      this.$store.commit("User/addPayWay", { username, orderNumber, pay_way });
      this.$router.push("/home/order");
    },
  },
  components: {
    Header,
    Timer,
  },
};
</script>

<style lang="less" scoped>
.timeOut {
  background-color: #fff;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    padding: 1rem 0 0 0;
  }
  div {
    font-size: 2rem;
    padding: 1rem 0;
  }
}
.choose {
  padding: 0.4rem;
}
.pay_way {
  background-color: #fff;
  div {
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      height: 1rem;
      width: 1rem;
    }
    span {
      display: flex;
      align-items: center;
      line-height: 2rem;
      img {
        margin-right: 0.5rem;
      }
    }
  }
}
.button {
  cursor: pointer;
  margin-top: 0.8rem;
  text-align: center;
  line-height: 2rem;
  background-color: #4cd964;
  color: #fff;
}
</style>
