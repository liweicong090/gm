<template>
	<view class="content">
		<view class="" v-show="goods.time_stick">
			<view class="take_meal_number">
				<view class="t_icon">
					<u-icon name="order" size="50" color="#eac078"></u-icon>
				</view>
				<view class="t_text">
					取餐码
				</view>
				<view class="t_number">
					{{goods.takeMealNumber}}
				</view>
				<view class="t_desc">
					{{goods.make_state === 1? '已完成':'制作中'}}
				</view>
			</view>
				
			<view class="goods">
				<view class="goods_address">
					<view class="g_left">
						<view class="g_l_top">
							<u-icon name="bag" size="38"></u-icon>
							<text style="font-size: 30rpx;">{{goods.address.shop_name}}</text>
						</view>
						<view class="g_l_bottom">
							{{goods.address.address}}
						</view>
					</view>
					<view class="g_right">
						<view class="g_r_item" @tap="call">
							<u-icon name="phone" size="48" color="#929292"></u-icon>
							<view class="item_name">
								联系门店
							</view>
						</view>
						<!-- <view class="g_r_item">
							<u-icon name="zhuanfa" size="48" color="#929292"></u-icon>
							<view class="item_name">
								前往门店
							</view>
						</view> -->
					</view>
				</view>
			
				<view class="goods_detail">
					<view class="goods_item" v-for="(item,index) in goods.bill.shop_car" :key="index">
						<view class="item_left">
							<u-image width="140rpx" height="140rpx" :src="item.detail.mainPicture"></u-image>
							<view class="item_detail">
								<text class="item_title">{{item.detail.name}}</text>
								<view class="item_desc">
									<text style="margin-right: 3rpx;">{{item.sp_value}}</text>
									<text style="margin-right: 3rpx;" v-for="(item1,index1) in item.value" :key="index1">{{item1}}</text>
								</view>
							</view>
						</view>
						<view class="item_right">
							<view class="item_price">
								￥ {{item.price}}
							</view>
							<view class="item_number">
								 × {{item.number}}
							</view>
						</view>
					</view>
					<view class="goods_total">
						
						<view class="youhuiquan" v-if="goods.copum === 0">
							<view class="yhq_left">
								<u-icon name="coupon" size="32" color="#eabc72"></u-icon>
								<text>全场饮品赠饮1杯兑换券</text>
							</view>
							<view class="yhq_right">
								-￥{{goods.copum_price}}
							</view>
						</view>
						<view class="g_t_top">
							<view class="g_t_t_left">
								总计:
							</view>
							<view class="g_t_t_right">
								￥ {{goods.m_price}}
							</view>
						</view>
						<view class="g_t_bottom">
							<text class="g_t_bottom_desc">共 {{goods.total_number}} 件商品,实付:</text>
							<text class="g_t_bottom_price">￥ {{goods.m_price}}</text>
						</view>
					</view>
				</view>
			</view>
				
			<view class="detail">
				<view class="jizhang flex">
					<view class="left">
						本单集章:
					</view>
					<view class="right">
						+ {{goods.total_number}}
					</view>
				</view>
				<view class="number flex">
					<view class="left">
						取茶号:
					</view>
					<view class="right">
						{{goods.takeMealNumber}}
					</view>
				</view>
				<view class="time flex">
					<view class="left">
						下单时间:
					</view>
					<view class="right">
						{{goods.time}}
					</view>
				</view>
				<view class="code flex">
					<view class="left">
						订单编号:
					</view>
					<view class="right">
						{{goods._id}}
						<text class="copy" @tap="copy">复制</text>
					</view>
				</view>
				<view class="remark flex">
					<view class="left">
						备注:
					</view>
					<view class="right">
						无
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
				goods:{}
			};
		},
		
		methods:{
			
			call(){
				uni.makePhoneCall({
				    phoneNumber: '13726283457' //仅为示例
				});
			},
			
			copy(){
				uni.setClipboardData({
				    data: this.goods._id,
				    success: function () {
				        console.log('success');
				    }
				});
			}
		},
		
		onLoad(option) {
			uni.showLoading({
				title:"请稍后"
			})
			console.log(option.id);
			uniCloud.callFunction({
				name:"gm_getOrder",
				data:{
					id:option.id
				},
				success: (res) => {
					console.log(res.result);
					this.goods = res.result
					uni.hideLoading()
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.youhuiquan{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 10rpx;
			.yhq_left{
				text{
					color: #b3b3b3;
					margin-left: 5rpx;
				}
			}
			.yhq_right{
				color: #b3b3b3;
			}
		}
	
	.content{
		min-height: 100vh;
		background-color: #f4f5f7;
		.take_meal_number{
			display: flex;
			background-color: #fff;
			height: 250rpx;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			margin-bottom: 30rpx;
			.t_number{
				font-size: 36rpx;
				font-weight: 600;
			}
			.t_desc{
				color: #929292;
				font-size: 24rpx;
			}
		}
	
		.goods{
			padding: 40rpx 30rpx;
			background-color: #fff;
			.goods_address{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 40rpx;
				.g_left{
					width: 60%;
					display: flex;
					flex-direction: column;
					.g_l_top{
						display: flex;
						align-items: center;
						margin-bottom: 30rpx;
					}
					.g_l_bottom{
						color: #929292;
						font-size: 24rpx;
					}
				}
				.g_right{
					width: 40%;
					display: flex;
					align-items: center;
					justify-content: center;
					.g_r_item{
						display: flex;
						flex-direction: column;
						align-items: center;
						.item_name{
							margin-top: 10rpx;
							color: #929292;
						}
					}
				}
			}
			.goods_detail{
				.goods_item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 40rpx;
					.item_left{
						display: flex;
						align-items: center;
						.item_detail{
							.item_title{
								font-size: 30rpx;
							}
							.item_desc{
								color: #929292;
								margin-top: 5rpx;
								font-size: 22rpx;
							}
						}
					}
					.item_right{
						display: flex;
						flex-direction: column;
						align-items: flex-end;
						.item_price{
						}
						.item_number{
							color: #929292;
						}
					}
				}
				.goods_total{
					display: flex;
					flex-direction: column;
					width: 100%;
					.g_t_top{
						display: flex;
						align-items: center;
						justify-content: space-between;
						color: #929292;
					}
					.g_t_bottom{
						margin-top: 10rpx;
						display: flex;
						align-items: center;
						justify-content: flex-end;
						.g_t_bottom_desc{
							color: #929292;
						}
						.g_t_bottom_price{
							font-size: 30rpx;
							margin-left: 10rpx;
						}
					}
				}
			}
		}
	
		.detail{
			padding: 40rpx 30rpx;
			background-color: #fff;
			margin-top: 30rpx;
			.flex{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 20rpx;
				.left{
					color: #929292;
				}
				.right{
					.copy{
						padding: 0rpx 5rpx;
						border: 1rpx solid #929292;
						margin-left: 5rpx;
						font-size: 22rpx;
						color: #929292;
					}
				}
				
			}
			.flex:last-child{
				margin-bottom: 0;
			}
		}
	}
</style>
