<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      loop
      indicator-color:
    >
      <van-swipe-item v-for="item in swiperList" :key="item.id">
        <a href="">
          <img :src="`http://liufusong.top:8080${item.imgSrc}`" alt=""
        /></a>
      </van-swipe-item>
    </van-swipe>
    <!-- 地址栏 -->
    <div class="dizhi-search">
      <div class="city" @click="$router.push('/city')">
        {{ city ? city.label : "北京" }}
        <van-icon name="arrow-down" />
      </div>
      <van-icon name="search" />
      <div class="search">请输入小区或地址</div>
    </div>
    <!-- 找房 -->
    <div class="BDMAP">
      <van-icon name="location-o" @click="$router.push('/map')" />
    </div>
    <div class="module">
      <van-grid>
        <van-grid-item>
          <van-icon
            class="van-icon"
            name="wap-home-o"
            @click="$router.push('/find')"
          ></van-icon>
          <p class="text">整租</p>
        </van-grid-item>
        <van-grid-item>
          <van-icon name="friends-o" @click="$router.push('/find')"></van-icon>
          <p class="text">合租</p>
        </van-grid-item>
        <van-grid-item>
          <van-icon name="location-o" @click="$router.push('/map')"></van-icon>
          <p class="text">地图找房</p>
        </van-grid-item>
        <van-grid-item>
          <van-icon name="home-o" @click="$router.push('/hire')"></van-icon>
          <p class="text">去出租</p>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 租房小组 -->
    <div class="rentList">
      <h6 class="title">
        租房小组
        <span>更多</span>
      </h6>
      <van-row class="van_row">
        <van-col v-for="(item, index) in groupList" :key="index">
          <img
            :src="`http://liufusong.top:8080${item.imgSrc}`"
            alt=""
            class="left"
          />
          <div class="right">
            <p>{{ item.title }}</p>
            <p>{{ item.desc }}</p>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { HomeSwiper, HomeGroups } from '@/api/home'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      value: '',
      swiperList: [], // 轮播图
      groupList: []
    }
  },
  computed: {
    ...mapState(['city'])
  },
  created () {
    this.HomeSwiperAPI()
    this.HomeGroupsAPI()
  },
  methods: {

    async HomeSwiperAPI () {
      // 轮播图
      try {
        const res = await HomeSwiper()
        // console.log(res);
        this.swiperList = res.data.body
      } catch (err) {
        console.log(err);
      }
    },
    async HomeGroupsAPI () {
      // 租房小组
      try {
        const res = await HomeGroups(this.city.value)
        console.log(res);
        this.groupList = res.data.body
      } catch (err) {
        console.log(err);
      }
      console.log(this.groupList);
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  position: relative;
  /deep/.van-swipe-item {
    // position: fixed;
    width: 300px;
    img {
      width: 100%;
      height: 424px;
      // margin-bottom: 30px;
    }
  }
  /deep/.BDMAP {
    position: absolute;
    right: 20px;
    top: 35px;
    color: #fff;
    font-size: 60px;
  }
  /deep/.my-swipe {
    .van-swipe__indicators {
      position: absolute;
      top: 400px;
      .van-swipe__indicator {
        background-color: red;
        width: 16px;
        height: 16px;
      }
    }
  }
  .dizhi-search {
    border-radius: 6px;
    position: absolute;
    top: 50px;
    left: 30px;

    width: 620px;
    height: 68px;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px 10px 10px 16px;
    .city {
      position: relative;
      // background-color: pink;
      width: 100px;
      height: 50px;
      font-size: 30px;
      margin-right: 20px;
      padding-bottom: 10px;
      .van-icon {
        position: absolute;
        top: 15px;
        font-size: 24px;
        color: #787d82;
      }
    }

    .van-icon {
      width: 50px;
      // padding-left: 10px;
      font-size: 30px;
      color: #787d82;
    }
    .search {
      font-size: 28px;
      color: #787d82;
      // vertical-align: middle;
    }
  }
  .module {
    .van-grid {
      border: none !important;
      /deep/.van-grid-item {
        border: none !important;
        .van-icon {
          background-color: #f2fbf7;
          border-radius: 50%;
          padding: 5px;
          width: 120px;
          height: 120px;
          text-align: center;
        }
        .van-icon-wap-home-o:before {
          font-size: 100px;
          color: #09b16b;
        }
        .van-icon-friends-o:before {
          font-size: 100px;
          color: #09b16b;
        }
        .van-icon-location-o:before {
          font-size: 100px;
          color: #09b16b;
        }
        .van-icon-home-o:before {
          font-size: 100px;
          color: #09b16b;
        }
        .text {
          color: #333333;
          font-size: 28px;
          margin: 23px 0;
        }
      }
    }
  }
 /deep/.rentList {
  padding: 0 20px;
  background-color: #f6f5f6;
  .title {
    margin: 30px 0 30px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    span {
      font-weight: normal;
      color: #787d82;
    }
  }
  .van-row {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .van-col {
      width: 345px;
      height: 120px;
      background-color: #fff;
      margin-bottom: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      text-align: left;
      .left {
        width: 100px;
        height: 100px;
        margin: 0 20px;
      }
      .right {
        font-size: 28px;
        line-height: 1.1;
        p {
          margin: 0;
        }
      }
    }
  }
  }
}
</style>
