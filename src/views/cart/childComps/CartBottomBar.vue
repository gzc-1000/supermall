<template>
  <div class="cart-bot-bar flex">
    <div><input type="checkbox" class="check" id="check"  >&ensp;<label for="check"> 全部</label> </div>
     <!--<check-button></check-button>-->
    <div>合计：{{totalPrice}}</div>
    <div class="calculate" @click="calaClick">去结算{{checkLength}}</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(cartList => {
          return cartList.checked
        }).reduce((preValue, cartList) => {
          return preValue + cartList.price * cartList.count
        },0).toFixed(2)
      },
      checkLength() {
        return '(' + this.$store.state.cartList.filter(cartList => cartList.checked).length + ')';
      },

    },
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      calaClick() {
        // if(!this.isSelectAll)
        // this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  .cart-bot-bar {
    position: fixed;
    bottom: 49px;
    left:0;
    right: 0;
    height: 40px;
    padding: 0 10px;
    font-size: 13px;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-bottom: 1px solid #ececec;
    border-top: 1px solid #ececec;
    .check {
      width: 18px;
      height: 18px;
      overflow: hidden;
      border-radius: 100%;
      vertical-align: bottom;
      border: 1px solid #ececec;
    }
    .check:checked {
      border: 1px solid var(----color-high-text);
      background: url(~assets/img/detail/check_active.png) no-repeat center;
      background-size: cover;
    }

  }

  .calculate {
    background-color: red;
    color: #fff;

    width: 100px;
    /*height: 20px;*/
    text-align: center;
    padding-top:15px;
    padding-bottom:15px;


  }
</style>
