<template>
	<view>
		<!-- <view class="my_location">
			<u-icon name="map" size="32"></u-icon>
			<text style="margin-right: 10rpx;">当前位置:</text>
			<text>紫金县人民政府</text>
		</view> -->
		<map v-if="location.latitude" class="map" :markers="markers" :latitude="location.latitude"
			:longitude="location.longitude" scale="15"></map>

		<view class="shop">
			<view @click="toMeun(item.shop_name,item.dis,item.shop_address)" class="shop_item" v-for="(item,index) in shop" :key="index" v-if="item.iswork">
				<view class="shop_item_left">
					<view class="shop_name">
						<u-icon name="bag" size="32"></u-icon>
						<text>{{item.shop_name}}</text>
						<text :class="{iswork:item.iswork}">{{item.iswork? "营业中" : ""}}</text>
					</view>
					<view class="shop_info">
						<view class="shop_address">
							<u-icon name="map" size="24"></u-icon>
							<view>{{item.shop_address}}</view>
						</view>
						<view class="shop_time">
							<u-icon name="bell" size="24"></u-icon>
							<text>{{item.shop_time}}</text>
						</view>
					</view>
				</view>
				<view class="shop_item_right">
					<view class="shop_distance">
						距离{{item.dis}}m
					</view>
					<view class="shop_order">
						去下单
					</view>
					<view class="shop_icon">
						
					</view>
				</view>
			</view>
		</view>
		<view class="reflesh" @tap="reflesh" v-if="!location.latitude">
			点击刷新
		</view>
	</view>
</template>

<script>
	import {mapMutations, mapState} from "vuex"
	export default {
		data() {
			return {
				location: {},
				markers: [{
					id: 1,
					latitude: "",
					longitude: "",
					iconPath: 'https://hellouniapp.dcloud.net.cn/static/location.png',
					width: "40",
					height: "40"
				}, ],
				shop:[]
			};
		},
		
		computed:{
			...mapState(["address"])
		},

		methods:{
			distance(la1, lo1, la2, lo2) {  
			            var La1 = la1 * Math.PI / 180.0;  
			            var La2 = la2 * Math.PI / 180.0;  
			            var La3 = La1 - La2;  
			            var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;  
			            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));  
			            s = s * 6378.137;//地球半径  
			            s = Math.round(s * 10000) / 10000;  
						s = s*1000
			            return parseInt(s)
			        },
					
			toMeun(shop,dis,address){
				uni.showModal({
					title:"确认门店",
					content:`当前门店为: ${shop} `,
					confirmText:"确认下单",
					success: (res) => {
						if(res.confirm){
							
							console.log("确认");
							this.SET_address({
								shop_name:shop,
								distance:dis,
								address
							})
							uni.switchTab({
								url:"../order/order"
							})
						}
					}
				})
			},
			
			...mapMutations(["SET_address"]),
			
			reflesh(){
				uni.redirectTo({
					url:"../location/location"
				})
			}
		},

		onLoad() {
			uni.getLocation({
				type: "gcj02",
				success: (res) => {
					console.log(res);
					this.location = res
					this.markers[0].latitude = res.latitude
					this.markers[0].longitude = res.longitude

					uniCloud.callFunction({
						name: "gm_getShopAddress",
						success: (res) => {
							res.result.map(element => {
								const dis =  this.distance(this.markers[0].latitude,this.markers[0].longitude,element.latitude,element.longitude)
								element.dis = dis
								this.markers.push({
									id: this.markers.length + 1,
									latitude: element.latitude,
									longitude: element.longitude,
									iconPath: '/static/locate.png',
									width: "25",
									height: "35"
								})
							})
							res.result.sort( (a,b) => {
								return a.dis - b.dis
							} )
							this.shop = res.result
						}
					})
				},
				fail: () => {
					console.log("失败");
					this.shop = []
					uni.showModal({
						title:"获取位置失败",
						content:"请打开设备定位权限",
						showCancel:false,
						complete: () => {
							
						}
					})
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	
	.reflesh{
		width: 100%;
		height: 80vh;
		text-align: center;
		line-height: 80vh;
		font-size: 36rpx;
	}
	
	.my_location {
		padding: 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.map {
		width: 750rpx;
		height: 450rpx;
	}

	.shop {
		padding: 20rpx 20rpx 0 20rpx;

		.shop_item {
			padding: 50rpx 10rpx 30rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-shadow: 0 0 30rpx rgba(0, 0, 0, .1);
			border-radius: 10rpx;
			margin-bottom: 20rpx;

			.shop_item_left {
				width: 70%;
				padding-right: 50rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				border-right: 4rpx solid #dfdfe1;

				.shop_name {
					font-size: 30rpx;

					.iswork {
						margin-left: 10rpx;
						color: #f1c887;
						padding: 5rpx;
						border: 1rpx solid #f1c887;
						font-size: 24rpx;
					}
				}

				.shop_info {
					margin-top: 50rpx;
					display: flex;
					flex-direction: column;
					color: #9a9a9a;
					font-size: 24rpx;

					.shop_address {
						display: flex;
						margin-bottom: 20rpx;
					}
				}
			}

			.shop_item_right {
				width: 30%;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.shop_distance {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					color: #efc37f;
				}

				.shop_order {
					margin: 30rpx 0;
					font-size: 30rpx;
				}

				.shop_icon {
					display: flex;
					justify-content: space-between;

					text {
						margin: 0 10rpx;
					}
				}
			}
		}
	}
</style>
