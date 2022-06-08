<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  created() {
    // if (this.$router.path !== "/city") this.$router.replace("/city");
    if (localStorage.getItem("user") != null) {
      this.$store.state.isLogin = true;
    }
    localStorage.clear();
    this.$store.state.isLogin = false;
  },
};
</script>

<style lang="less">
body,
html {
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
}
</style>
