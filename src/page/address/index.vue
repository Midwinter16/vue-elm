<template>
  <div class="address">
    <Header :title_middle="middle_title" show_right="edit"
      ><div @click="back" class="el-icon-arrow-left"></div>
    </Header>
    <section class="addressList">
      <ul class="box">
        <li
          :style="value.isChoose == true ? 'background-color:#fff8c3' : ''"
          v-for="(value, id) in addressInfo"
          :key="id"
        >
          <div>
            <span>{{ value.detailAddress }}</span>
            <span>{{ value.phone }}</span>
          </div>
          <div
            v-if="editStatus"
            @click="setDefaultAddress(id)"
            :class="
              value.isChoose == true
                ? 'el-icon-star-on set'
                : 'el-icon-star-off set'
            "
          ></div>
          <div v-if="editStatus" @click="deleteAddress(id)">X</div>
        </li>
      </ul>
    </section>
    <section @click="jumpToAddAddress" class="addAddress">
      <span>新增地址</span>
      <div class="el-icon-arrow-right"></div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
export default {
  data() {
    return {
      middle_title: "地址管理",
      userInfo: "",
      addressList: {},
    };
  },
  components: {
    Header,
  },
  methods: {
    jumpToAddAddress() {
      this.$router.push("/home/addAddress");
    },
    back() {
      if (this.jumpFrom == "user") {
        this.$router.push("/home/user");
      } else if (this.jumpFrom == "order") {
        this.$router.push({
          path: "/home/shopCart",
          query: {
            shopId: this.$store.state.shopId,
            geohash: this.$store.state.geohash,
          },
        });
      } else {
        this.$router.back();
      }
    },
    deleteAddress(id) {
      let username = localStorage.getItem("user");
      this.$store.commit("User/deleteAddress", { username, id });
      this.$forceUpdate();
    },
    setDefaultAddress(id) {
      let username = localStorage.getItem("user");
      this.$store.commit("User/setDefaultAddress", { username, id });
      this.$forceUpdate();
    },
  },
  computed: {
    addressInfo() {
      let username = localStorage.getItem("user");
      return this.$store.state.User.allUsers[username].address;
    },
    editStatus() {
      return this.$store.state.editStatus;
    },
    jumpFrom() {
      return this.$route.query.name;
    },
  },
};
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
* {
  padding: 0;
  margin: 0;
}
.addressList {
  margin: 0.8rem 0;
  background-color: #fff;
  .box {
    font-size: 0.7rem;
    li {
      padding: 0.2rem;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        padding: 0.3rem;
        display: block;
      }
      & > div:first-child {
        cursor: pointer;
        padding-right: 0.5rem;
        flex-grow: 1;
      }
      div {
        padding: 0 0.5rem;
      }
    }
    li:first-child {
      border-top: 1px solid #ddd;
    }
  }
}
.addAddress {
  padding: 0.4rem;
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  font-size: 0.8rem;
}
.set {
  cursor: pointer;
}
</style>
