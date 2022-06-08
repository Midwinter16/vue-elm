<template>
  <div class="orderExtra">
    <Header :title_middle="middle_title" :show_right="show_right">
      <div @click="back" class="el-icon-arrow-left"></div>
    </Header>
    <!-- 快速备注 -->
    <section class="fast_note_main">
      <p>快速备注</p>
      <p class="reset" @click="reset">重置选择</p>
      <div class="fast_note">
        <div class="note_item">
          <span>不要辣</span>
          <span>少点辣</span>
          <span>多点辣</span>
        </div>
        <div class="note_item">
          <span>不要香菜</span>
        </div>
        <div class="note_item">
          <span>不要洋葱</span>
        </div>
        <div class="note_item">
          <span>多点醋</span>
        </div>
        <div class="note_item">
          <span>多点葱</span>
        </div>
        <div class="note_item">
          <span>去冰</span>
          <span>少冰</span>
        </div>
      </div>
    </section>
    <!-- 其他备注 -->
    <section class="other_note">
      <p>其他备注</p>
      <textarea
        placeholder="请输入备注，也可以不输入"
        class="notearea"
      ></textarea>
    </section>
    <section class="box">
      <div @click="submit" class="submit" type="primary">确认</div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/header/index.vue";
export default {
  data() {
    return {
      middle_title: "订单备注",
      show_right: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    reset() {
      document.querySelectorAll("span").forEach((ele) => {
        ele.setAttribute("class", "");
      });
    },
    back() {
      this.$router.back();
    },
    submit() {
      let note = document.querySelectorAll("span[class=choose]");
      let arr = [];
      note.forEach((ele) => {
        arr.push(ele.innerHTML);
      });
      if (document.querySelector("[class=notearea]").value != "") {
        arr.push(document.querySelector("[class=notearea]").value);
      }

      this.$store.commit("alterNote", arr.join(","));
      this.$router.push({
        path: "/home/shopCart",
        query: {
          shopId: this.$store.state.shopId,
          geohash: this.$store.state.geohash,
        },
      });
    },
  },
  mounted() {
    //   选定备注的方法
    let spanList = document.querySelectorAll("span");
    spanList.forEach((ele) => {
      ele.addEventListener("click", () => {
        ele.parentNode.childNodes.forEach((item) => {
          item.setAttribute("class", "");
        });
        ele.setAttribute("class", "choose");
      });
    });
  },
};
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.fast_note_main {
  margin-top: 0.8rem;
  background-color: #fff;
  padding: 0.8rem;
  font-size: 0.8rem;
  .reset {
    background-color: #3190e8;
    color: #fff;
    padding: 0.3rem;
    font-size: 0.6rem;
    border-radius: 0.3rem;
    cursor: pointer;
  }
  & > p {
    display: inline-block;
    margin: 0.3rem 0.3rem 0 0;
  }
  .fast_note {
    display: flex;
    flex-wrap: wrap;
    .note_item {
      overflow: hidden;
      color: #333;
      cursor: pointer;
      margin: 0.5rem;
      border-radius: 0.3rem;
      border: 1px solid #3190e8;
      span {
        display: inline-block;
        padding: 0.3rem 0.5rem;
        border-right: 1px solid #3190e8;
      }
      span:last-child {
        border: none;
      }
      .choose {
        background-color: #3190e8;
        color: #fff;
      }
    }
  }
}
.other_note {
  background-color: #fff;
  margin-top: 0.8rem;
  padding: 0.8rem;
  p {
    display: inline-block;
    margin: 0 0 0.54rem 0;
    font-size: 0.7rem;
  }
  .notearea {
    padding: 0.6rem;
    display: block;
    border: none;
    resize: none;
    border-radius: 0.5rem;
    background-color: #eee;
    width: 100%;
    height: 5rem;
    font-size: 0.6rem;
    box-sizing: border-box;
  }
  .notearea:focus {
    border: none;
  }
}
.box {
  width: 100%;
  .submit {
    cursor: pointer;
    display: block;
    margin: 0 auto;
    height: 2rem;
    width: 80%;
    background-color: #4cd964;
    color: #fff;
    font-size: 0.7rem;
    font-weight: 600;
    text-align: center;
    line-height: 2rem;
  }
}
</style>
