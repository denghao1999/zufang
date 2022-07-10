import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from "@/utils/stroger";
Vue.use(Vuex)
const CITY_KEY = "ZHUFANG_CITY"
const TOKEN_KEY = "ZUFANG_USER";
const HOUSE_KEY = "ZHUFANG_HOUSE"
const MAPLIST_KEY = "ZUFANG_MAPLIST"
export default new Vuex.Store({
  state: {
    // 一个对象存储当前登陆用户信息 （token等数据）
    user: getItem(TOKEN_KEY),
    city: getItem(CITY_KEY),
    setHouse: getItem(HOUSE_KEY),
    setMapList: getItem(MAPLIST_KEY)
  },
  getters: {},
  mutations: {
    setUser (state, data) {
      console.log(data);
      state.user = data;
      // 为了防止刷新数据丢失 我们需要把数据备份到本地存储中
      setItem(TOKEN_KEY, state.user);
    },
    setCity (state, data) {
      console.log(data);
      state.city = data
      setItem(CITY_KEY, state.city);
    },
    setHouse (state, data) {
      console.log(data);
      state.setHouse = data
      setItem(HOUSE_KEY, state.setHouse);
    },
    setMapList (state, data) {
      console.log(data);
      state.setMapList = data
      setItem(MAPLIST_KEY, state.setMapList);
    }
  },
  actions: {},
  modules: {},
});
