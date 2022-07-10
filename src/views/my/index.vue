<template>
  <div>
    <!-- 去登录 -->
    <div class="My_title__39w3V">
      <img
        v-if="user"
        class="My_bg__2j-VX"
        src="http://liufusong.top:8080/img/avatar.png"
        alt=""
      />
      <img
        v-else
        class="My_bg__2j-VX"
        src="http://liufusong.top:8080/img/profile/bg.png"
        alt=""
      />
      <div class="My_info__eOYeg">
        <div class="My_myIcon__3cKIV" >
          <van-image v-if="user" :src="'http://liufusong.top:8080' + UserInfo.avatar" />
           <van-image v-else src="http://liufusong.top:8080/img/profile/avatar.png" />
        </div>
        <div class="My_user__B6O1D">
          <div class="My_name__3U2NB " v-if="!user">游客</div>
          <div class="My_name__3U2NB" v-else>{{ UserInfo.nickname }}</div>

          <div class="logout" v-if="user">
            <van-button type="primary" size="small" @click="outLogin">
              退出</van-button
            >
            <p class="text">编辑个人资料></p>
          </div>
          <div class="My_edit__3wqlv login">
            <van-button
              v-if="!user"
              type="primary"
              size="small"
              @click="$router.push('login')"
            >
              去登陆</van-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 功能 -->
    <van-grid :column-num="3" class="gongneng" :border="false">
      <van-grid-item @click="$router.push('/collection')">
        <van-icon name="star-o" />
        <span class="text">我的收藏</span>
      </van-grid-item>
      <van-grid-item to="/lease">
        <van-icon name="home-o" />
        <span class="text">我的出租</span>
      </van-grid-item>
      <van-grid-item to="">
        <van-icon name="clock-o" />
        <span class="text">看房记录</span>
      </van-grid-item>
      <van-grid-item to="">
        <van-icon name="idcard" />
        <span class="text">成为房主</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="contact" />
        <span class="text">个人资料</span>
      </van-grid-item>
      <van-grid-item>
        <van-icon name="service-o" />
        <span class="text">联系我们</span>
      </van-grid-item>
    </van-grid>
    <div class="banner">
      <van-image src="http://liufusong.top:8080/img/profile/join.png" />
    </div>
  </div>
</template>

<script>
import { getInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  data () {
    return {
      UserInfo: {},
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    // 点击退出登录按钮
    outLogin () {
      this.$dialog
        .confirm({
          title: "确定要退出登录吗",
        })
        .then(() => {
          // 确认退出：清除登陆状态（容器中的user+ 本地存储中的user）
          this.$store.commit("setUser", null);
        })
        .catch(() => { });
    },
    async loadUserInfo () {
      try {
        const res = await getInfo(); //
        console.log(res);
        this.UserInfo = res.data.body
      } catch (err) {
        this.$toast("用户信息加载失败");
      }
    },
  }
}
</script>

<style scoped lang="less">
.My_title__39w3V {
  min-height: 600px;
  position: relative;
  background-color: #fff;
  .My_bg__2j-VX {
    width: 100%;
    img {
      border-style: none;
    }
  }
  .My_info__eOYeg {
    position: absolute;
    background: #fff;
    width: 75%;
    height: 55%;
    bottom: 14px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px 3px #ddd;
    margin: 50px auto 0;
    padding: 0 40px;
    text-align: center;
    font-size: 26px;
    .My_myIcon__3cKIV {
      position: relative;
      transform: translateY(-50%);
      border-radius: 50%;
      width: 120px;
      height: 120px;
      border: 10px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 4px 4px #bdbdbd;
      .My_avatar__2Fbh7 {
        width: 100%;
        border-radius: 50%;
      }
      /deep/ .van-button__content {
        padding-top: 10px;
        width: 50px;
      }
      /deep/ .van-button__text {
        font-size: 16px;
      }
    }
    .My_user__B6O1D {
      padding-top: 30px;
      .My_name__3U2NB {
        margin-top: -60px;
        margin-bottom: 40px;
        /deep/.logout {
          .text {
            color: #999999;
          }
          .login{
            margin-top: 10px;
          }
        }
      }
    }
  }
}
.van-grid-item__content {
  .van-icon {
    font-size: 40px;
    margin-bottom: 14px;
  }
  span {
    font-size: 13px;
    color: #333;
  }
}
</style>
