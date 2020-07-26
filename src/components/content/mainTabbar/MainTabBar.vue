<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="deepPink">
      <!--非import的路径用别名前面需加~-->
      <img slot="item-icon" src="~assets/img/tabbar/首页.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/首页1.png" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/发现.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/发现1.png" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/公文包.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/公文包1.png" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="profile" activeColor="deepPink">
      <img slot="item-icon" src="~assets/img/tabbar/笑脸.png" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/笑脸1.png" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>

  </tab-bar>
</template>

<script>

  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }


</script>

<style scoped>

</style>
