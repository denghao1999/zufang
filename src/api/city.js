import request from '@/utils/request'

// 获取城市列表数据
export const getCityList = (level) =>{
  return request({
    url:'/area/city',
    method:"GET",
    params:{
      level
    }
  })
}

// 获取热门城市列表数据
export const hotCityList = () =>{
  return request({
    url:'/area/hot',
    method:"GET",
  })
}