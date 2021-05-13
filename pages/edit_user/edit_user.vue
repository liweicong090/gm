<template>
	<view>
		<view class="user-img">
			<u-image shape="circle" mode="scaleToFill" width="130rpx" height="130rpx"
				:src="userInfo.avatarUrl?userInfo.avatarUrl:'https://7463-tcb-nzncjp1knbhfavcef4299-5d5ee2-1303924487.tcb.qcloud.la/default.png'">
			</u-image>
		</view>
		<view class="user-info">
			<u-field disabled v-model="userInfo.nickName" label="昵称" placeholder="请填写昵称">
			</u-field>
			<u-field v-model="userInfo.phone" label="手机" placeholder="请填写手机号码">
			</u-field>
		</view>
		<view class="" style="padding: 0 30rpx;margin: 80rpx 0;">
			<u-button shape="circle" type="warning" @click="save">保存</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				token:""
			};
		},
		
		methods:{
			save(){
				let phone = this.userInfo.phone
				const res = /^1[3-9]\d{9}$/.test(phone)
				if(!res){
					uni.showToast({
						title:"手机格式不正确",
						icon:"none",
						mask:"true",
					})
					return
				}
				uni.showLoading({
					title:"保存中"
				})
				
				uniCloud.callFunction({
					name:"gm_editUserInfo",
					data:{
						phone,
						userID: this.token
					},
					success: (res) => {
						uni.hideLoading()
						// uni.showModal({
						// 	content:"更新成功",
						// 	showCancel:false,
						// 	success: (res) => {
						// 		if(res.confirm){
						// 			console.log("确认");
						// 			uni.navigateBack({
										
						// 			})
						// 		}
						// 	}
						// })
					}
				})
			}
		},

		onShow() {
			uni.getStorage({
				key: "gm_user",
				success: (res) => {
					this.token = res.data.token
					uniCloud.callFunction({
						name: "gm_getUserInfo",
						data: {
							userID: res.data.token
						},
						success: (res) => {
							this.userInfo = res.result[0]
						}
					})
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.user-img {
		display: flex;
		justify-content: center;
		padding: 100rpx 0;
	}
</style>
