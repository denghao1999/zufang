import request from '@/utils/request'

// // 注册账号

// export const UserEnroll = params => {
//   return request({
//     url: '/user/registered',
//     methods: "GET",
//     params
//   })
// };

// 登陆账号

export const UserLogin = data => {
  return request({
    url: '/user/login',
    method: "POST",
    data
  })
}

// 获取用户信息

export const getInfo = () => {
  return request({
    url: '/user',
    method: "GET",
  })
}

// 我的收藏信息
 export const getMyCollection = ()=>{
  return request({
    url:'/user/favorites',
  })
 }
//  // 已发布房源
 export const userLeaseHouse = ()=>{
  return request({
    url:'/user/houses',
  })
 }
