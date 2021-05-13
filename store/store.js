import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		isLogin:false,
		address:{},
		bill:{},
		copumID:{
			ID:-1
		}
	},
	actions:{},
	mutations:{
		SET_isLogin(state,payload){
			state.isLogin = payload
		},
		
		SET_address(state,payload){
			state.address = payload
		},
		
		SET_bill(state,payload){
			state.bill = payload
		},
		
		SET_copumID(state,payload){
			state.copumID = payload
		},
	}
})

export default store