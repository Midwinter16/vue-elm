<template>
  <div class="header">
    <p class="header_title"><slot></slot>{{ title_left }}</p>
    <p class="header_title mid">{{ title_middle }}</p>
    <div class="header_right">
      <div v-if="show_right == 'login'" class="login">
        <a @click="login">登录</a><a @click="login">注册</a>
      </div>
      <div
        @click="jumpToUser"
        v-else-if="show_right == 'user'"
        class="el-icon-user"
      ></div>
      <div class="edit" @click="changeEdit" v-else-if="show_right == 'edit'">
        {{ this.$store.state.editStatus == false ? "编辑" : "完成" }}
      </div>
      <div class="zone" v-else></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show_right: {
      default: "none",
      type: String,
      required: true,
    },
    title_left: {
      default: "",
      type: String, // 设置值类型
      required: false, // 设置该属性是否必填
    },
    title_middle: {
      default: "",
      type: String, // 设置值类型
      required: false, // 设置该属性是否必填
    },
    isSign: {
      default: false,
      type: Boolean, // 设置值类型
      required: false, // 设置该属性是否必填
    },
  },
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    jumpToUser() {
      this.$router.push("/home/user");
    },
    changeEdit() {
      this.$store.commit("changeEditStatus");
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 0 0.7rem;
  background-color: #3190e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 1rem;
  .header_title {
    margin: 0.7rem 0;
    cursor: pointer;
  }
  .header_right {
    font-size: 0.75rem;
    margin-right: 0.5rem;
    .login {
      width: 3.5rem;
      display: flex;
      justify-content: space-around;
      a {
        height: inherit;
        cursor: pointer;
      }
    }
  }
}
.edit {
  cursor: pointer;
}
.zone {
  width: 1.5rem;
}
</style>
