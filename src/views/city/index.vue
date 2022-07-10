<template>
  <div class="city-container">
    <!-- 导航栏 -->
    <van-nav-bar title="城市列表" class="page-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 列表 -->
    <van-index-bar :index-list="indexList">
      <!-- 当前城市 -->
      <van-index-anchor index="#">当前城市</van-index-anchor>
      <van-cell :title="this.city ? city.label : '北京'" />
      <!-- 热门城市 -->
      <van-index-anchor index="热">热门城市</van-index-anchor>
      <van-cell
        :title="hot.label"
        v-for="(hot, index) in hotCity"
        :key="index"
         @click="change(hot)"
      />
      <!-- 按首字母排序城市 -->
     <div v-for="(items, index) in allCityName" :key="index">
        <van-index-anchor :index="items">{{ items }}</van-index-anchor>
        <van-cell
          :title="item.label"
          v-for="(item, index) in myCity[items]"
          :key="index"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityList, hotCityList } from '@/api/city'
import { mapState} from 'vuex'
export default {
  name: 'City',
  data () {
    return {
      indexList: [],
      hotCity: [],
      allCity: [],
      allCityName: [],
      myCity: {}
    }
  },
  created () {
    // console.log(this.city);
    this.onCityList()

  },
  methods: {
    //
    async onCityList () {
      //  获取所有城市列表
      try {
        //    this.$toast.loading({
        //   message: '加载中...',
        //   forbidClick: true,
        //   duration: 0
        // })
        const res = await getCityList('1')
        console.log(res);
        this.allCity = res.data.body
        res.data.body.forEach(item => {
          // 遍历所有的数据 res1 获取所有数据的首字母并将首字母转大写
          const res1 = item.pinyin.charAt(0).toUpperCase()
          // z在indexList中
          const res2 = this.indexList.find(item => item === res1)
          // console.log(res1);
          // console.log(res2);
          if (!res2) {
            this.indexList.push(res1)
            this.indexList.sort()  // 将首字母排序
            this.allCityName.push(res1)
            this.allCityName.sort()
            this.myCity[res1] = this.allCity.filter(item => item.pinyin.charAt(0).toUpperCase() === res1)
          }
        })

        this.indexList.unshift('#', '热')

        this.$toast.success({
          message: '加载成功'
        })
        console.log(this.myCity);
      } catch (err) {
        console.log(err);
      }
      this.allCity = {...this.allCity }
      console.log(this.indexList);
      console.log(this.allCityName);
      console.log(this.myCity);
      //  获取热门城市列表
      try {
        const res = await hotCityList()
        console.log(res);
        //
        this.hotCity = res.data.body
      } catch (err) {
        console.log(err);
      }
    },
     change(item){
      this.$store.commit('setCity',item)
      this.$router.push('/home')
    }
   },

    computed:{
      ...mapState(['city'])
    }

  }
</script>

<style scoped lang="less">
.city-container {
  .page-nav-bar {
    background-color: #1cb676;
  }
  /deep/.van-nav-bar__title {
    font-size: 36px !important;
  }
  .van-icon {
    color: #fff;
  }
}
</style>