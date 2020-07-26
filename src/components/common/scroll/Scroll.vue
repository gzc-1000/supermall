<template>
  <div class="wrapper" ref="wrapper">
   <div class="content">
     <slot></slot>
   </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
      // console.log(this.scroll);

      //3.监听滚动到底部事件
   if(this.pullUpLoad) {
     this.scroll.on('pullingUp', () => {
       this.$emit('pullingUp')
     })
   }


    },
    methods: {
      scrollTo(x, y, time=300) {
        //判断有没有值
       this.scroll && this.scrollTo
       && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        //调用次数
        // console.log('调用图片次数----');
        // 图片移动bug
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
