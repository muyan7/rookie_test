// 161.4捞取登录与注测数据
import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout
} from '../../api'
// 165.2 获取token文件
import { getToken, setToken,removeToken } from '../../utils/token'
const state = {
  code: '',
  token: getToken(),
  userInfo: {},
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 165.3清除本地数据
  CLEAR(state) {
    state.token=''
    state.userInfo = {}
    removeToken()
  }
}
const actions = {
  // 161.6获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    // console.log(result);
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 162.2用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    // console.log(result)
    // 162.4
    if (result.code === 200) return 'ok'
    else return Promise.reject(new Error('failed'))
  },
  // 163.1登录
  async userLogin({ commit }, data) {
    // 163.2里面有用户的唯一token
    let result = await reqUserLogin(data)
    // console.log(result)
    // 163.4拿到用户信息。三连环
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      // 165持久化存储token。存入一个专门放token的文件里。165.3获取token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  // 164.1获取用户信息
  async getUserInfo({ commit }) {
    // 164.2在home里面派发请求，一登陆跳转就显示在主页的左上角
    const result = await reqUserInfo()
    // console.log(result);
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  //165.2退出登录
  async userLogout({commit}) {
    const result = await reqLogout()
    // 注意：action里面不能操作state。要提交mutations去修改
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    }else {
      return Promise.reject(new Error('failed'))
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters,
}
