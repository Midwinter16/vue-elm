export default {
  state: {
    allUsers: {
      admin: {
        password: "123456",
        isVip: true,
        shopList: {},
        phone: "",
        address: {
          1: {
            name: "mawkish",
            address: "qidashijia",
            detailAddress: "qidashijiaA555",
            phone: "135xxxxxxxxx",
            alterPhone: "136xxxxxxxxx",
            label: "家",
            isChoose: false,
          },
          2: {
            name: "mawkish",
            address: "qidashijia",
            detailAddress: "qidashijiaA777",
            phone: "135xxxxxxxxx",
            alterPhone: "136xxxxxxxxx",
            label: "学校",
            isChoose: true,
          },
        },
      },
      normal: {
        password: "123456",
        isVip: false,
        shopList: {},
        phone: "",
        address: {},
      },
    },
  },
  mutations: {
    addUser(state, data) {
      state.allUsers[data.username] = data.info;
    },
    addShopList(state, data) {
      // username代表用户名
      // orderNumber订单num
      // detail订单详情

      state.allUsers[data.username].shopList[data.orderNumber] = data.detail;
    },
    addPayWay(state, data) {
      // username代表用户名
      // orderNumber订单num
      // pay_way支付方式
      console.log(state.allUsers[data.username]);
      state.allUsers[data.username].shopList[data.orderNumber]["payWay"] =
        data.pay_way;
    },
    deleteAddress(state, data) {
      delete state.allUsers[data.username].address[data.id];
    },
    addAddress(state, data) {
      state.allUsers[data.username].address[data.id] = data.detail;
    },
    setDefaultAddress(state, data) {
      let addressList = state.allUsers[data.username].address;
      for (let item in addressList) {
        addressList[item].isChoose = false;
      }
      addressList[data.id].isChoose = true;
    },
  },
  namespaced: true,
};
