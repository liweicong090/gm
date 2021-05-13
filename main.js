import Vue from 'vue'
import App from './App'
import uView from "uview-ui"

Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
import store from "./store/store.js"

Vue.prototype.wxlogin = function() {

	return new Promise((resolve, reject) => {
		uni.getUserProfile({
			desc: "获取用户基本信息",
			lang: "zh_CN",
			success: res => {
				uni.showLoading({
					title: "授权登陆中"
				})
				resolve(res)
			}
		})
	}).then(res => {
		return new Promise((resolve, reject) => {
			uni.login({
				provider: "weixin",
				success: (wx) => {
					resolve({
						userInfo: res.userInfo,
						code: wx.code
					})
				}
			})
		})
	}).then(res => {
		return new Promise((resolve, reject) => {
			uniCloud.callFunction({
				name: "gm_wxlogin",
				data: res,
				success: (res) => {
					if (res.result.status === 200) {
						resolve(res)
					}
				}
			})
		})
	}).then(res => {
		return new Promise((resolve,reject) => {
			uni.setStorage({
				key: "gm_user",
				data: res.result,
				success: () => {
					store.state.isLogin = true
					uni.hideLoading()
					resolve(res.result)
				}
			})
		})
	})



	// uni.getUserProfile({
	// 	desc: "获取用户基本信息",
	// 	lang: "zh_CN",
	// 	success: res => {
	// 		uni.showLoading({
	// 			title: "授权登陆中"
	// 		})
	// 		uni.login({
	// 			provider: "weixin",
	// 			success: (wx) => {
	// 				uniCloud.callFunction({
	// 					name: "gm_wxlogin",
	// 					data: {
	// 						userInfo: res.userInfo,
	// 						code: wx.code
	// 					},
	// 					success: (res) => {
	// 						if (res.result.status === 200) {
	// 							uni.setStorage({
	// 								key: "gm_user",
	// 								data: res.result,
	// 								success: () => {
	// 									uni.hideLoading()
	// 								}
	// 							})
	// 						}
	// 					}
	// 				})
	// 			}
	// 		})
	// 	}
	// })
}
Vue.prototype.$store = store
const app = new Vue({
	...App,
	store
})
app.$mount()
