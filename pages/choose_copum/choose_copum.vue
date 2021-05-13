<template>
	<view class="content">
		
		<view class="buttom" v-if="copum_index != -1" @tap="toUse()">
			<text>立即使用</text>
		</view>
		
		<view class="copum_item" v-if="item.useState === 0" v-for="(item,index) in copum" :key="index"  @tap="choose(item,index)">
			<!-- <view class="ci_dot">
				<view class="dot_item" v-for="(item1,index1) in 8" :key="index1">
					
				</view>
			</view>
			<view class="ci_top">
				
			</view>
			<view class="ci_bottom">
				
			</view> -->
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
			<view class="copum_right" :class="{active:index === copum_index}">
				<u-icon name="checkbox-mark" color="#fff"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	import{ mapMutations,mapState} from "vuex"
	export default {
		data() {
			return {
				copum:[],
				copum_index:-1
			};
		},
		
		methods:{
			
			...mapMutations(["SET_copumID"]),
			
			choose(item,index){
				if(this.copum_index === index){
					this.copum_index = -1
					this.SET_copumID({
						copum_index:-1,
						ID:-1
					})
				}else{
					this.copum_index = index
					this.SET_copumID({
						copum_index:index,
						ID:this.copum[this.copum_index]._id
					})
				}
				console.log(item);
			},
			
			toUse(){
				console.log(this.copum[this.copum_index]._id);
				uni.navigateBack({
					
				})
			}
		},
		
		computed:{
			...mapState(["copumID"])
		},
		
		onShow() {
			this.copum_index = this.copumID.copum_index
			
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
	
	.buttom{
		position: fixed;
		bottom: 50rpx;
		left: 0 ;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 99;
		text{
			padding: 30rpx 250rpx;
			color: #fff;
			background-color: #f6b758;
			border-radius: 50rpx;
		}
	}
	
	.content{
		padding: 30rpx;
		background-color: #f4f5f7;
		min-height: 100vh;
		padding-bottom: 200rpx;
	}
	
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
			width: 65%;
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
			
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #bebebe;
		}
		
		.active{
			background-color: #f6b758;
		}
	}
</style>
