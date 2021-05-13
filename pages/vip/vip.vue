<template>
	<view class="content">
		<view class="content_top">

		</view>
		<view class="level_box">
			<view class="grow">
				<view class="grow_top">
					<u-icon size="30" name="coupon" color="#f4bb54"></u-icon>
					<text>成长轨迹</text>
				</view>
				<view class="grow_bottom">
					<u-steps active-color="#f4bb54" :list="numList" :current="0"></u-steps>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				numList: [{
					name: 'V1'
				}, {
					name: 'V2'
				}, {
					name: 'V3'
				}, {
					name: 'V4'
				}, {
					name: 'V5'
				}, {
					name: 'V6'
				}, ],
			};
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		background-color: #f4f5f7;

		.content_top {
			width: 100%;
			height: 30vh;
			background-color: #f7c763;
			border-bottom-left-radius: 100rpx;
			border-bottom-right-radius: 100rpx;
		}

		.level_box {
			overflow: scroll;
			margin-top: -80rpx;
			padding: 0 30rpx;

			.grow {
				padding: 30rpx;
				background-color: #FFF;
				box-shadow: 0 0 30rpx rgba(0, 0, 0, .1);
				border-radius: 12rpx;

				.grow_top {
					display: flex;
					align-items: center;

					text {
						font-size: 26rpx;
						margin-left: 5rpx;
					}
				}
				.grow_bottom{
					margin-top: 50rpx;
				}
			}
		}
	}
</style>
