<template>
	<view>
		<view class="head-top">
			<u-image mode="widthFix" width="100%" height="100%"
				src="https://7463-tcb-nzncjp1knbhfavcef4299-5d5ee2-1303924487.tcb.qcloud.la/mine-top-header.png">
			</u-image>
		</view>
		<view class="user-content">
			<view class="user-info">
				<view class="user-info-top" @tap="edit">
					<u-image style="margin-top: -30rpx;" shape="circle" mode="scaleToFill" width="130rpx"
						height="130rpx"
						:src="userInfo.avatarUrl?userInfo.avatarUrl:'https://7463-tcb-nzncjp1knbhfavcef4299-5d5ee2-1303924487.tcb.qcloud.la/default.png'">
					</u-image>
					<text>{{userInfo.nickName?userInfo.nickName:'未登录 请点击授权登陆'}}</text>
				</view>
				<view class="user-info-bottom">
					<view class="vip-box" @tap="toVip">
						<view class="vip-box-top">
							<u-icon name="integral-fill" size="38" color="#ffcd60"></u-icon>
							<text>茗星会员</text>
						</view>
						<view class="vip-box-bottom">
							当前等级
							<u-icon name="level" size="38" color="#ffcd60"></u-icon>
							<text>{{userInfo.level?userInfo.level:0}}</text>
						</view>
					</view>
					<view class="vip-box" @tap="copum">
						<view class="vip-box-top">
							<u-icon name="coupon-fill" size="38" color="#ffcd60"></u-icon>
							<text>我的卡券</text>
						</view>
						<view class="vip-box-bottom">
							还有<text style="margin: 0 5rpx;">{{userInfo.copum?userInfo.copum:0}}</text>张
						</view>
					</view>
				</view>
			</view>
			<view class="ten" @tap="toTenOne">
				<view class="ten-top">
					<view class="tt-left">
						<u-icon name="gift-fill" color="#ffcd60" size="32"></u-icon>
						<text>集十赠一</text>
					</view>
					<view class="tt-right">
						正价饮品才能参与集十赠一
					</view>
				</view>
				<view class="ten-bottom">
					<u-steps active-color="#ffcd60" :list="numList" :current="userInfo.tenOne >= 0?userInfo.tenOne:-1">
					</u-steps>
				</view>
			</view>
			<view class="kf">
				<view class="kf-item" @tap="call">
					<view class="item-left">
						<u-icon name="kefu-ermai" size="30"></u-icon>
						<text>联系客服</text>
					</view>
					<view class="item-right">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="kf-item" @tap="toRemark">
					<view class="item-left">
						<u-icon name="info-circle" size="30"></u-icon>
						<text>关于古茗</text>
					</view>
					<view class="item-right">
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				numList: [{
					name: 1
				}, {
					name: 2
				}, {
					name: 3
				}, {
					name: 4
				}, {
					name: 5
				}, {
					name: 6
				}, {
					name: 7
				}, {
					name: 8
				}, {
					name: 9
				}, {
					name: 10
				}, ],
				userInfo: {},
			};
		},

		methods: {
			
			call(){
				uni.makePhoneCall({
				    phoneNumber: '13726283457' //仅为示例
				});
			},
			
			toRemark(){
				uni.navigateTo({
					url:"../remark/remark"
				})
			},
			
			toVip(){
				uni.navigateTo({
					url:"../vip/vip"
				})
			},
			
			copum(){
				uni.navigateTo({
					url:"../copum/copum"
				})
			},
			
			toTenOne(){
				console.log(11);
				uni.getStorage({
					key:"gm_user",
					success:(res) => {
						console.log(res.data.token);
						uni.navigateTo({
							url:`../tenOne/tenOne?id=${res.data.token}`
						})
					}
				})
			},
			
			edit() {
				if (this.isLogin) {
					console.log("已登录");
					uni.navigateTo({
						url: "../edit_user/edit_user"
					})
				} else {
					console.log("未登录");
					this.wxlogin().then(res => {
						this.userInfo = res.userInfo
					})
				}
			}
		},

		computed: {
			...mapState(["isLogin"])
		},

		onShow() {
			if (this.isLogin) {
				console.log("已登录");
				uni.showLoading({
					title: "请稍后"
				})
				uni.getStorage({
					key: "gm_user",
					success: (user) => {
						uniCloud.callFunction({
							name: "gm_getUserInfo",
							data: {
								userID: user.data.token
							},
							success: (res) => {
								this.userInfo = res.result[0]
								uni.hideLoading()
							}
						})
					}
				})
			} else {
				console.log("未登录");
			}



			// uni.checkSession({
			// 	success: () => {
			// 		console.log("成功");
			// 		uni.getStorage({
			// 			key: "gm_user",
			// 			success: (user) => {
			// 				uniCloud.callFunction({
			// 					name: "gm_getUserInfo",
			// 					data: {
			// 						userID: user.data.token
			// 					},
			// 					success: (res) => {
			// 						this.userInfo = res.result[0]
			// 					}
			// 				})
			// 			}
			// 		})

			// 	},
			// 	fail: () => {
			// 		console.log("失败");
			// 	}
			// })
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .u-steps__item {
		min-width: 0 !important;
	}

	.head-top {
		width: 100%;
	}

	.user-content {
		position: relative;
		z-index: 99;
		padding: 0 30rpx;
		margin-top: -120rpx;

		.user-info {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 300rpx;
			background-color: #fff;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, .1);
			border-radius: 10rpx;
			padding: 0 50rpx;

			.user-info-top {
				flex: 1;
				display: flex;
				align-items: center;

				text {
					margin-left: 30rpx;
				}
			}

			.user-info-bottom {
				flex: 2;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.vip-box {
					height: 100%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					// view{
					// 	margin: 10rpx 0;
					// }
					.vip-box-top {
						margin: 10rpx 0;
						display: flex;
						flex-direction: row;
						align-items: center;

						text {
							margin-left: 8rpx;
						}
					}

					.vip-box-bottom {
						margin: 10rpx 0;
						display: flex;
						align-items: center;

						text {
							color: #ffce61;
							font-weight: 800;
						}
					}
				}
			}
		}

		.ten {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 100%;
			height: 200rpx;
			background-color: #fff;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, .1);
			border-radius: 10rpx;
			margin-top: 20rpx;
			padding: 30rpx;

			.ten-top {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.tt-left {
					text {
						font-size: 30rpx;
						margin-left: 6rpx;
					}
				}

				.tt-right {
					color: #8e8e8e;
				}
			}

			.ten-bottom {
				.u-steps__item {
					min-width: 0 !important;
				}
			}
		}

		.kf {
			width: 100%;
			background-color: #fff;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, .1);
			border-radius: 10rpx;
			margin-top: 20rpx;
			padding: 0 30rpx;

			.kf-item {
				width: 100%;
				padding: 30rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.item-left {
					display: flex;
					align-items: center;

					text {
						margin-left: 6rpx;
					}
				}
			}
		}
	}
</style>
