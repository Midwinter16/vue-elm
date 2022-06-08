<template>
  <div>
    <Header title_left="高仿饿了么" show_right="" :isSign="true"></Header>
    <div class="city_main">
      <div class="local_city">
        <div class="desc">
          <p>当前定位城市：</p>
          <p>定位不准时，请在城市列表中选择</p>
        </div>
        <div class="city_list" @click="selectCity">
          <div>{{ guessCity }}</div>
          <div class="el-icon-arrow-right"></div>
        </div>
      </div>
      <div class="hot_city">
        <div class="hot_title">热门城市</div>
        <div class="hot_list">
          <div
            @click="choose(item)"
            class="hot_item"
            v-for="item in hotCityList"
            :key="item.id"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCityList } from "@/api/index.js";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default {
  name: "city",
  data() {
    return {
      hotCityList: [],
    };
  },
  methods: {
    selectCity() {
      this.$router.push("/selectcity");
    },
    async initCityList(type) {
      const { data: res } = await getCityList(type);
      if (type === "guess") {
        this.$store.commit("alterGuessCity", res);
      } else {
        this.hotCityList = res;
      }
    },
    choose(city) {
      this.$store.commit("alterGuessCity", city);
      this.$router.push("/location");
    },
  },
  computed: {
    guessCity: {
      get() {
        return this.$store.state.guessCity.name;
      },
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  created() {
    this.initCityList("hot");
    this.initCityList("guess");
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="less" scoped>
.city_main {
  .local_city {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    margin: 0 0 0.652rem 0;
    .desc {
      padding: 0.5rem;
      border-bottom: 1px solid #e4e4e4;
      font-size: 0.475rem;
      display: flex;
      justify-content: space-between;
      :nth-child(1) {
        color: #666;
      }
      :nth-child(2) {
        font-weight: 900;
        color: #9f9f9f;
      }
    }
    .city_list {
      cursor: pointer;
      padding: 0.5rem;
      display: flex;
      justify-content: space-between;
    }
    &:first-child {
      color: #3190e8;
      font-size: 0.875rem;
    }
  }
  .hot_city {
    background-color: #fff;
    font-size: 0.875rem;
    .hot_title {
      padding: 0.5rem;
      color: #666;
      border-bottom: 1px solid #e4e4e4;
    }
    .hot_list {
      display: grid;
      grid-template-columns: repeat(4, 25%);
      grid-template-rows: repeat(2, 50%);
      .hot_item {
        border-right: 1px solid #e4e4e4;
        border-bottom: 1px solid #e4e4e4;
        line-height: 0.875rem;
        text-align: center;
        color: #3190e8;
        padding: 0.5rem;
        &:hover {
          cursor: pointer;
          background-color: #3190e8;
          color: #fff;
        }
      }
    }
  }
}
</style>
