import request from '@/utils/request'


// 获取房屋详情信息e

export const HouseDetails = id => {
  return request({
    url: `/houses/${id}`,
    method: 'GET',
  })
}

// 首页轮播图
export const HomeSwiper = () => {
  return request({
    url: 'home/swiper',
    method: 'GET',
  })
}

// 首页租房小组
export const HomeGroups = (area = 'AREA|88cff55c-aaa4-e2e0') => {
  return request({
    url: '/home/groups',
    method: 'GET',
    params: {
      area
    }
  })
}