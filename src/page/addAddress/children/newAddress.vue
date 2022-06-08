<template>
  <div>
    <Search
      placeholder="请输入详细的地址"
      :isLocal="isLocal"
      searchType="City"
    ></Search>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
import Search from "@/components/common/search.vue";

export default {
  data() {
    return {
      isLocal: true,
    };
  },
  components: {
    Header,
    Search,
  },
};
</script>

<style lang="less" scoped></style>
