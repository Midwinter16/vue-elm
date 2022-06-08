<template>
  <div>
    <Header title_middle="选择城市" show_right="none" :isSign="false">
      <div @click="goback" class="el-icon-arrow-left"></div>
    </Header>
    <div class="city_list" v-for="(item, index) in cityList" :key="index">
      <div class="inital_letter">{{ index }}</div>
      <div class="city_box">
        <div
          @click="choose(subItem)"
          v-for="subItem in item"
          :key="subItem.id"
          class="city"
        >
          {{ subItem.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import { getCityList } from "@/api/index.js";

export default {
  data() {
    return {
      cityList: [],
    };
  },
  methods: {
    async initCityList() {
      const { data: res } = await getCityList("group");
      this.cityList = res;
    },
    goback() {
      this.$router.back();
    },
    choose(city) {
      this.$store.commit("alterGuessCity", city);
      this.$router.push("/location");
    },
  },
  components: {
    Header,
  },
  created() {
    this.initCityList();
  },
};
</script>

<style lang="less" scoped>
.inital_letter {
  font-size: 1rem;
  background-color: #fff;
  padding: 0.5rem;
}
.city_box {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  .city {
    box-sizing: border-box;
    width: 33.33%;
    padding: 0.5rem;
    text-align: center;
    &:hover {
      background-color: #3190e8;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
