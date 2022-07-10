<template>
  <div class="Lease-container">
    <!-- 导航栏 -->
    <van-nav-bar title="房屋管理" class="page-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <div v-if="this.LeaseHouseList.length >= 1">
       <van-card
        @click="getVal(item.houseCode)"
      v-for="(item,index) in LeaseHouseList" :key="index"
      :price="`${item.price}元/月`"
      :desc="item.desc"
      :title="item.title"
      :thumb="'http://liufusong.top:8080' +item.houseImg"
    >
      <template #tags>
        <van-tag plain type="danger">近地铁</van-tag>
      </template>
    </van-card>
    </div>


    <!-- 无房源信息 去发布 -->
      <div v-else >
    <template  >
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
      >
        <div slot="description">你是谁<a href="">去发布房源</a>~</div>
      </van-empty>
    </template >
      </div>
  </div>
</template>

<script>
import { userLeaseHouse } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name:'Lease',
  data () {
    return {
      LeaseHouseList:[] // 发布房源列表
    }
  },
  computed:{
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.userLeaseHouseAPI()
    }
  },
  methods: {
    async userLeaseHouseAPI(){
      try {
          const res = await userLeaseHouse()
          console.log(res);
          this.LeaseHouseList = res.data.body
      } catch (err) {
        console.log(err);
      }
    },
    // 跳转到详情页
     getVal (code) {
      console.log(code);
      this.$router.push({
        path: '/housedetails',
        query: {
          name: code
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.Lease-container {
  .page-nav-bar {
    background-color: #1cb676;
    margin-bottom: 100px;
  }
  /deep/.van-nav-bar__title {
    font-size: 36px !important;
  }
  .van-icon {
    color: #fff;
  }
}
</style>
