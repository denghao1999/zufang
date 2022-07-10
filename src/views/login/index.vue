<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="账号密码" class="page-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field v-model="username" placeholder="请输入账号" maxlength="11" />
      <van-field
        v-model="password"
        type="password"
        placeholder="请输入密码"
        minlength="6"
      />
      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
      <div  class="enroll" @click="$router.push('/enroll')">还没有账号,去注册~</div>
  </div>
</template>

<script>
import { UserLogin } from '@/api/user'

export default {
  name: "LoginIndex", // 组件名字
  data () {
    return {
      username: "",
      password: "",
    }
  },
  computed:{
  },
  methods: {
    async onSubmit () {
       this.$toast.loading({
        message: "登陆中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await UserLogin(
          {
            username: this.username,
            password: this.password
          }
        )
        // console.log(res);
        this.$store.commit('setUser',res.data.body)
        this.$toast.success("登陆成功");
        //登陆成功调回原来的页面
        this.$router.back();
      } catch (err) {
        // 失败
          this.$toast.fail("登陆失败，请稍后再试");
      }
    },
  },
}
</script>

<style scoped lang="less">
.login-container {
  .page-nav-bar {
    background-color: #1cb676;
  }
  /deep/.van-nav-bar__title {
    font-size: 36px !important;
  }
  .van-icon {
    color: #fff;
  }
  .van-form {
    padding: 0 4px;
    .van-field {
      margin-top: 5px;
    }
    /deep/.van-button--info {
      background-color: #1cb676;
      padding: none;
      border: none;
      .van-button__text {
        font-size: 36px;
      }
    }
  }
  /deep/.van-field__control {
    height: 120px;
    font-size: 34px;
  }
  .enroll {
    font-size: 28px;
    color: #666666;
    text-align: center;
  }
}
</style>
