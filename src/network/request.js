import axios from 'axios'

//轮播图数据请求
export function request1(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })
  return instance(config)
}
// export function request(config){
//   const instance = axios.create({
//     baseURL: 'http://152.136.185.210:8000/api/n3',
//     timeout: 5000
//   })
//   return instance(config)
// }


//更简便的写法：
export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/n3',
      timeout: 5000
    })
  // 2.axios的拦截器
  //全局拦截
  // axios.interceptors

  //实例拦截
  //2.1 请求拦截
  instance.interceptors.request.use(config=> {
    return config
  }, err => {

  });
    // 2.2响应拦截
    instance.interceptors.response.use(res => {
      return res
    }, err => {
      // console.log(err);
    })

  // 3.发送真正的网络请求
    return instance(config)
}


