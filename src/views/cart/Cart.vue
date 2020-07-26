<template>
<div class="cart">
<nav-bar class="nav-bar">
  <div slot="center">购物车({{cartLength}})</div>
</nav-bar>
  <cart-list></cart-list>
</div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from 'views/cart/childComps/CartList'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList
    },
    computed: {
      cartLength() {
       return this.$store.getters.cartLength
      }
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
   background-color: var(--color-high-text);
   color: #fff;
   /*font-weight: bold;*/
 }
</style>
