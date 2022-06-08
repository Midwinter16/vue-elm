<template>
  <div class="search_box">
    <Header :title_middle="title" show_right="">
      <div
        v-if="this.searchType === 'City'"
        @click="back"
        class="el-icon-arrow-left"
      ></div>
    </Header>
    <div class="location_main">
      <div class="address">
        <input ref="input" :placeholder="placeholder" type="text" />
        <el-button @click="search" type="primary">提交</el-button>
      </div>
      <div class="city_list">
        <p v-if="this.showHistory">搜索历史</p>
        <div
          v-for="item in isHistoryList"
          :key="item.id"
          class="city_list_item"
          @click="choose(item)"
        >
          <div class="shop_name">{{ item.name }}</div>
          <div class="shop_address">{{ item.address }}</div>
        </div>
        <div v-if="hasHistoryList" @click="reset" class="reset">清空所有</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
import { searchAddress, searchShop } from "@/api/index.js";

export default {
  props: {
    placeholder: {
      default: "请输入要搜索的店铺名称",
      type: String,
      required: false,
    },
    searchType: {
      default: "Shop", // City or Shop or Address
      type: String,
      required: false,
    },
    isLocal: {
      default: false,
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      searchCityList: [],
      searchShopList: [],
      showHistory: true,
      dialogVisible: false,
    };
  },
  components: {
    Header,
  },
  methods: {
    handleClose(done) {
      this.$confirm("请在输入框输入内容")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    back() {
      this.$router.back();
    },
    reset() {
      this.$store.commit(`reset${this.searchType}HistoryList`);
    },
    async search() {
      const keyword = this.$refs.input.value;
      this.$refs.input.value = "";
      if (keyword == "") {
        this.handleClose();
        return;
      }
      if (this.searchType === "City") {
        const id = this.$store.state.guessCity.id;
        const { data: res } = await searchAddress(id, keyword);
        this.searchCityList = res;
      } else if (this.searchType === "Shop") {
        const geohash = this.geohash;
        this.$store.commit("alterGeohash", geohash);
        const { data: res } = await searchShop(geohash, keyword);
        this.searchShopList = res;
      }
      this.showHistory = !this.showHistory;
    },

    choose(item) {
      if (!this.showHistory) {
        this.$store.commit(`alter${this.searchType}HistoryList`, item);
      }
      // if (this.searchType === "City") {
      //   this.$store.commit("alterAddress", item.name);
      //   this.$store.commit("alterLongitude", item.longitude);
      //   this.$store.commit("alterLatitude", item.latitude);
      //   this.$router.push("/home/elm");
      // } else {

      // }
      switch (this.searchType) {
        case "City":
          this.$store.commit("alterAddress", item.name);
          this.$store.commit("alterLongitude", item.longitude);
          this.$store.commit("alterLatitude", item.latitude);
          if (this.isLocal) {
            this.$router.push({
              path: "/home/addAddress",
              query: {
                name: item.name,
              },
            });
          } else {
            this.$router.push("/home/elm");
          }
          break;
        case "Shop":
          this.$store.commit("alterShopId", item.id);
          this.$router.push({
            path: "/home/shop",
            query: {
              shopId: item.id,
            },
          });
        default:
          break;
      }
    },
  },
  computed: {
    geohash: {
      get() {
        return `${this.$store.state.latitude},${this.$store.state.longitude}`;
      },
    },
    cityHistoryList: {
      get() {
        return this.$store.state.cityHistoryList;
      },
    },
    shopHistoryList: {
      get() {
        return this.$store.state.shopHistoryList;
      },
    },
    title: {
      get() {
        if (this.searchType === "City") {
          return this.$store.state.guessCity.name;
        } else if (this.isLocal) {
          return "选择地址";
        } else {
          return "搜索";
        }
      },
    },
    isHistoryList: {
      get() {
        if (this.searchType === "City") {
          return this.showHistory ? this.cityHistoryList : this.searchCityList;
        } else {
          return this.showHistory ? this.shopHistoryList : this.searchShopList;
        }
      },
    },
    hasHistoryList: {
      get() {
        return this.searchType === "City"
          ? this.showHistory && this.cityHistoryList.length
          : this.showHistory && this.shopHistoryList.length;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.location_main {
  margin-top: 1rem;
  .address {
    border-bottom: 1px solid #e4e4e4;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    input {
      border: 1px solid #e6e6e6;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      margin: 0.4rem 0.8rem;
      padding: 0.5rem;
      &:hover,
      &:focus {
        border: 1px solid #000;
      }
    }
    .el-button {
      font-size: 0.875rem;
      margin: 0.4rem 0.8rem;
    }
  }
  .city_list {
    p {
      font-size: 0.7rem;
    }
    .reset {
      cursor: pointer;
      height: 2rem;
      background-color: #fff;
      font-size: 0.8rem;
      text-align: center;
      line-height: 2rem;
    }
    .city_list_item {
      border-bottom: 1px solid #e4e4e4;
      padding: 0.5rem;
      background-color: #fff;
      .shop_name {
        font-size: 0.875rem;
      }
      .shop_address {
        font-size: 0.625rem;
      }
    }
  }
}
.search_box {
  padding-bottom: 3rem;
}
</style>
