<template>
	<view>
		<view class="swiper">
			<u-swiper img-mode="scaleToFill" border-radius="0" height="600" mode="none" :list="list"></u-swiper>
		</view>
		<view class="content" style="padding: 0 30rpx;">
			<view class="takein" @tap="toOrder">
				<view class="takein-detail">
					<view class="takein-icon" style="width: 48rpx; height: 48rpx;">
						<text class="one total" style="display: inline-block;"></text>
						<text class="two total" style="display: inline-block;"></text>
						<text class="three total" style="display: inline-block;"></text>
					</view>
					<u-image src="/static/tabbar/takein.png" width="126" height="126"></u-image>
					<view class="t-d-detail">
						<view class="t-d-detail-top">
							到店自取
						</view>
						<view class="t-d-detail-bottom">
							提前下单更省时
						</view>
					</view>
				</view>
			</view>
			<view class="presentation" @tap="toTenOne">
				<view class="pr-inside">
					<view class="pr-inside-left">
						<u-image width='40' height="40" src="/static/tabbar/gift.png"></u-image>
						<text>集十赠一</text>
					</view>
					<view class="pr-inside-right">
						<text>集十杯, 赠一杯</text>
						<u-icon color="#eeb860" name="play-right-fill" style="margin-top: 2rpx;"></u-icon>
					</view>
				</view>
			</view>
			<view class="video">
				<view class="v-left" @click="check">
					<u-image mode="scaleToFill" border-radius="10" width="100%" height="180rpx" src="/static/carousel/main-left.png"></u-image>
				</view>
				<view class="v-right">
					<u-image mode="scaleToFill" border-radius="10"  width="100%" height="180rpx" src="/static/carousel/main-right.png"></u-image>
				</view>
			</view>
			<view class="slogan">
				<view class="s-top">
					Good me
				</view>
				<view class="s-bottom">
					<view class="sb-three">
						
					</view>
					<view class="sb-two">
						
					</view>
					<view class="sb-one">
						
					</view>
					<text>每天一杯喝不腻</text>
					<view class="sb-one">
						
					</view>
					<view class="sb-two">
						
					</view>
					<view class="sb-three">
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	export default {
		data() {
			return {
				list:[
					'/static/carousel/1.jpg',
					'/static/carousel/2.jpg',
					'/static/carousel/3.jpg'
				]
			}
		},
		
		computed:{
			...mapState(["isLogin"])
		},
		
		methods: {
			
			toTenOne(){
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
			
			
			toOrder(){
				if(this.isLogin){
					console.log("已登录");
					uni.navigateTo({
						url:"../location/location"
					})
				}else{
					console.log("未登录");
					this.wxlogin()
				}
			},
		
			check(){
				uni.checkSession({
					success: () => {
						console.log("成功");
					},
					fail: () => {
						console.log("失败");
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.content{
		position: relative;
		margin-top: -40rpx;
		z-index: 99;
		.takein{
			width: 100%;
			height: 350rpx;
			background-color: #fff;
			box-shadow: 0 0 30rpx rgba(0,0,0,.1);
			border-radius: 10rpx;
			padding: 10rpx;
			.takein-detail{
				position: relative;
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
				border: 4rpx solid #dfbf72;
				border-top-right-radius: 170rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.takein-icon{
					position: absolute;
					top: 0;
					right: 0;	
					display: flex;
					flex-wrap: wrap-reverse;
					.total{
						flex: none;
						width: 25rpx;
						height: 25rpx;
						border: 4rpx solid #dfbf72;
					}
					.three{
						border-top-left-radius: 10rpx;
						border-top-right-radius: 10rpx;
						border-bottom: 0;
						margin-bottom: -6rpx;
					}
					.one{
						border-top: 0;
						border-right: 0;
					}
					.two{
						border-top-right-radius: 10rpx;
						border-bottom-right-radius: 10rpx;
						margin-left: -4rpx;
						border-left: 0;
					}
				}
				
				.t-d-detail{
					margin-left: 30rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.t-d-detail-top{
						font-size: 50rpx;
						font-weight: 800;
					}
					.t-d-detail-bottom{
						font-size: 24rpx;
						color: #8b898c;
					}
				}
			}
		}
		
		.presentation{
			width: 100%;
			height: 130rpx;
			margin: 30rpx 0;
			background-color: #fff;
			box-shadow: 0 0 30rpx rgba(0,0,0,.1);
			border-radius: 10rpx;
			padding: 10rpx;
			background-image: linear-gradient(to right, #fff6e7, #fff);
			.pr-inside{
				position: relative;
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
				border: 4rpx solid #dfbf72;
				padding: 0 15rpx 0 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.pr-inside-left{
					display: flex;
					align-items: center;
					text{
						margin-left: 10rpx;
						font-size: 30rpx;
						font-weight: 700;
					}
				}
				.pr-inside-right{
					display: flex;
					align-items: center;
					text{
						margin-right: 5rpx;
					}
				}
			}
		}
	
		.video{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 30rpx;
			.v-left{
				width: 48%;
				border-radius: 10rpx;
			}
			.v-right{
				width: 48%;
				border-radius: 10rpx;
			}
		}
		
		.slogan{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			margin-bottom: 30rpx;
			.s-top{
				font-size: 60rpx;
				font-style: italic;
				color: #e7e7e7;
				font-weight: 800;
			}
			.s-bottom{
				display: flex;
				align-items: center;
				justify-content: center;
				text{
					color: #e7e7e7;
					letter-spacing: 4rpx;
					font-size: 24rpx;
					margin: 0 10rpx;
				}
				.sb-one{
					width: 14rpx;
					height: 14rpx;
					background-color: #e7e7e7;
					border-radius: 50%;
				}
				.sb-two{
					width: 10rpx;
					height: 10rpx;
					background-color: #e7e7e7;
					border-radius: 50%;
					margin: 0 6rpx;
				}
				.sb-three{
					width: 6rpx;
					height: 6rpx;
					background-color: #e7e7e7;
					border-radius: 50%;
				}
			}
		}
	}
</style>
