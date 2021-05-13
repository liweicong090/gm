<template>
	<view class="content" v-show="m_price != -1">
		<view class="address">
			<view class="store">
				<view class="store_name">
					<view class="name_left">
						<u-icon name="bag" size="38"></u-icon>
						<text>{{address.shop_name}}</text>
					</view>
					<view class="name_right">
						自取
					</view>
				</view>
				<text class="store_desc">
					您距离当前门店{{address.distance}}m, 请确认门店是否正确
				</text>
			</view>
			<view class="user_phone">
				<view class="phone">
					<text>联系电话</text>
					<text>{{userInfo.phone}}</text>
				</view>
				<view class="edit_phone" @tap="edit_phone">
					<u-icon name="edit-pen" size="38"></u-icon>
				</view>
			</view>
			<view class="time">
				<view class="time_left">
					取茶时间
				</view>
				<view class="time_right">
					立即取茶
				</view>
			</view>
		</view>
		<view class="goods">
			<view class="" >
				<view class="goods_item" v-for="(item,index) in bill.shop_car" :key="index">
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
			</view>
			<view class="youhuiquan" v-if="copumID.ID != -1">
				<view class="yhq_left">
					<u-icon name="coupon" size="32" color="#eabc72"></u-icon>
					<text>全场饮品赠饮1杯兑换券</text>
				</view>
				<view class="yhq_right">
					-￥{{bill.shop_car[0].price / bill.shop_car[0].number}}
				</view>
			</view>
			<view class="total">
				<text class="many">共{{total_number}}件商品, 小计: </text>
				<text class="m_price"> ￥{{copumID.ID === -1? m_price : m_price - bill.shop_car[0].price / bill.shop_car[0].number }}</text>
			</view>
		</view>
	
		<view class="copum" @tap="choose_copum">
			<view class="copum_left">
				<u-icon name="coupon" size="32" color="#f6c562" style="margin-top: 4rpx;"></u-icon>
				<view style="margin-left: 5rpx;">选择优惠券</view>
			</view>
			<view class="copum_right" >
				<view>{{userInfo.copum}}张可用</view>
				<u-icon name="arrow-right" color="#929292" style="margin-top: 4rpx;"></u-icon>
			</view>
		</view>
		
		<!-- <view class="remark" @tap="toRemark">
			<view class="remark_left">
				备注
			</view>
			<view class="remark_right">
				<view class="remark_detail" style="color: #929292; margin-right: 5rpx;">
					包装等要求包装等要求包装等要求包装等要求包装等要求包装等要求包装等要求
				</view>
				<u-icon name="arrow-right" color="#929292"></u-icon>
			</view>
		</view> -->
		
		<view class="pay">
			<view class="pay_left">
				<view class="price_top">
					<view class="zongji">
						总计:
					</view>
					<view class="price">
						￥{{copumID.ID === -1? m_price : m_price - bill.shop_car[0].price / bill.shop_car[0].number}}
					</view>
				</view>
				<view class="price_left">
					本单集章 +{{total_number}}
				</view>
			</view>
			<view class="pay_right" @tap="pay">
				支付
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				userInfo:{},
				m_price:-1,
				total_number:0,
				// copum:[]
			};
		},
		
		methods:{
			
			toRemark(){
				uni.navigateTo({
					url:"../remark/remark"
				})
			},
			
			...mapMutations(["SET_copumID"]),
			
			edit_phone(){
				uni.navigateTo({
					url:"../edit_user/edit_user"
				})
			},
			
			choose_copum(){
				if(this.userInfo.copum === 0){
					return
				}
				uni.navigateTo({
					url:`../choose_copum/choose_copum`
				})
			},
			
			pay(){
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
					title:"支付中"
				})
				let time = this.$u.timeFormat(Date.now(),'yyyy-mm-dd hh:MM:ss')
				let day = this.$u.timeFormat(Date.now(),'yyyy-mm-dd') 
				
				uniCloud.callFunction({
					name:"gm_saveDeal",
					data:{
						bill:this.bill,
						address:this.address,
						m_price:this.copumID.ID === -1? this.m_price : this.m_price - this.bill.shop_car[0].price / this.bill.shop_car[0].number,
						total_number:this.total_number,
						userID:this.userInfo.userID,
						make_state:0,
						time_stick:Date.now(),
						time,
						day,
						copum:this.copumID.ID === -1? -1 : 0 ,
						copum_price:this.bill.shop_car[0].price / this.bill.shop_car[0].number
					},
					success: (res) => {
						uni.reLaunch({
							url:`../deal_detail/deal_detail?id=${res.result.id}`,
						})
						
						console.log(res.result.id);
						uni.hideLoading()
						uniCloud.callFunction({
							name:"gm_editUserInfo",
							data:{
								tenOne:this.total_number,
								userID:this.userInfo.userID,
								time_stick:Date.now(),
								time,
								total_number:this.total_number,
								address:this.address
								
							},
							success: (res1) => {
								console.log(res1);
								uniCloud.callFunction({
									name:"gm_updateCopum",
									data:{
										id:this.copumID.ID,
										useState:1,
										userID:this.userInfo.userID,
									},
									success: (res) => {
										console.log(res.result);
										this.SET_copumID({
											copum_index:-1,
											ID:-1
										})
									}
								})
							}
						})
					}
				})
			}
		},
		
		computed:{
			...mapState(["bill","address","copumID"])
		},
		
		onShow() {
			// this.copum = []
			// if(this.copumID.ID != -1){
			// 	uniCloud.callFunction({
			// 		name:"gm_getCopum",
			// 		data:{
			// 			_id:this.copumID.ID
			// 		},
			// 		success: (res) => {
			// 			console.log(res.result);
			// 			if(res.result){
			// 				this.copum = res.result[0]
			// 				if(this.copum.value === "畅饮"){
			// 					let firstPrice = this.bill.shop_car[0].price
			// 					this.m_price -= firstPrice
			// 				}
			// 			}
			// 		}
			// 	})
			// }
			
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
		},
		
		onLoad() {
			uni.showLoading({
				title:"结算中"
			})
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
							this.bill.shop_car.forEach(ele => {
								this.m_price += ele.price
								this.total_number += ele.number
							})
							this.m_price += 1
							uni.hideLoading()
						}
					})
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #f4f5f7;
		padding-bottom: 250rpx;
		min-height: 100vh;
	}
	
	.address{
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		.store{
			width: 100%;
			display: flex;
			flex-direction: column;
			// border-bottom: 1rpx solid #ddd;
			margin-bottom: 40rpx;
			.store_name{
				display: flex;
				width: 100%;
				justify-content: space-between;
				align-items: center;
				.name_left{
					display: flex;
					align-items: center;
					text{
						font-weight: 600;
						font-size: 32rpx;
					}
				}
				.name_right{
					padding: 10rpx 20rpx;
					border-radius: 50rpx;
					border: 1rpx solid #929292;
					color: #929292;
				}
			}
			.store_desc{
				color: #929292;
				// padding-bottom: 40rpx;
			}
		}
	
		.user_phone{
			display: flex;
			align-items: center;
			justify-content: space-between;
			// border-bottom: 1rpx solid #ddd;
			margin-bottom: 40rpx;
			// padding-bottom: 40rpx;
			.phone{
				font-weight: 600;
				text:nth-child(1){
					margin-right: 30rpx;
				}
			}
			.edit_phone{

			}
		}
	
		.time{
			display: flex;
			justify-content: space-between;
			align-items: center;
			// padding-bottom: 25rpx;
			.time_left{
				font-weight: 600;
			}
			.time_right{
				font-weight: 600;
				color: #929292;
			}
		}
	}

	.goods{
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 30rpx 30rpx 30rpx 30rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		.youhuiquan{
			display: flex;
			align-items: center;
			justify-content: space-between;
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
		
		.total{
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.many{
				color: #929292;
			}
			.m_price{
				font-weight: 600;
			}
		}
	}

	.copum{
		padding: 30rpx 30rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;
		.copum_left{
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.copum_right{
			display: flex;
			align-items: center;
			justify-content: center;
			color: #f6c562;
		}
	}
	
	.remark{
		background-color: #fff;
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;
		// padding-bottom: 250rpx;
		.remark_right{
			display: flex;
			align-items: center;
		}
	}
	
	.pay{
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 30rpx 30rpx 80rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		width: 100%;
		.pay_left{
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			.price_top{
				display: flex;
				align-items: center;
				margin-bottom: 10rpx;
				.zongji{
					font-size: 32rpx;
					color: #929292;
					margin-right: 10rpx;
				}
				.price{
					font-size: 36rpx;
					font-weight: 600;
				}
			}
			.price_left{
				color: #f7ca66;
				padding: 10rpx;
				border: 1rpx solid #f7ca66;
				border-radius: 5rpx;
			}
		}
		.pay_right{
			padding: 20rpx 50rpx;
			background-color: #f7ca66;
			color: #fff;
			font-size: 32rpx;
			border-radius: 50rpx;
		}
	}
</style>
