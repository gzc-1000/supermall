import {debounce} from "./utils";

export const itemRefrashMixin = {
  mounted(){
    // 1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  }
}

import BackTop from 'components/content/backTop/BackTop.vue'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
  }
}
