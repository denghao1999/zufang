<template>
   <div class="login-container">
     <!-- 导航栏 -->
    <van-nav-bar title="注册账号" class="page-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
  <van-field
    v-model="username"
    placeholder="请输入账号"
  />
  <van-field
    v-model="password"
    type="password"
    placeholder="请输入密码"
  />
  <van-field
    v-model="password"
    type="password"
    placeholder="再次请输入密码"
  />
  <div style="margin: 16px;">
    <van-button  block type="info" native-type="submit">注册</van-button>
  </div>
</van-form>

  </div>
</template>

<script>
import {UserEnroll} from '@/api/user'
export default {
    
}
</script>

<style scoped lang="less">
  .login-container{
    .page-nav-bar{
      background-color: #1cb676;
    }
    /deep/.van-nav-bar__title{
    font-size: 36px !important;
    }
    .van-icon{
      color: #fff;
    }
    .van-form{
      padding: 0 4px ;
      .van-field{
        margin-top: 5px;
      }
      /deep/.van-button--info{
        background-color: #1cb676;
        padding: none;
        border: none;
        .van-button__text{
          font-size: 36px;
        }
      }
    }
    /deep/.van-field__control{
      height: 120px;
      font-size: 34px;
    }
  }
</style>
