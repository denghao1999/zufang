<template>
  <div class="HouseDetails-container">
    <!-- 导航栏 -->
    <van-nav-bar title="房屋详情" class="page-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>

    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      loop
      indicator-color:
    >
      <van-swipe-item v-for="(item,index) in houseMassage.houseImg" :key="index">
        <a href="">
          <img
            :src="'http://liufusong.top:8080'+ item"
            alt=""
        /></a>
      </van-swipe-item>
    </van-swipe>
    <div class="HouseDetail_info__w_ymp">
      <h3 class="HouseDetail_infoTitle__E1ASO">{{houseMassage.title}}</h3>
      <van-tag color="#e1f5f8" text-color="#39becd" size="medium"
        v-for="(tag,index) in houseMassage.tags" :key="index">{{tag}}</van-tag
      >
      <div class="flex">
        <van-grid :column-num="3">
          <van-grid-item :border="false">
            <div slot="text" class="price">{{houseMassage.price}}<span>/月</span></div>
            <p slot="text" class="type">租金</p>
          </van-grid-item>
          <van-grid-item>
            <p slot="text" class="price">{{houseMassage.roomType}}</p>
            <p slot="text" class="type">房型</p>
          </van-grid-item>
          <van-grid-item>
            <p slot="text" class="price">{{houseMassage.size}}<span>/平方</span></p>
            <p slot="text" class="type">面积</p>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 简介 -->
      <div class="jianjie">
        <div class="left">
          <div class="top"><span>装修: </span><span>精装</span></div>
          <div class="bottom"><span>楼层: </span><span>{{houseMassage.floor}}</span></div>
        </div>
        <div class="right">
          <div class="top"><span>朝向: </span> <span
          v-for="(oriented,index) in houseMassage.oriented" :key="index"
          >{{oriented}}</span></div>
          <div class="bottom"><span>类型: </span> <span>普通住宅</span></div>
        </div>
      </div>
    </div>
    <!-- 地址 -->
    <div class="HouseDetail_map__21q54">
      <div class="dizhi">小区: <span>{{houseMassage.community}}</span></div>
      <div class="map"></div>
    </div>
    <!-- 房屋配套 -->
    <div class="HouseDetail_about__1W1Px">
      <div class="title">房屋配套</div>
      <div class="gear">
        <van-grid :column-num="5">
          <van-grid-item
            v-for="(suppor,index) in houseMassage.supporting"
            :key="index"
            icon="photo-o"
            :text="suppor"
          />
        </van-grid>
      </div>
    </div>
    <!-- 房源概况 -->
    <div class="HouseDetail_set__26npJ">
      <div class="title">房源概况</div>
      <div class="introduce">
        <div class="on">
          <div class="pic">
            <img
              src="../assets/u=3090102124,1784189229&fm=253&fmt=auto&app=138&f=JPEG.webp"
              alt=""
            />
          </div>
          <div class="username">
            <div class="text">王女士</div>
            <van-icon name="certificate" class="icon-house">
              已认证房主
            </van-icon>
          </div>
          <div class="information">
            <van-button plain hairline round type="primary">发消息</van-button>
          </div>
        </div>
        <div class="down">12124124</div>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="HouseDetail_recommend__1L7WT">
      <div class="title">猜你喜欢</div>
      <van-card
      v-for="(item,index) in youLike"
        :key="index"
        :price="item.price +'元/月'"
        :desc="item.desc"
        :title="item.title"
        :thumb="item.src"
      >
        <template #tags>
          <van-tag plain type="danger">{{item.targe}}</van-tag>
        </template>
      </van-card>
    </div>
    <!-- 底部 固定定位 -->
    <div
      class="am-flexbox HouseDetail_fixedBottom__3qos1 am-flexbox-align-center"
    >
      <div class="btn">
        <van-icon name="star-o" color="#999999" />
        收藏
      </div>
      <div class="btn">在线咨询</div>
      <div class="btn phone">电话预约</div>
    </div>
  </div>
</template>

<script>

import { HouseDetails } from '@/api/home'
export default {
  data () {
    return {
      houseMassage:{},
      youLike:[
        {
          price:'2000',
          desc:'三室/朝南/两卫',
          title:'田园居',
          src:'../assets/u=2618126325,602096333&fm=253&fmt=auto&app=138&f=JPEG.webp',
          targe:'近地铁'
        },
        {
          price:'2000',
          desc:'三室/朝南/两卫',
          title:'田园居',
          src:'../assets/u=2618126325,602096333&fm=253&fmt=auto&app=138&f=JPEG.webp',
          targe:'近地铁'
        },
        {
          price:'2000',
          desc:'三室/朝南/两卫',
          title:'田园居',
          src:'../assets/u=2618126325,602096333&fm=253&fmt=auto&app=138&f=JPEG.webp',
          targe:'近地铁'
        }

      ]
    };
  },
  name: 'HouseDetails',
  components: {
  },
  created () {
    this.HouseDetailsAPI(this.$route.query.name)
  },
  methods: {
    async HouseDetailsAPI (code) {
      try {
        const res = await HouseDetails(code)
        console.log(res);
        this.houseMassage = res.data.body
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped lang="less">
.HouseDetails-container {
  .page-nav-bar {
    background-color: #1cb676;
  }
  /deep/.van-nav-bar__title {
    font-size: 36px !important;
  }
  .van-icon {
    color: #fff;
  }
  /deep/.van-swipe-item {
    width: 300px;
    img {
      width: 100%;
      height: 420px;
      margin-bottom: 30px;
    }
  }
  /deep/.my-swipe {
    .van-swipe__indicators {
      .van-swipe__indicator {
        background-color: red;
        width: 16px;
        height: 16px;
      }
    }
  }
  .HouseDetail_info__w_ymp {
    padding: 30px;
    background: #fff;
    .HouseDetail_infoTitle__E1ASO {
      font-weight: 400;
      font-size: 32px;
      color: #333;
      margin: 16px;
    }
    /deep/ .van-tag {
      padding: 4px 5px;
      margin-right: 5px;
    }
    .van-grid {
      margin: 15px;
      border-top: 2px solid #999999;
      border-bottom: 2px solid #999999;
      .van-grid-item {
        .price {
          font-size: 36px;
          color: #fa5741;
          font-weight: bolder;
          span {
            font-size: 28px;
            font-weight: 400;
          }
        }
        .type {
          font-size: 28px;
          color: #999999;
        }
      }
    }
    .jianjie {
      display: flex;
      justify-content: space-between;
      color: #999999;
      font-size: 26px;
      .top:nth-child(2) {
        color: #333;
      }
    }
  }
  .HouseDetail_map__21q54 {
    .dizhi {
      height: 88px;
      line-height: 88px;
      margin: 0 23px;
      font-size: 28px;
      color: #999999;
      span {
        color: #333;
      }
    }
    .map {
      width: 100%;
      height: 290px;
      background-color: pink;
    }
  }
  .HouseDetail_about__1W1Px {
    padding: 30px;

    .title {
      height: 104px;
      color: #333;
      font-size: 30px;
      line-height: 104px;
      margin-bottom: 20px;
      border-bottom: 2px solid #ccc;
    }
  }
  .HouseDetail_set__26npJ {
    padding: 30px;
    .title {
      height: 104px;
      color: #333;
      font-size: 30px;
      line-height: 104px;
      margin-bottom: 20px;
      border-bottom: 2px solid #ccc;
    }
    .introduce {
      .on {
        display: flex;
        margin: 0 0 20px;
        .pic {
          width: 104px;
          height: 104px;
          img {
            margin: 20px 20px 0 0;
          }
        }
        .username {
          width: 172px;
          padding: 15px 0 0 5px;
          margin: 10px;
          .text {
            width: 162px;
            height: 42px;
            font-size: 28px;
            color: #333333;
          }
          .icon-house {
            font-size: 24px;
            color: #fa5741;
          }
        }
        .information {
          flex: 1;
          text-align: right;
          justify-content: center;
        }
        .van-button {
          width: 150px;
          height: 60px;
          font-size: 28px;
        }
      }
    }
  }
  .HouseDetail_recommend__1L7WT {
    padding: 30px;
    .title {
      height: 104px;
      color: #333;
      font-size: 30px;
      line-height: 104px;
      margin-bottom: 20px;
      border-bottom: 2px solid #ccc;
    }
  }
  .HouseDetail_fixedBottom__3qos1 {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    line-height: 100px;
    border-top: 2px solid #cecece;
    text-align: center;
    font-size: 34px;
    color: #999;
    background-color: #fff;
    /deep/.btn {
      flex: 1;
      height: 240px;
      width: 100px;
    }
    .phone {
      background-color: #21b97a;
      z-index: 1;
      color: #fff;
    }
  }
  .am-flexbox {
    overflow: hidden;
    display: flex;
  }
}
</style>
