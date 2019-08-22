import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		loginName:window.sessionStorage.getItem("loginName"),
		userID:""
  },
  mutations: {
		setUserName(state,msg){
			window.sessionStorage.setItem("loginName",msg)
			state.loginName=window.sessionStorage.getItem("loginName");
		}
  },
  actions: {

  }
})
