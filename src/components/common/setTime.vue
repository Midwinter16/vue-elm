<template>
  <div class="countTime">
    <div v-if="!timeOut">{{ `00 : ${min} : ${sec}` }}</div>
    <div v-else>支付超时</div>
  </div>
</template>

<script>
export default {
  props: {
    initTime: {
      default: 900000,
      type: Number,
    },
  },
  data() {
    return {
      time: Math.floor(this.initTime / 1000),
      timeOut: false,
    };
  },
  methods: {
    setTimer() {
      this.timer = setInterval(() => {
        if (this.time-- == 0) {
          this.timeOut = true;
          clearInterval(this.timer);
        }
      }, 1000);
    },
  },
  computed: {
    min() {
      let min = Math.floor(this.time / 60);
      return min < 10 ? "0" + String(min) : min;
    },
    sec() {
      let sec = this.time % 60;
      return sec < 10 ? "0" + String(sec) : sec;
    },
  },
  mounted() {
    this.setTimer();
  },
};
</script>

<style lang="less" scoped>
.countTime {
  div {
    text-align: center;
  }
}
</style>
