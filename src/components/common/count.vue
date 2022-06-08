<template>
  <div class="main">
    <div v-if="isShow" @click="sub_shop_car" class="btn sub">-</div>
    <div v-if="isShow" class="count">{{ count }}</div>
    <div @click="add_shop_car" class="btn add">+</div>
  </div>
</template>

<script>
export default {
  props: {
    food_info: {
      default: {},
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    // 增删购物车信息
    add_shop_car() {
      this.count++;
      this.$store.commit("add_shop_car", [this.food_info, this.count]);
    },
    sub_shop_car() {
      if (this.count > 0) {
        this.count--;
      }
      this.$store.commit("sub_shop_car", [this.food_info, this.count]);
    },
    // 取得计数组件值
    initCount() {
      let result = Object.keys(this.$store.state.shopCarList).some((ele) => {
        if (this.food_id == ele) {
          this.count = this.$store.state.shopCarList[this.food_id].count;
          return true;
        }
      });
      // 判断，因为这里是使用keys遍历得到的count值，所以如果没有找到对应的ID，result可以接收到false以便将值修改成为0
      if (!result) {
        this.count = 0;
      }
    },
  },
  computed: {
    // 控制购物车红点
    isShow: {
      get() {
        return this.count;
      },
    },
    food_id: {
      get() {
        return this.food_info.specfoods[0].food_id;
      },
    },
    // 监听vuex中的数据变化
    watch_shop: {
      get() {
        return this.$store.state.shopCarList.all_count;
      },
    },
  },
  watch: {
    watch_shop: {
      immediate: true,
      handler() {
        this.initCount();
      },
    },
  },
};
</script>

<style lang="less" scpoed>
.main {
  display: flex;
  div {
    align-self: center;
  }
  .btn {
    color: #fff;
    width: 0.7rem;
    height: 0.7rem;
    line-height: 0.7rem;
    text-align: center;
    border-radius: 50%;
    background-color: #3190e8;
    cursor: pointer;
  }
  .count {
    padding: 0 0.3rem;
  }
}
</style>
