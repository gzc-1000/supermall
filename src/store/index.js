 import Vue from 'vue'
 import Vuex from 'vuex'


 Vue.use(Vuex)

 const store = new Vuex.Store({
   state: {
    cartList: []
   },
   mutations: {
     //mutations唯一的目的是修改state中的状态
     //每个方法尽可能完成的事件比较单一一点
     addCounter(state, payload) {
      payload.count++
     },
     addToCart(state, payload) {
       payload.checked = true;
       state.cartList.push(payload)
     }
   },
   actions: {
     addCart(context, payload) {
       return new Promise((resolve, reject) => {
         let oldproduct = context.state.cartList.find(function (item) {
           return item.iid === payload.iid
         })
         if(oldproduct) {
           // oldProduct.count += 1
           context.commit('addCounter', oldproduct)
           resolve('当前商品+1')
         }else {
           payload.count = 1;
           payload.checked = true;
           context.commit('addToCart', payload)
           // context.state.cartList.push(payload)
           resolve('添加新商品')

         }
       })
     }
   },
   getters: {
     cartLength(state){
       return state.cartList.length
     },
     cartList(state) {
       return state.cartList
     }
   }
 })

 export default store
