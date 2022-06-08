<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null,
      scroll_y: "",
    };
  },
  // 组件创建完后调用。
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: 2, // 设定为2时会在屏幕滑动的过程中实时的派发 scroll 事件；（在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测。）
      pullUpLoad: true,
    });
    this.scroll.on("scroll", (position) => {
      this.scroll_y = position;
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("upLoadMore");
    });
  },
};
</script>

<style scoped>
.wrapper {
  overflow: hidden;
  height: calc(100vh - 11rem);
}
</style>
