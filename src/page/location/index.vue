<template>
  <div>
    <Search placeholder="请输入学校、商务楼、地址" searchType="City"></Search>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
import Search from "@/components/common/search.vue";

export default {
  components: {
    Header,
    Search,
  },
};
</script>

<style lang="less" scoped></style>
