import {request, request1} from './request'

export function getHomeMultiData() {
  return request1({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
