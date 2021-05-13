<template>
	<view class="meal">
		<view class="bar">
			<text class="bar_one" :class="{active:index === 1}" @tap="change(1)">当前订单</text>
			<text class="bar_two" :class="{active:index === 2}" @tap="change(2)">历史订单</text>
		</view>
		<view class="content inMake" v-show="index === 1">
			<view class="no_make" v-if="inMake.length === 0">
				<view class="title">
					暂无订单
				</view>
				<view class="button" @tap="order">
					来一单
				</view>
			</view>
			<view class="make" v-show="inMake.length != 0">
				<view class="make_item" v-for="(item,index) in inMake" :key="index" @tap="orderDetail(item._id)">
					<view class="make_address">
						<view class="m_a_left">
							<u-icon name="bag" size="38"></u-icon>
							<text style="font-size: 30rpx; margin-left: 5rpx;">{{item.address.shop_name}}<text class="ziqu">自取</text></text>
						</view>
						<view class="m_a_right">
							取餐码: <text class="m_a_r_t">{{item.takeMealNumber}}</text>
						</view>
					</view>
					<view class="make_time">
						{{item.time}}
					</view>
					<view class="make_pic">
						<view class="m_p_left">
							<u-image v-for="(item1,index1) in item.bill.shop_car" :key="index1" width="100rpx" height="100rpx" :src="item1.detail.mainPicture"></u-image>
						</view>
						<view class="m_p_right">
							<view class="m_p_r_top">
								￥ {{item.m_price}}
							</view>
							<view class="m_p_r_bottom">
								共{{item.total_number}}杯
							</view>
						</view>
					</view>
					<view class="make_one_more">
						<view class="m_o_m_text">
							出餐中
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="content" v-show="index === 2">
			<view class="no_make" v-if="offMake.length === 0">
				<view class="title">
					暂无订单
				</view>
				<view class="button" @tap="order">
					来一单
				</view>
			</view>
			<view class="make" v-show="offMake.length != 0">
				<view class="make_item" v-for="(item,index) in offMake" :key="index" @tap="orderDetail(item._id)">
					<view class="make_address">
						<view class="m_a_left">
							<u-icon name="bag" size="38"></u-icon>
							<text style="font-size: 30rpx; margin-left: 5rpx;">{{item.address.shop_name}}<text class="ziqu">自取</text></text>
						</view>
						<view class="m_a_right">
							已完成
						</view>
					</view>
					<view class="make_time">
						{{item.time}}
					</view>
					<view class="make_pic">
						<view class="m_p_left">
							<u-image v-for="(item1,index1) in item.bill.shop_car" :key="index1" width="100rpx" height="100rpx" :src="item1.detail.mainPicture"></u-image>
						</view>
						<view class="m_p_right">
							<view class="m_p_r_top">
								￥ {{item.m_price}}
							</view>
							<view class="m_p_r_bottom">
								共{{item.total_number}}杯
							</view>
						</view>
					</view>
					<view class="make_one_more">
						<view class="m_o_m_text" @tap.stop="oneMore(item)">
							再来一单
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				index:1,
				dealArr:[],
				inMake:[],
				offMake:[]
			};
		},

		methods: {
			
			order(){
				console.log(11);
				uni.switchTab({
					url:"../order/order"
				})
			},
			
			change(index){
				this.index = index
			},
			
			...mapMutations(['SET_bill','SET_address']),
			
			orderDetail(id){
				uni.navigateTo({
					url:`../deal_detail/deal_detail?id=${id}`
				})
			},
			
			oneMore(item){
				this.SET_bill({
					shop_car:item.bill.shop_car,
				})
				this.SET_address({
					shop_name:item.address.shop_name,
					distance:item.address.distance,
					address:item.address.address
				})
				uni.navigateTo({
					url:"../bill/bill"
				})
			}
		},
		
		onShow() {
			uni.showLoading({
				title:"获取中"
			})
			this.dealArr = []
			this.inMake = {}
			this.offMake = {}
			uni.getStorage({
				key:"gm_user",
				success: (res) => {
					console.log(res.data.token);
					uniCloud.callFunction({
						name:"gm_getOrder",
						data:{
							userID:res.data.token
						},
						success: (res1) => {
							this.dealArr = res1.result
							let tempInMake = []
							let tempOffMake = []
							this.dealArr.forEach(ele => {
								if(ele.make_state === 0){
									tempInMake.push(ele)
									tempInMake =  tempInMake.sort((a,b) => {
										return b.time_stick - a.time_stick
									})
								}else{
									tempOffMake.push(ele)
									tempOffMake = tempOffMake.sort((a,b) => {
										return b.time_stick - a.time_stick
									})
								}
							})
							this.inMake = tempInMake
							this.offMake = tempOffMake
							uni.hideLoading()
						}
					})
				}
			})
		},
		
		computed:{
			...mapState(["address","isLogin"]),
		},
		
		onTabItemTap() {
			if(!this.isLogin){
				this.wxlogin()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.meal{
		background-color: #f4f5f7;
	}
	
	.meal ::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}
	
	.bar{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		box-shadow: 0 0 10rpx rgba(0,0,0,.1);
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #929292;
		z-index: 99;
		.bar_one{
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx 0;
			
		}
		.bar_two{
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 20rpx 0;
		}
		.active{
			border-bottom: 6rpx solid #f5bf5d;
			color: #f5bf5d;
		}
	}
	.content{
		margin-top: 80rpx;
		.no_make{
			display: flex;
			flex-direction: column;
			min-height: 100vh;
			justify-content: space-around;
			align-items: center;
			.button{
				padding: 30rpx 120rpx;
				background-color: #f5bf5d;
				color: #fff;
				border-radius: 50rpx;
			}
		}
		.make_item{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			padding: 30rpx;
			margin-top: 20rpx;
			.make_address{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.m_a_left{
					display: flex;
					align-items: center;
					width: 80%;
					.ziqu{
						padding: 4rpx 8rpx;
						border: 1rpx solid #000;
						border-radius: 50rpx;
						font-size: 22rpx;
						margin-left: 10rpx;
					}
				}
				.m_a_right{
					display: flex;
					align-items: center;
					.m_a_r_t{
						font-size: 32rpx;
						margin-left: 5rpx;
					}
				}
			}
			.make_time{
				color: #929292;
				font-size: 22rpx;
				margin: 10rpx 0;
			}
			.make_pic{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.m_p_left{
					width: 80%;
					display: flex;
					flex-wrap: wrap;
				}
				.m_p_right{
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					.m_p_r_top{
						display: flex;
						align-items: center;
						font-size: 30rpx;
					}
					.m_p_r_bottom{
						font-size: 22rpx;
						color: #929292;
					}
				}
			}
			.make_one_more{
				display: flex;
				justify-content: flex-end;
				.m_o_m_text{
					padding: 10rpx;
					border: 1rpx solid #ebc179;
					border-radius: 5rpx;
					color: #ebc179;
				}
			}
		}
	}
</style>
