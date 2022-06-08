<template>
  <div class="addAddress">
    <Header :title_middle="middle_title" show_right=""
      ><div @click="back" class="el-icon-arrow-left"></div>
    </Header>
    <section class="addressInfo">
      <input v-model="name" placeholder="请填写你的姓名" type="text" />
      <input
        v-model="address"
        @click="jumpToSearch"
        placeholder="请输入地址"
        type="text"
      />
      <input
        v-model="detailAddress"
        placeholder="请填写详细送餐地址"
        type="text"
      />
      <input v-model="phone" placeholder="请填写手机号码" type="text" />
      <input
        v-model="alterPhone"
        placeholder="请填写备用手机号码"
        type="text"
      />
      <div class="label">
        <span name="label" @click="chooseLabel">家</span>
        <span name="label" @click="chooseLabel">公司</span>
        <span name="label" @click="chooseLabel">学校</span>
        <span name="label" @click="chooseLabel">通常</span>
      </div>
    </section>
    <div @click="submit" class="submit">新增地址</div>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
export default {
  data() {
    return {
      middle_title: "新增地址",
      userInfo: "",
      name: "",
      address: "",
      detailAddress: "",
      phone: "",
      alterPhone: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    back() {
      this.$router.back();
    },
    jumpToSearch() {
      this.$router.push("/home/newAddress");
    },
    checkPhone(phone) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
        return false; //不满足条件
      } else {
        return true; //满足条件
      }
    },
    submit() {
      if (!this.checkPhone(this.phone) || !this.checkPhone(this.alterPhone)) {
        this.$confirm("手机号码不符合规范");
      } else {
        let username = localStorage.getItem("user");
        let len = Object.keys(
          this.$store.state.User.allUsers[username].address
        ).length;
        let id = len + 1;

        let detail = {
          name: this.name,
          address: this.address,
          detailAddress: this.detailAddress,
          phone: this.phone,
          alterPhone: this.alterPhone,
          isChoose: len == 0 ? true : false,
          label: this.chooseName,
        };
        this.$store.commit("User/addAddress", { username, id, detail });
        this.$router.push("/home/address");
      }
    },
    chooseLabel(e) {
      let labelList = document.querySelectorAll("span[name=label]");
      labelList.forEach((ele) => {
        ele.setAttribute("class", "");
      });
      e.target.setAttribute("class", "choose");
    },
  },
  computed: {
    chooseName() {
      return document.querySelector("span[class=choose]").innerHTML;
    },
    jumpFrom() {
      return this.$route.query.name;
    },
  },
  created() {
    if (this.$route.query.name) {
      this.address = this.$route.query.name;
    }
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
input {
  border: none;
  background-color: #eee;
  width: 90%;
  height: 1rem;
  margin: 0.3rem;
  border-radius: 0.3rem;
  padding: 0.5rem;
  font-size: 0.6rem;
}
.addressInfo {
  padding: 0.3rem 0;
  background-color: #fff;
  margin: 0.8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.submit {
  margin-top: 0.8rem;
  background: #4cd964;
  color: #fff;
  text-align: center;
  line-height: 1.8rem;
  font-size: 0.7rem;
  cursor: pointer;
}
.label {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  span {
    margin: 0.5rem;
    font-size: 0.7rem;
    border: 1px solid #999;
    color: #999;
    border-radius: 0.4rem;
    padding: 0.3rem;
    cursor: pointer;
  }
  .choose {
    background-color: #4cd964;
    border: none;
    color: #fff;
    border: 1px solid rgba(0, 0, 0, 0);
  }
}
</style>
