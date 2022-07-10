<template>
<div>
  <div>
    <van-card
      v-for="(item, index) in myCollection"
      :key="index"
      :price="`${item.price}元/月`"
      :desc="item.desc"
      :title="item.title"
      :thumb="'http://liufusong.top:8080' + item.houseImg"
      @click="getVal(item.houseCode)"
    >
      <template #tags>
        <van-tag plain type="danger">{{ item.tags[0] }}</van-tag>
      </template>
      </van-card>
    </div>


  </div>

</template>

<script>
export default {
  props: {
    myCollection: {
      type: Array,
      required: true
    }
  },
  methods: {
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
.van-icon {
  color: #fff;
}
</style>
