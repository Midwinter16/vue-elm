<template>
  <div class="rating">
    <div class="star">
      <div class="stars">
        <img v-for="i in 5" :key="i" src="@/assets/star.png" alt="" />
      </div>
      <div class="l_stars" :style="'width:' + (rating / 5) * 100 + '%'">
        <img v-for="i in 5" :key="i" src="@/assets/star-light.png" alt="" />
      </div>
    </div>
    <div class="score">{{ rating }}</div>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 0,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.rating {
  display: flex;
  .star {
    position: relative;
    top: 0.25rem;
    .stars,
    .l_stars {
      position: relative;
      display: flex;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
    .l_stars {
      top: -0.5rem;
      overflow: hidden;
    }
  }
  .score {
    margin-left: 0.2rem;
    font-size: 0.65rem;
    color: #ff6000;
    text-align: center;
    line-height: 1rem;
  }
}
</style>
