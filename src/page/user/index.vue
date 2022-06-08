<template>
  <div>
    <Header :title_middle="middle_title" :show_right="show_right">
      <div @click="back" class="el-icon-arrow-left"></div>
    </Header>
    <!-- 登录状态 -->
    <div @click="jumpToUserInfo" class="status">
      <img class="user_img" src="../../assets/user-img.png" alt="" />
      <div class="sign_status">
        <div class="sign">
          {{ this.isLogin == false ? "登录/注册" : username }}
        </div>
        <div class="phone">
          <img class="phone_img" src="../../assets/phone.png" alt="" />
          <p>暂无绑定手机号</p>
        </div>
      </div>
      <a href="#">
        <img class="signin" src="../../assets/right_arrow.png" alt="" />
      </a>
    </div>
    <div class="basis_info">
      <ul>
        <li class="remain">
          <span class="info_data_top"><b class="money">0.00</b>元</span>
          <span class="info_data_bot">我的余额</span>
        </li>
        <li class="discounts">
          <span class="info_data_top"><b class="disc">0</b>个</span>
          <span class="info_data_bot">我的优惠</span>
        </li>
        <li class="score">
          <span class="info_data_top"><b class="scr">0</b>分</span>
          <span class="info_data_bot">我的积分</span>
        </li>
      </ul>
    </div>
    <section class="service">
      <ul>
        <li @click="jumpToOrder" class="order">
          <img src="../../assets/shop.png" alt="" />
          <span>我的订单</span>
          <img src="../../assets/right_arrow-gray.png" alt="" />
        </li>
        <li class="vip">
          <img src="../../assets/crown.png" alt="" />
          <span>积分商城</span>
          <img src="../../assets/right_arrow-gray.png" alt="" />
        </li>
        <li class="score_shop">
          <img src="../../assets/order.png" alt="" />
          <span>饿了么会员卡</span>
          <img src="../../assets/right_arrow-gray.png" alt="" />
        </li>
      </ul>
    </section>

    <section class="service">
      <ul>
        <li class="score_shop">
          <img src="../../assets/service.png" alt="" />
          <span>服务中心</span>
          <img src="../../assets/right_arrow-gray.png" alt="" />
        </li>
        <li class="vip">
          <img src="../../assets/elm-focus.png" alt="" />
          <span>下载饿了么APP</span>
          <img src="../../assets/right_arrow-gray.png" alt="" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";

export default {
  data() {
    return {
      middle_title: "我的",
      show_right: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    back() {
      this.$router.back();
    },
    jumpToOrder() {
      this.$router.push("/home/order");
    },
    jumpToUserInfo() {
      if (this.isLogin) {
        this.$router.push("/home/userInfo");
      } else {
        this.$confirm("请先登录");
        this.$router.push({
          path: "/login",
          query: {
            back: true,
          },
        });
      }
    },
  },
  computed: {
    username() {
      return localStorage.getItem("user");
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.status {
  cursor: pointer;
  background-color: #3190e8;
  display: flex;
  align-items: center;
  padding: 0.7rem;
  .user_img {
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
  }
  .sign_status {
    padding: 0.5rem;
    color: #fff;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    .sign {
      font-size: 0.9rem;
      font-weight: 700;
    }
    .phone {
      margin-top: 0.3rem;
      display: flex;
      align-items: center;
      font-size: 0.7rem;
      .phone_img {
        width: 0.7rem;
        height: 0.7rem;
      }
      p {
        margin: 0;
      }
    }
  }
  a {
    width: 0.9rem;
    height: 1rem;
    .signin {
      width: inherit;
      height: inherit;
    }
  }
}
.basis_info {
  background-color: #fff;
  margin-bottom: 0.8rem;
  ul {
    padding: 0;
    display: flex;
    overflow: hidden;
    li {
      list-style: none;
      flex: 1;
      border-right: 1px solid #eee;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      span {
        font-size: 0.7rem;
        b {
          font-size: 1.4rem;
        }
        .money {
          color: #f90;
        }
        .disc {
          color: #ff5f3e;
        }
        .scr {
          color: #6ac20b;
        }
      }
      span:nth-of-type(1) {
        padding: 0.4rem 0;
      }
      span:nth-of-type(2) {
        padding: 0 0 0.3rem 0;
      }
    }
  }
}
.service {
  padding: 0.3rem;
  background-color: #fff;
  margin-bottom: 0.8rem;
  ul {
    display: flex;
    flex-direction: column;
    li {
      border-bottom: 1px solid #eee;
      display: flex;
      padding: 0.4rem;
      align-items: center;
      span {
        flex-grow: 1;
        font-size: 0.8rem;
        padding-left: 0.3rem;
      }
      img:nth-child(1) {
        width: 1.2rem;
        height: 1.2rem;
      }
      img:nth-child(3) {
        width: 0.7rem;
        height: 0.7rem;
      }
    }
    li:last-child {
      border: none;
    }
  }
}
</style>
