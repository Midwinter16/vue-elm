<template>
  <div class="card">
    <header>{{ title }}</header>
    <div v-for="(val, key, index) in info" :key="index">
      <span>{{ `${key} : ` }}</span>
      <span>{{ val }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: "none",
      type: String,
      required: true,
    },
    info: {
      default: {
        a: "a1",
        b: "b1",
      },
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.card {
  background-color: #fff;
  margin-bottom: 0.8rem;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  color: #666;
  header {
    padding: 0.6rem;
    font-size: 1.1rem;
    color: #333;
    border-bottom: 1px solid #eee;
  }
  div {
    padding: 0.6rem;
  }
}
</style>
