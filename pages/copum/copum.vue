<template>
	<view class="content">
		
		<!-- <u-popup class="pop" close-icon-color="#fff" v-model="show" mode="center" border-radius="12"  width="90%" height="60%" closeable=true close-icon-size="40">
			<view class="detail_top">
				<view class="d_t_left">
					<u-icon name="gift" size="100"></u-icon>
				</view>
				<view class="d_t_right">
					<view class="d_t_r_top">
						<text class="main_price">5.2元</text>
						<text class="tiaojian">满1杯可用</text>
					</view>
					<view class="d_t_r_bottom">
						V3新品5.2元代金券
					</view>
				</view>
			</view>
			<view class="detail_bottom">
				<view class="db_top">
					<view class="note">
						使用说明:
					</view>
					<text class="desc">1.凭此券可享减免5.2元;2.仅限新品使用,新品为领券时古茗菜单列表中标注新品的饮品;3.券有效期为收到券后30天内有效：4.如使用本券后发生退款,退款以实际支付的价款为准,本券返还处理;5.本券仅限本人使用,不可交易与赠送,不与其他优惠同享,不可兑换现金,优惠部分金额不参与成长值累计.</text>
				</view>
				<view class="db_bottom">
					立即使用
				</view>
			</view>
		</u-popup> -->
		
		<view class="bar">
			<view class="bar_item" :class="{active: index === 1 }" @tap="changBar(1)">
				可使用
			</view>
			<view class="bar_item" :class="{active: index === 2 }" @tap="changBar(2)">
				已使用
			</view>
			<view class="bar_item" :class="{active: index === 3 }" @tap="changBar(3)">
				已失效
			</view>
		</view>
		
		<view class="copum" v-show="index === 3">
			<view class="copum_item" v-if="item.useState === 3" v-for="(item,index) in copum" :key="index">
				<view class="ci_dot">
					<view class="dot_item" v-for="(item1,index1) in 8" :key="index1">
						
					</view>
				</view>
				<view class="ci_top">
					
				</view>
				<view class="ci_bottom">
					
				</view>
				<view class="copum_left">
					<view class="c_l_gray" v-for="(item,index) in 11" :key="index">
						
					</view>
					<view class="copum_left_price">
						<view class="c_l_p_money">
							{{item.value}}
						</view>
						<!-- <view class="c_l_p_desc">
							满一杯可用
						</view> -->
					</view>
				</view>
				<view class="copum_middle">
					<view class="copum_middle_name">
						{{item.title}}
					</view>
					<view class="copum_middle_avilable">
						全场饮品可用
					</view>
					<view class="copum_middle_time">
						<text class="copum_middle_time_detail">
							{{$u.timeFormat (item.startTime, 'yyyy.mm.dd')}} - {{$u.timeFormat (item.endTime, 'yyyy.mm.dd')}}
						</text>
						<!-- <text class="lookup">
							查看详情
						</text> -->
					</view>
				</view>
				<view class="copum_right_used">
					<text>已过期</text>
				</view>
			</view>
		</view>
		
		<view class="copum" v-show="index === 2">
			<view class="copum_item" v-if="item.useState === 1" v-for="(item,index) in copum" :key="index">
				<view class="ci_dot">
					<view class="dot_item" v-for="(item1,index1) in 8" :key="index1">
						
					</view>
				</view>
				<view class="ci_top">
					
				</view>
				<view class="ci_bottom">
					
				</view>
				<view class="copum_left">
					<view class="c_l_gray" v-for="(item,index) in 11" :key="index">
						
					</view>
					<view class="copum_left_price">
						<view class="c_l_p_money">
							{{item.value}}
						</view>
						<!-- <view class="c_l_p_desc">
							满一杯可用
						</view> -->
					</view>
				</view>
				<view class="copum_middle">
					<view class="copum_middle_name">
						{{item.title}}
					</view>
					<view class="copum_middle_avilable">
						全场饮品可用
					</view>
					<view class="copum_middle_time">
						<text class="copum_middle_time_detail">
							{{$u.timeFormat (item.startTime, 'yyyy.mm.dd')}} - {{$u.timeFormat (item.endTime, 'yyyy.mm.dd')}}
						</text>
						<!-- <text class="lookup">
							查看详情
						</text> -->
					</view>
				</view>
				<view class="copum_right_used">
					<text>已使用</text>
				</view>
			</view>
		</view>
		
		<view class="copum" v-show="index === 1">
			<view class="copum_item" v-if="item.useState === 0" v-for="(item,index) in copum" :key="index" @tap="toOrder">
				<view class="ci_dot">
					<view class="dot_item" v-for="(item1,index1) in 8" :key="index1">
						
					</view>
				</view>
				<view class="ci_top">
					
				</view>
				<view class="ci_bottom">
					
				</view>
				<view class="copum_left">
					<view class="c_l_yellow" v-for="(item,index) in 11" :key="index">
						
					</view>
					<view class="copum_left_price">
						<view class="c_l_p_money">
							{{item.value}}
						</view>
						<!-- <view class="c_l_p_desc">
							满一杯可用
						</view> -->
					</view>
				</view>
				<view class="copum_middle">
					<view class="copum_middle_name">
						{{item.title}}
					</view>
					<view class="copum_middle_avilable">
						全场饮品可用
					</view>
					<view class="copum_middle_time">
						<text class="copum_middle_time_detail">
							{{$u.timeFormat (item.startTime, 'yyyy.mm.dd')}} - {{$u.timeFormat (item.endTime, 'yyyy.mm.dd')}}
						</text>
						<!-- <text class="lookup">
							查看详情
						</text> -->
					</view>
				</view>
				<view class="copum_right">
					<text>立即使用</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index:1,
				show:false,
				copum:[]
			};
		},
		
		methods:{
			changBar(index){
				this.index = index
			},
			
			toOrder(){
				uni.switchTab({
					url:"../order/order"
				})
				console.log(111);
			},
		},
		
		onLoad() {
			uni.getStorage({
				key:"gm_user",
				success: (user) => {
					uniCloud.callFunction({
						name:"gm_getCopum",
						data:{
							userID:user.data.token
						},
						success: (res) => {
							console.log(res.result);
							res.result.forEach(ele => {
								let Dnow = Date.now()
								if((ele.endTime < Dnow) && (ele.useState === 0)){
									uniCloud.callFunction({
										name:"gm_updateCopum",
										data:{
											userID:user.data.token,
											useState:3,
											id:ele._id
										},
										success: (res) => {
											console.log(res);
										}
									})
									console.log(ele);
								}
							})
							this.copum = res.result
						}
					})
				}
			})
			
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding: 110rpx 30rpx 30rpx 30rpx;
		background-color: #f4f5f7;
		min-height: 100vh;
		
		.pop{
			.detail_top{
				width: 100%;
				height: 30%;
				display: flex;
				align-items: center;
				background-color: #f6b758;
				.d_t_left{
					width: 40%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.d_t_right{
					width: 60%;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-around;
					.d_t_r_top{
						display: flex;
						align-items: center;
						margin-bottom: 10rpx;
						.main_price{
							font-size: 46rpx;
							margin-right: 10rpx;
							font-weight: 800;
						}
						.tiaojian{
							font-size: 22rpx;
						}
					}
					.d_t_r_bottom{
						margin-top: 10rpx;
						
					}
				}
			}
			.detail_bottom{
				width: 100%;
				height: 70%;
				padding: 50rpx 30rpx 50rpx 30rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				.db_top{
					font-size: 22rpx;
					color: #979797;
					line-height: 40rpx;
				}
				.db_bottom{
					padding: 20rpx 70rpx;
					background-color: #f7c967;
					color: #FFF;
					border-radius: 50rpx;
					margin-top: 70rpx;
				}
			}
		}
		
		.bar{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-around;
			background-color: #fff;
			z-index: 99;
			.bar_item{
				padding: 30rpx 0 20rpx 0;
				color: #7c7c7c;
			}
			.active{
				border-bottom: 5rpx solid #f6b758;
				color: #f6b758;
			}
		}
		
		.copum{
			border-radius: 10rpx;
			.copum_item{
				background-color: #fff;
				position: relative;
				width: 100%;
				display: flex;
				align-items: center;
				overflow: hidden;
				margin-bottom: 20rpx;
				.ci_dot{
					width: 30rpx;
					padding: 20rpx 0;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-evenly;
					position: absolute;
					top: 0;
					bottom: 0;
					right: 80rpx;
					.dot_item{
						width: 8rpx;
						height: 8rpx;
						border-radius: 50%;
						background-color: #c4c4c4;
					}
				}
				.ci_top{
					width: 30rpx;
					height: 30rpx;
					background-color: #f4f5f7;
					border-radius: 50%;
					position: absolute;
					top: -15rpx;
					right: 80rpx;
					
				}
				.ci_bottom{
					width: 30rpx;
					height: 30rpx;
					background-color: #f4f5f7;
					border-radius: 50%;
					position: absolute;
					bottom: -15rpx;
					right: 80rpx;
				}
				.copum_left{
					width: 20%;
					.c_l_gray{
						width: 100%;
						height: 20rpx;
						background-color: #cfcfcf;
						border-radius: 10rpx;
					}
					.c_l_yellow{
						width: 100%;
						height: 20rpx;
						background-color: #f6b758;
						border-radius: 10rpx;
					}
					.copum_left_price_used{
						position: absolute;
						width: 20%;
						height: 100%;
						top: 0;
						left: 0;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-evenly;
						color: #a7a7a7;
						.c_l_p_money{
							font-size: 40rpx;
						}
						.c_l_p_desc{
							font-size: 22rpx;
						}
					}
					
					.copum_left_price{
						position: absolute;
						width: 20%;
						height: 100%;
						top: 0;
						left: 0;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-evenly;
						.c_l_p_money{
							font-size: 40rpx;
						}
						.c_l_p_desc{
							font-size: 22rpx;
						}
					}
				}
				.copum_middle{
					width: 70%;
					position: relative;
					padding: 0rpx 40rpx 0 20rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-between;
					.copum_middle_name{
						font-size: 32rpx;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.copum_middle_avilable{
						margin: 30rpx 0 20rpx 0;
						font-size: 22rpx;
						color: #9d9d9d;
					}
					.copum_middle_time{
						font-size: 22rpx;
						color: #9d9d9d;
						.lookup{
							color: #f6b758;
							margin-left: 5rpx;
						}
					}
				}
				
				.copum_right_used{
					text{
						writing-mode: vertical-lr;
						color: #cfcfcf;
					}
				}
				.copum_right{
					text{
						writing-mode: vertical-lr;
						color: #f6b758;
					}
				}
			}
			
		}
	}
</style>
