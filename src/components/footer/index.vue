<template>
  <div class="footer">
    <div @click="changeIcon" name="elm" ref="elm">
      <img :src="isElmFocus ? elm_url_focus : elm_url" alt="" />
      <p :style="isElmFocus ? 'color:#109EFF' : 'color:#666'">外卖</p>
    </div>
    <div @click="changeIcon" name="search" ref="search">
      <img :src="isSearchFocus ? search_url_focus : search_url" alt="" />
      <p :style="isSearchFocus ? 'color:#109EFF' : 'color:#666'">搜索</p>
    </div>
    <div @click="changeIcon" name="order" ref="order">
      <img :src="isOrderFocus ? order_url_focus : order_url" alt="" />
      <p :style="isOrderFocus ? 'color:#109EFF' : 'color:#666'">订单</p>
    </div>
    <div @click="changeIcon" name="user" ref="user">
      <img :src="isUserFocus ? user_url_focus : user_url" alt="" />
      <p :style="isUserFocus ? 'color:#109EFF' : 'color:#666'">个人</p>
    </div>
  </div>
</template>

<script>
import elm from "@/assets/elm.png";
import elmFocus from "@/assets/elm-focus.png";
import search from "@/assets/search.png";
import searchFocus from "@/assets/search-focus.png";
import order from "@/assets/order.png";
import orderFocus from "@/assets/order-focus.png";
import user from "@/assets/user.png";
import userFocus from "@/assets/user-focus.png";

export default {
  data() {
    return {
      elm_url: elm,
      elm_url_focus: elmFocus,
      search_url: search,
      search_url_focus: searchFocus,
      order_url: order,
      order_url_focus: orderFocus,
      user_url: user,
      user_url_focus: userFocus,
      isElmFocus: false,
      isSearchFocus: false,
      isOrderFocus: false,
      isUserFocus: false,
    };
  },
  methods: {
    changeIcon(e) {
      this.isElmFocus =
        this.isSearchFocus =
        this.isOrderFocus =
        this.isUserFocus =
          false;
      const name = e.currentTarget.getAttribute("name");
      switch (name) {
        case "elm":
          this.isElmFocus = !this.isElmFocus;
          break;
        case "search":
          this.isSearchFocus = !this.isSearchFocus;
          break;
        case "user":
          this.isUserFocus = !this.isUserFocus;
          break;
        case "order":
          this.isOrderFocus = !this.isOrderFocus;
          break;
      }
      if (
        (name == "search" || name == "elm") &&
        this.$store.state.guessCity == ""
      ) {
        this.$router.push("/city");
      } else {
        this.$router.push("/home/" + name);
      }
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.isElmFocus =
          this.isSearchFocus =
          this.isOrderFocus =
          this.isUserFocus =
            false;
        let key = this.$route.name;
        switch (key) {
          case "elm":
            this.isElmFocus = !this.isElmFocus;
            break;
          case "search":
            this.isSearchFocus = !this.isSearchFocus;
            break;
          case "order":
            this.isOrderFocus = !this.isOrderFocus;
            break;
          case "user":
            this.isUserFocus = !this.isUserFocus;
            break;
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.footer {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #ffffff;
  font-size: 1rem;
  div {
    cursor: pointer;
    color: red;
    img {
      padding: 0.4rem 0 0 0;
      width: 1.1rem;
    }
    p {
      margin: 0 auto;
      color: #666;
      font-size: 0.475rem;
      text-align: center;
    }
  }
}
</style>
