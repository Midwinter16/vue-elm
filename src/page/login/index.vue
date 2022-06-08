<template>
  <div>
    <Header :show_right="show_right" title_middle="登录页面">
      <div class="el-icon-arrow-left" @click="back"></div>
    </Header>
    <div class="form_list">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <div class="login_tips">* 未注册用户可以直接通过登录自动注册</div>
        <div v-if="tips != ''" class="login_tips">
          {{ `* ${tips}` }}
        </div>
        <el-form-item class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      show_right: "",
      labelPosition: "top",
      dialogVisible: false,
      ruleForm: {
        username: "",
        password: "",
        words: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 18,
            message: "长度在 3 到 18 个字符",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      tips: "",
    };
  },
  methods: {
    submitForm(formName) {
      let userObj = this.$store.state.User.allUsers;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let userList = Object.keys(userObj);
          if (userList.indexOf(this.ruleForm.username) != -1) {
            if (
              userObj[this.ruleForm.username]["password"] ==
              this.ruleForm.password
            ) {
              console.log("success");
            } else {
              this.tips = "密码错误";
              this.ruleForm.password = "";
              this.ruleForm.username = "";
              this.dialogVisible = true;
            }
          } else {
            let username = this.ruleForm.username;
            let info = {
              password: this.ruleForm.password,
              isVip: false,
              shopList: {},
              phone: "",
              address: {},
            };
            this.$store.commit("User/addUser", { username, info });
          }
          this.$store.commit("loginIn");
          localStorage.setItem("user", this.ruleForm.username);
          // 设置判断，如果是由别的地方跳转的，直接back到前一个网页
          this.$route.query.back == "true"
            ? this.$router.back()
            : this.$router.push("/home/user");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back() {
      this.$router.back();
    },
    handleClose() {
      done();
    },
  },
  mounted() {
    document.querySelectorAll("input[type=text]").forEach((ele) => {
      ele.addEventListener("focus", () => {
        this.tips = "";
      });
    });
  },
};
</script>

<style lang="less" scoped>
.form_list {
  width: 70%;
  border-radius: 1.5rem;
  margin: 0 auto;
  margin-top: 2rem;
  background-color: #fafafa;
  padding: 1rem 2rem;
  .login_tips {
    font-size: 0.4rem;
    margin-bottom: 10px;
    font-weight: 100;
    color: red;
  }
}
.el-form-item /deep/ .el-form-item__label {
  font-size: 0.625rem;
}
.el-button {
  font-size: 0.625rem;
}
.btn {
  display: flex;
  flex-direction: row-reverse;
}
</style>
