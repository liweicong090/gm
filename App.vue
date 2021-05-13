<script>
	import { mapMutations } from "vuex"
	export default {
		onLaunch: function() {
			uni.checkSession({
				success: () => {
					console.log("已登陆");
					this.SET_isLogin(true)
				},
				fail: () => {
					console.log("未登录");
					this.SET_isLogin(false)
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		
		methods:{
			...mapMutations(["SET_isLogin"])
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
</style>
