<template>
<div class="cart-list">
  <scroll class="content" ref="scroll">
  <cart-list-item v-for="(item, index) in cartList"
                  :key="index"
                  :cartList="item"></cart-list-item>
  </scroll>
  <cart-bottom-bar></cart-bottom-bar>
</div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CartListItem from './CartListItem'
  import CartBottomBar from  './CartBottomBar'


  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem,
      CartBottomBar
    },
    computed: {
      cartList() {
        return this.$store.getters.cartList
      }
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px );
  }

 .content {
   height: 100% ;
   overflow: hidden;
 }
</style>
