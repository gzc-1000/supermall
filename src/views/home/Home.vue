<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 class="tab-control2"
                 ref="tabControl2"
                  v-show="isFixed"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
             :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   class="tab-control1"
                    ref="tabControl"></tab-control>
      <goods-list :goods='showGoods'></goods-list>
    </scroll>
    <!--组件的原生事件不能直接监听，需要native属性-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from  'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from  'components/content/backTop/BackTop'

  import {getHomeMultiData, getHomeGoods } from "network/home"
  import {debounce} from 'common/utils'
  import {itemRefrashMixin} from 'common/mixin'

  export default
  {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      GoodsList,
      TabControl,
      Scroll,
      BackTop
    },
    mixins: [itemRefrashMixin],
    data() {
      return {
        // result: null
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
     this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //1. 保存y值
        this.saveY = this.$refs.scroll.scroll.y

      //2. 取消全局事件的监听
      // this.$bus.$off('itemImgLoad')

    },

    created() {
      //1.请求多个数据
      this.getHomeMultiData()

      //2.请求商品数据
      // getHomeGoods('new', 1).then(res => {
      //   console.log(res);
      // })
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // // 1.图片加载完成的事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 200)
      // this.$bus.$on('itemImageLoad', () => {
      //   refresh()
      // })


      //3.监听item中图片加载完成
      // this.$bus.$on('itemImageLoad', () =>{
      //   this.$refs.scroll.refresh()
      // })
    },

    methods: {

      //网络请求相关的方法
      getHomeMultiData() {
        getHomeMultiData().then(res => {
          //create运行完res会被回收
          //将数据存储下来
          // this.result = res;
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.data.list);//将数值保存在list中
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp()
        })
      },

      //事件监听相关的方法

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },
      backClick() {
    //  scrollTo(x, y, 时间)_
    this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        //1.判断backtop是否显示
        this.isShowBackTop = position.y < -620;

        //2.决定tabControl是否吸顶（position:fixed)
        this.isFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        console.log('下拉加载');
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 2.获取tabControl的offsetTop
        // 所有组件都有一个属性$el:用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      }


    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
  }
 .home-nav {
   background-color: var(--color-high-text);
   color:#fff;

   /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
   /*position: fixed;*/
   /*left: 0;*/
   /*right: 0;*/
   /*top: 0;*/
   /*z-index: 9;*/
 }
  /*.tab-control1 {*/
    /*!*兼容性不高，滚动固定*!*/
    /*!*position: sticky;*!*/
    /*!*top: 44px;*!*/
    /*!*z-index: 9;*!*/
  /*}*/

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control2 {
    top: -1px;
    position: relative;
    z-index: 9;
  }

  /*.fixed {*/
     /*position: fixed;*/
     /*left: 0;*/
     /*right: 0;*/
     /*top: 44px;*/
   /*}*/

  /*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/
</style>


<!-- 将一个数组里的值传到另一个数组 -->
<!-- totalNums.push(...num1)-->
