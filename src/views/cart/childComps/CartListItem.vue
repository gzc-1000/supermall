<template>
  <div>
    <div class="cart-list-main flex" :key="cartList.iid">
      <div class="cart-list-left flex">
        <input type="checkbox" class="check" v-model="cartList.checked" >
        <img :src="cartList.image" alt="" class="goods-img">
      </div>
      <div class="cart-list-right">
        <div class="goods-name one-txt-cut">{{cartList.title}}</div>
        <div class="goods-desc one-txt-cut">{{cartList.desc}}</div>
        <div class="goods-info flex">
          <span class="price">￥{{cartList.price}}</span><span>x{{cartList.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartListItem",
    props: {
      cartList: {
        type: Object,
        default() {
          return {}
        }
      },

    },
    methods: {

    }
  }
</script>

<style lang="less" scoped="scoped">
  .cart-list-main {
    padding: 10px;
    border-bottom: 1px solid #ececec;
  }
  .cart-list-left {
    width: 26%;
    align-items: center;
    .check {
      width: 20px;
      height: 20px;
      overflow: hidden;
      border-radius: 100%;
      border: 1px solid #ececec;
    }
    .check:checked {
      background: url(~assets/img/detail/check_active.png) no-repeat center;
      background-size: cover;
    }
    .goods-img {
      width: 52px;
      height: 66px;
      overflow: hidden;
      border: 1px solid #ececec;
      margin:0 10px;
      border-radius: 6px;
      vertical-align: middle;
    }
  }
  .cart-list-right {
    width: 74%;
    position: relative;
    .goods-name {
      width: 100%;
      font-size: 15px;
    }
    .goods-desc {
      text-indent:5px;
      margin-top: 15px;
      width: 100%;
      font-size: 12px;
      color: #666;
    }
    .goods-info {
      justify-content: space-between;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      .price {
        color: #F9CD0B;
      }
    }
  }

  /*.item-desc {*/
    /*width: 100%;*/
    /*font-size: 12px;*/
    /*color: #666;*/
    /*margin-top: 15px;*/
    /*text-overflow:ellipsis*/
  /*}*/
</style>

