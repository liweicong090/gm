<template>
	<view class="content">
		<view class="tenOne_pic">
			<view class="tp_top">
				<view class="tp_t_top">
					再消费<text class="number">{{10 - number}}</text>杯 可兑换免费饮品券1张
				</view>
				<view class="tp_t_bottom">
					*正价消费满10杯,即可兑换
				</view>
			</view>
			<view class="tp_middle">
				<view class="tp_icon" v-for="(item,index) in 10" :key="index">
					<u-image width="100rpx" height="100rpx" :src="item < number ? '/static/icon-collected.png':'/static/icon-uncollected.png'"></u-image>
				</view>
			</view>
			<view class="tp_bottom">
				<view class="tp_b_top" @tap="order">
					去下单
				</view>
				<view class="tp_b_bottom">
					活动规则
				</view>
			</view>
		</view>
		<view class="tenOne_record">
			<view class="record_title">
				<view class="r_t_item">
					集章记录
				</view>
			</view>
			<view class="record_box">
				<view class="record_item" v-for="(item,index) in record" :key="index">
					<view class="re_top">
						<view class="r_t_left">
							{{item.address.shop_name}}
						</view>
						<view class="r_t_right">
							{{item.total_number > 0 ? `+ ${item.total_number}`: item.total_number}}
						</view>
					</view>
					<view class="re_bottom">
						<view class="r_b_left">
							{{item.time}}
						</view>
						<view class="r_b_right">
							{{item.total_number > 0 ? '已集章' : "集十赠一兑换"}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				number:0,
				record:[]
			};
		},
		
		methods:{
			order(){
				uni.switchTab({
					url:"../order/order"
				})
			}
		},
		
		onLoad(option) {
			uniCloud.callFunction({
				name:"gm_getRecord",
				data:{
					userID: `${option.id}`
				},
				success: (res) => {
					console.log(res.result);
					this.record = res.result
				}
			})
			
			uniCloud.callFunction({
				name:"gm_getUserInfo",
				data:{
					userID: `${option.id}`
				},
				success: (res) => {
					this.number = res.result[0].tenOne + 1
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #f4f5f7;
		height: 100vh;
		width: 100%;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		.tenOne_pic{
			width: 100%;
			height: 49%;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			.tp_top{
				width: 100%;
				height: 30%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-evenly;
				.tp_t_top{
					font-size: 32rpx;
					.number{
						color: #f7ca67;
						font-size: 38rpx;
					}
				}
				.tp_t_bottom{
					color: #a1a1a1;
				}
			}
			.tp_middle{
				width: 100%;
				height: 40%;
				display: flex;
				flex-wrap: wrap;
				padding: 0 50rpx;
				.tp_icon{
					width: 20%;
				}
			}
			.tp_bottom{
				width: 100%;
				height: 30%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-evenly;
				.tp_b_top{
					padding: 20rpx 150rpx;
					border-radius: 50rpx;
					color: #fff;
					font-size: 30rpx;
					background-color: #f7c663;
				}
				.tp_b_bottom{
					color: #f7c663;
					text-decoration: underline;
				}
			}
		}
		.tenOne_record{
			width: 100%;
			height: 49%;
			background-color: #fff;
			padding: 30rpx;
			padding-top: 0rpx;
			overflow: scroll;
			position: relative;
			.record_title{
				padding: 0rpx 30rpx;
				width: 100%;
				position: fixed;
				right: 0;
				left: 0;
				z-index: 99;
				.r_t_item{
					padding: 30rpx 30rpx;
					background-color: #fff;
				}
			}
			.record_box{
				padding-top: 80rpx;
				.record_item{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-top: 30rpx;
					.re_top{
						display: flex;
						align-items: center;
						justify-content: space-between;
					}
					.re_bottom{
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #929292;
						font-size: 22rpx;
					}
				}
			}
		}
	}
</style>
