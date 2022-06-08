<template>
  <div class="detail">
    <Header :title_middle="middle_title" :show_right="show_right">
      <div @click="back" class="el-icon-arrow-left"></div>
    </Header>
    <section class="detail_header">
      <img
        :src="'https://elm.cangdu.org/img/' + this.detail.shopInfo.image_path"
        alt=""
      />
      <Timer :initTime="fixTime(this.detail.comfirmTime)" class="time"></Timer>
      <div class="btn">再来一单</div>
    </section>
    <section class="details">
      <ul class="details_box">
        <li class="shop">
          <div class="shop_info">
            <img src="" alt="" />
            <span>商铺名称</span>
          </div>
          <div class="el-icon-arrow-right"></div>
        </li>
        <li class="item">
          <span>物品名称</span>
          <span>个数</span>
          <span>单价</span>
        </li>
        <li class="delivery">
          <span>配送费</span>
          <span>价格</span>
        </li>
        <li class="price"><span>总价</span></li>
      </ul>
    </section>
    <Card title="配送信息" :info="card_info_1"></Card>
    <Card title="订单信息" :info="card_info_2"></Card>
  </div>
</template>

<script>
import Card from "@/components/common/card.vue";
import Header from "@/components/header/index.vue";
import Timer from "@/components/common/setTime.vue";
export default {
  components: {
    Timer,
    Header,
    Card,
  },
  data() {
    return {
      middle_title: "订单详情",
      show_right: "",
      detail: {},
    };
  },
  methods: {
    initOrderDetail() {
      let username = localStorage.getItem("user");
      this.detail =
        this.$store.state.User.allUsers[username].shopList[
          this.$route.query.orderNumber
        ];
    },
    comfirmTime(time) {
      time = new Date(time);
      return time;
    },
    fixTime(comfirm) {
      let now = new Date().getTime();
      return 900000 - (now - comfirm);
    },
    back() {
      this.$router.back();
    },
  },
  created() {
    this.initOrderDetail();
  },
  computed: {
    card_info_1() {
      return {
        送达时间: "尽快发送",
        送货地址: "启达世家",
        配送方式: "蜂鸟转送",
      };
    },
    card_info_2() {
      if (this.detail == {}) {
        return {
          订单号: "1",
          支付方式: "2",
          下单时间: newTime,
        };
      } else {
        let fixTime = new Date(this.detail.comfirmTime);
        let hours = fixTime.getHours();
        let mins = fixTime.getMinutes();
        let sec = fixTime.getSeconds();
        hours = hours > 0 ? hours : "0" + String(hours);
        mins = mins > 0 ? mins : "0" + String(mins);
        sec = sec > 0 ? sec : "0" + String(sec);
        let newTime = hours + ":" + mins + ":" + sec;
        let allTime =
          fixTime.getFullYear() +
          "-" +
          fixTime.getMonth() +
          "-" +
          fixTime.getDay() +
          "   " +
          newTime;

        let orderNumber = this.detail.orderNumber;
        let payWay = this.detail.payWay;
        return {
          订单号: orderNumber,
          支付方式: payWay,
          下单时间: allTime,
        };
      }
    },
  },
};
</script>

<style lang="less" scoped>
.detail_header {
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  img {
    margin-top: 0.5rem;
    border-radius: 50%;
    border: 1px solid #3190e8;
    width: 4.5rem;
    height: 4.5rem;
  }
  .time {
    margin-top: 0.5rem;
    font-weight: 700;
    font-size: 1.2rem;
  }
  .btn {
    margin: 0.5rem 0;
    border: 1px solid #3190e8;
    border-radius: 0.3rem;
    color: #3190e8;
    text-align: center;
    padding: 0.3rem;
  }
}
.details {
  background-color: #fff;
  margin-bottom: 0.8rem;
  .details_box {
    padding: 0;
    font-size: 0.7rem;
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .shop {
      .shop_info {
        display: flex;
        justify-content: center;
        img {
          border-radius: 50%;
          padding: 0.4rem;
          width: 1.4rem;
          height: 1.4rem;
        }
        span {
          padding: 0.4rem;
          font-weight: 700;
          font-size: 1rem;
        }
      }
    }
    .item {
      display: flex;
      justify-content: space-between;
      span:nth-of-type(1) {
        padding: 0.4rem;
        flex-grow: 1;
      }
      span:nth-of-type(2) {
        padding: 0.4rem;
        color: #999;
      }
      span:nth-of-type(3) {
        padding: 0.4rem;
      }
    }
    .delivery {
      span {
        padding: 0.4rem;
      }
    }
    .price {
      justify-content: flex-end;
      span {
        font-weight: 600;
        padding: 0.4rem;
        color: #fb6b23;
      }
    }
  }
}
</style>
