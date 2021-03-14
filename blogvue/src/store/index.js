import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters.js'

Vue.use(Vuex)

/** 状态定义 */
export const state = {
  loading: false,
  UserList: [111,222,333],
  host:"http://"+window.location.host+"/port/",
  errorImg: 'this.onerror=null;this.src="' +'"'
}

export default new Vuex.Store({
    state,
})
