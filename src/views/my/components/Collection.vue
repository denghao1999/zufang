<template>
  <div class="collection-container">
    <!-- 导航栏 -->
    <van-nav-bar title="收藏列表" class="page-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 房屋列表区域 -->
    <HomeList
    :myCollection="myCollection"
    ></HomeList>
    <!-- 房屋列表区域 -->
  </div>
</template>

<script>
import { getMyCollection } from '@/api/user'
import { mapState } from 'vuex'
import HomeList from '@/components/HomeList.vue'
export default {
  name: 'Collection',
  components: {
    HomeList
  },
  data () {
    return {
      myCollection: [],
    }
  },
  created () {
    if (this.user) {
      this.getCollection()
    }
  },
  methods: {
    async getCollection () {
      try {
        const res = await getMyCollection()
        this.myCollection = res.data.body
        console.log(res.data.body);
      } catch (err) {
        console.log(err);
      }
    },

  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.collection-container {
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
