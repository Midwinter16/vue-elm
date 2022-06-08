<template>
  <div>
    <router-view></router-view>
    <Footer v-if="isShow" class="bottomComp"></Footer>
  </div>
</template>

<script>
import Footer from "../footer/index";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      isShow: true,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        switch (this.$route.name) {
          case "elm":
          case "search":
          case "order":
          case "user":
            this.isShow = true;
            break;
          default:
            this.isShow = false;
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.bottomComp {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0;
}
</style>
