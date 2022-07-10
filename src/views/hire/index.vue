<template>
  <div class="hire-container">
    <!-- 导航栏 -->
    <van-nav-bar title="发布房源" class="page-nav-bar">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <van-cell size="large">
      <template #title>
        <span class="custom-title">房源信息</span>
      </template>
    </van-cell>
    <van-cell @click="toSearchShow = true" :value="this.community">
      <template #title>
        <span class="cell-name">小区名称</span>
      </template>

      <!-- <van-icon name="arrow" /> -->
    </van-cell>
    <van-cell-group>
      <van-field v-model="rent" label="租金" placeholder="请输入用户名">
        <template #extra>￥/月</template>
      </van-field>
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="measure"
        label="建筑面积"
        placeholder="请输入建筑面积"
      >
        <template #extra>㎡</template>
      </van-field>
    </van-cell-group>
    <van-cell @click="HousetypeShow = true" :value="Type">
      <template #title>
        <span class="cell-name">户型</span>
      </template>
    </van-cell>
    <van-cell @click="floorShow = true" :value="floored">
      <template #title>
        <span class="cell-name">所在楼层</span>
      </template>
    </van-cell>
    <van-cell @click="orientationShow = true" :value="isOriented">
      <template #title>
        <span class="cell-name">朝向</span>
      </template>
    </van-cell>
    <!-- 房屋标题 -->
    <van-cell size="large">
      <template #title>
        <span>房屋标题</span>
      </template>
    </van-cell>
    <van-cell-group>
      <van-field
        v-model="title"
        placeholder="请输入标题（例如:整租 小区名 2室 5000元）"
      >
      </van-field>
    </van-cell-group>
    <!-- 房屋图像 -->
    <van-cell-group>
      <van-field label="房屋图像"> </van-field>
    </van-cell-group>
    <!-- 图像 -->
    <van-uploader :after-read="afterRead" v-model="fileList" />
    <!-- 房屋配置 -->
    <van-cell-group>
      <van-field label="房屋配置"> </van-field>
    </van-cell-group>
    <!-- 房屋配置按钮 -->
    <div class="gear">
      <!-- <van-checkbox
      v-for="(item, index) in supporting"
      :key="index">
        <template #icon>
          <van-icon name="smile-o" />
          <p>
            {{ item.label }}
          </p>
        </template>
      </van-checkbox> -->
      <van-grid :column-num="5">
        <van-grid-item
          icon="photo-o"
          :text="item.label"
          v-for="(item, index) in supporting"
          :key="index"
          :class="{ active: flag }"
          @click="choose(item, index)"
        ></van-grid-item>
      </van-grid>
    </div>
    <!-- 房屋描述 -->
    <van-cell-group>
      <van-field label="房屋描述"> </van-field>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入房屋描述信息"
        show-word-limit
      />
    </van-cell-group>
    <!-- 底部按钮 -->
    <div class="foot-btn">
      <van-button class="quxiao" type="primary" color="#fff" block @click="Out"
        >取消</van-button
      >
      <van-button type="primary" block @click="Put">提交</van-button>
    </div>
    <!-- 搜索小区弹层 -->
    <van-popup
      v-model="toSearchShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-search
        v-model="village"
        shape="round"
        background="#F6F5F6"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="onCancel"
        @input="getVillage"
      >
      </van-search>
      <!-- 小区关键字联想列表 -->
      <van-cell
        v-for="(item, index) in communityName"
        :key="index"
        :title="item.communityName"
        @click="setName(item.communityName, item.community)"
      ></van-cell>
    </van-popup>

    <!-- 户型弹层 -->
    <van-popup
      v-model="HousetypeShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        show-toolbar
        title="标题"
        :columns="roomType"
        :default-index="2"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- floorShow -->
    <van-popup v-model="floorShow" position="bottom" :style="{ height: '40%' }">
      <van-picker
        show-toolbar
        title="标题"
        :columns="floor"
        :default-index="2"
        @confirm="onfloored"
    /></van-popup>
    <!-- 朝向弹层 -->
    <van-popup
      v-model="orientationShow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        show-toolbar
        title="标题"
        :columns="oriented"
        :default-index="2"
        @confirm="onisOriented"
    /></van-popup>
    <!-- 取消按钮弹层 -->
    <van-popup v-model="QuXiaoShow" round>
      <div class="Tips">
        <h4>提示</h4>
        <p>靓仔不发布了吗？</p>
        <div class="tips-btn">
          <van-button type="default" block to="/">放弃</van-button>
          <van-button type="default" block @click="QuXiaoShow = false"
            >叫我靓仔</van-button
          >
        </div>
      </div>
    </van-popup>
    <!-- 提交按钮弹层 -->
     <van-popup v-model="tijiaoShow" round>
      <div class="Tips">
        <h4>提示</h4>
        <p>发布成功喽！</p>
        <div class="tips-btn">
          <van-button type="default" block to="/find">去看看</van-button>
          <van-button type="default" block @click="QuXiaoShow = false"
            >靓仔继续发布</van-button
          >
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'
import { sendhouseinfo, gethousename, housecondition, upimg } from '@/api/house'
export default {
  name: 'Hire',
  computed: {
    ...mapState(['user', 'city']),
  },
  created () {
    this.gethouseconditionAPI()
  },
  data () {
    return {
      active: '',
      searchResult: [],
      fileList: [],
      // 所在地搜索弹层
      toSearchShow: false,
      // 朝向弹层
      orientationShow: false,
      // 户型弹层
      HousetypeShow: false,
      // 楼层弹层
      floorShow: false,
      // 取消按钮
      QuXiaoShow: false,
      tijiaoShow:false,
      // 租金
      rent: '',
      // 面积
      measure: '',
      // 房屋标题
      title: '',
      // 输入框的值
      village: '',
      // 发布 房屋配置的值
      supported: [],
      // 小区名称
      community: '请输入小区名称 ',
      // 户型
      Type: '请选择',
      Type1: '',
      // 楼层
      floored: '请选择',
      floored1: '',
      // 朝向
      isOriented: '请选择',
      isOriented1: '',
      //房屋描述
      message: '',
      //房子照片
      houseImg: [],
      // 小区名字
      communityName: [],
      // 楼层数据
      floor: [],
      floorvalue: [],
      // 朝向数据
      oriented: [],
      orientedvalue: [],
      // 户型数据
      roomType: [],
      roomTypevalue: [],
      //supporting 房屋配置
      supporting: [],
      //
      flag: false,
      community1: ''

    };
  },
  methods: {
    onSave () {
      Toast('save');
    },
    onDelete () {
      Toast('delete');
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    onCancel () {
      // 关闭搜索弹层
      this.toSearchShow = false
    },
    // 获取发布房源所需要的条件
    async gethouseconditionAPI () {
      try {
        const res = await housecondition(this.user)
        const { body } = res.data
        console.log(body);
        // 处理楼层数据
        body.floor.forEach(item => {
          this.floor.push(item.label)
          this.floorvalue.push(item.value)
        });
        // 处理户型数据
        body.roomType.forEach(item => {
          this.roomType.push(item.label)
          this.roomTypevalue.push(item.value)
        });
        // 处理朝向数据
        body.oriented.forEach(item => {
          this.oriented.push(item.label)
          this.orientedvalue.push(item.value)
        });
        // this.oriented = body.oriented
        // this.roomType = body.roomType
        this.supporting = body.supporting
        console.log(res);
        console.log(this.supporting);
        console.log(this.floorvalue);
        console.log(this.orientedvalue);
        console.log(this.roomTypevalue);

      } catch (err) {
        console.log(err);
      }
    },
    async getVillage () {
      try {
        const res = await gethousename({
          name: this.village, // 输入框的值
          id: this.city.value // 当前城市的id
        })
        console.log(res);
        this.communityName = res.data.body
      } catch (err) {
        console.log(err);
      }
    },
    // 小区名称
    setName (name, id) {
      this.community = name
      this.community1 = id
      this.toSearchShow = false
      console.log(this.community1);
    },
    // 户型Picker选择器
    onConfirm (value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.HousetypeShow = false
      this.Type = value
      // this.Type1 = this.floorvalue.forEach(item)
      this.Type1 = this.roomTypevalue[index]
      console.log(this.Type1);
    },
    // 楼层
    onfloored (value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.floorShow = false
      this.floored = value
      this.floored1 = this.floorvalue[index]
      console.log(this.floored1);
    },
    // 朝向
    onisOriented (value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.orientationShow = false
      this.isOriented = value
      this.isOriented1 = this.orientedvalue[index]
      console.log(this.isOriented1);
    },
    // 取消按钮
    Out () {
      this.QuXiaoShow = true
    },
    // 提交按钮
    async Put () {
      try {
        this.$toast.loading({
          message: '发布中...',
          forbidClick: true,
          duration: 0
        })
        const res = await sendhouseinfo({
          title: this.title,
          description: this.message,
          houseImg: this.houseImg.join(''),
          oriented: this.isOriented1,
          supporting: this.supported.join('|'),
          price: this.rent,
          roomType: this.Type1,
          size: this.measure,
          floor: this.floored1,
          community: this.community1
        })
        console.log(res);
         this.$toast.success({
          message: '发布成功，很帅哦靓仔'
        })
        this.tijiaoShow = true
      } catch (err) {
        console.log(err);
      }
    },
    // 图像上传成功回调
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      try {
        const res = await upimg(file.file)
        console.log(res);
        this.houseImg.push(res.data.body[0])
      } catch (err) {
        console.log(err);
      }
      console.log(this.houseImg);
    },
    choose (item, index) {
      // console.log(item.label);
      // console.log(index);
      this.flag = !this.flag
      this.supported.push(item.label)
      // if (!this.flag) {
      //   this.supported.splice(item.label)
      // }
      console.log(this.supported);
      // console.log(this.flag);
    }
  },
}
</script>

<style scoped lang="less">
.hire-container {
  /deep/.van-icon-arrow {
    color: #9f9f9f !important;
    font-size: 30px;
  }
  .cell-name {
    color: #666 !important;
  }
  .page-nav-bar {
    background-color: #1cb676;
  }
  /deep/.van-nav-bar__title {
    font-size: 36px !important;
  }
  .van-icon {
    color: #fff;
  }
  .custom-title {
    color: #21b97a;
    font-size: 30px;
  }
  .concent {
    margin-right: 50px;
  }
  /deep/.van-search__content {
    background-color: #fff !important;
  }
  .foot-btn {
    display: flex;
    margin-top: 40px;
  }
  .quxiao {
    color: #21b97a !important;
  }
  .Tips {
    width: 500px;
    height: 300px;
    text-align: center;
    p {
      color: red;
      margin-top: 30px;
      margin-bottom: 40px;
    }
    .tips-btn {
      display: flex;
    }
  }
  .active {
    background-color: #defaef;
    color: #21b97a;
  }
}
</style>