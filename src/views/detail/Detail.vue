<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"  @titleClick="titleClick" ref="nav"/>
    <!--scroll必须有一个固定高度-->
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="param" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>

  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from  './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from  './childComps/DetailParamInfo'
  import DetailCommentInfo from  './childComps/DetailCommentInfo'
  import DetailBottomBar from  './childComps/DetailBottomBar'

  import {debounce} from "../../common/utils";

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail,Goods,Shop,Param,getRecommend} from 'network/detail'
  import {backTopMixin} from '../../common/mixin.js'


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: [],
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0

      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求数据
       getDetail(this.iid).then(res => {
         // console.log(res);

         //2.1 获取图片轮播
         const data = res.data.result;
         this.topImages = res.data.result.itemInfo.topImages

         //2.2 获取商品数据
         this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)
         // console.log(this.goods);

         //2.3 创建店铺信息
         this.shop = new Shop(data.shopInfo)

         //2.4 获取商品详细信息
         this.detailInfo = data.detailInfo;

         //2.5 参数信息
         this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule)

         //2.6 获取评论信息
         if(data.rate.cRate !== 0) {
           this.commentInfo = data.rate.list
         }

         // 为避免拿不到值，使用下一帧函数
         //根据最新的数据，对应的DOM是已经被渲染出来
         //但图片还没有加载完（目前获取的offsetTop不包含其中的图片）
         // this.$nextTick(() => {
         //   this.themeTopYs = []
         //
         //   this.themeTopYs.push(0);
         //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
         //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
         //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
         //
         //   console.log(this.themeTopYs);
         // })

       })

      //3 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list
      })

      //4. 给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 40)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 40)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 45)

        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },100)

    },
    updated() {

    },

    methods: {
      imgLoad() {
        this.$refs.scroll.refresh()

        this.getThemeTopY()

      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      contentScroll(position) {
        //获取y
        const positionY = -position.y

        //1.判断backtop是否显示
        this.isShowBackTop = position.y < -620;



        //和主题中的值进行对比
        //0, 15848, 16982, 17141

        //优化写法
        let length = this.themeTopYs.length
        for (let i = 0; i < length-1; i++) {
          if(this.currentIndex !== i && positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i+1]) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
       //  let length = this.themeTopYs.length
       // for (let i = 0; i < length; i++) {
       //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
       //     (i === length - 1 && positionY >= this.themeTopYs[i]) )) {
       //     this.currentIndex = i;
       //     this.$refs.nav.currentIndex = this.currentIndex
       //
       //   }
       // }


      },
      addCart() {
        // 1.获取商品信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        // 2. 将商品加入购物车
        //   this.$store.cartList.push(product)
        this.$store.dispatch('addCart',product).then(res => {
          this.$toast.show(res, 2000)
        })
      }
    }
  }
</script>
 .
<style scoped>
   #detail {
     position: relative;
     z-index: 9;
     background-color: #fff;
     height: 100vh;
   }
  .content {
    height: calc(100% - 44px - 49px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

</style>
