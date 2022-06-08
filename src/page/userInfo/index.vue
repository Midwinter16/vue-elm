<template>
  <div class="userInfo">
    <Header :title_middle="middle_title" show_right="">
      <div @click="back" class="el-icon-arrow-left"></div>
    </Header>
    <section class="base_info">
      <ul class="box">
        <li class="img">
          <span>头像</span>
          <img src="" alt="" />
          <div class="el-icon-arrow-right"></div>
        </li>
        <li>
          <span>用户名</span>
          <span>{{ username }}</span>
          <div class="el-icon-arrow-right"></div>
        </li>
        <li @click="jumpToAddress">
          <span>收货地址</span>
          <div class="el-icon-arrow-right"></div>
        </li>
      </ul>
    </section>
    <span class="title">账号绑定</span>
    <section class="binding">
      <img src="" alt="" />
      <span>手机</span>
      <div class="el-icon-arrow-right"></div>
    </section>
    <span class="title">安全设置</span>
    <section class="safe">
      <span>登录密码</span>
      <span>修改</span>
      <div class="el-icon-arrow-right"></div>
    </section>
    <div @click="loginout" class="btn">退出登录</div>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
export default {
  data() {
    return {
      middle_title: "账户信息",
      userInfo: "",
    };
  },
  components: {
    Header,
  },
  computed: {
    username() {
      if (localStorage.getItem("user")) {
        return localStorage.getItem("user");
      } else {
        return "";
      }
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    loginout() {
      this.$store.commit("loginOut");
      localStorage.removeItem("user");
      this.$router.push("/city");
    },
    initUserInfo() {
      let user = localStorage.getItem("user");
      if (user) {
        this.userInfo = this.$store.state.User.allUsers[user];
      }
    },
    jumpToAddress() {
      this.$router.push({
        path: "/home/address",
        query: {
          name: "user",
        },
      });
    },
  },
  created() {},
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
.base_info {
  font-size: 0.7rem;
  color: #333;
  background-color: #fff;
  margin: 0.8rem 0;
  .box {
    display: flex;
    flex-direction: column;
    li {
      border-bottom: 1px solid #eee;
      padding: 0.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > span:first-child {
        flex-grow: 1;
        padding: 0.4rem;
      }
    }
    li:last-child {
      border: none;
    }
  }
}
.binding {
  padding: 0.4rem;
  font-size: 0.7rem;
  background-color: #fff;
  display: flex;
  margin-bottom: 0.8rem;
  align-items: center;
  span {
    padding: 0.4rem;
    flex-grow: 1;
  }
}
.safe {
  padding: 0.4rem;
  font-size: 0.7rem;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  span:nth-of-type(1) {
    padding: 0.4rem;
    flex-grow: 1;
  }
}
.title {
  color: #555;
  display: inline-block;
  font-size: 0.6rem;
  padding: 0 0.4rem;
  margin-bottom: 00.8rem;
}
.btn {
  cursor: pointer;
  font-size: 0.8rem;
  background-color: #d8584a;
  color: #fff;
  text-align: center;
  line-height: 1.7rem;
}
</style>
