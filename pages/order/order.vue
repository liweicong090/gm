<template>
	<view>
		<view class="address_info">
			<view class="info_left">
				<view class="top" @tap="changeStore">
					<u-icon name="bag" size="32"></u-icon>
					<text>{{address.shop_name?address.shop_name:"请点击选择门店"}}</text>
					<u-icon name="arrow-right" size="32"></u-icon>
				</view>
				<view class="bottom">
					距离您{{address.distance?address.distance:0}}m
				</view>
			</view>
			<view class="info_right">
				自取
			</view>
		</view>

		<view class="u-wrap">
			<!-- <view class="u-search-box">
				<view class="u-search-inner">
					<u-icon name="search" color="#909399" :size="28"></u-icon>
					<text class="u-search-text">搜索</text>
				</view>
			</view> -->
			<view class="u-menu-wrap">
				<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop"
					:scroll-into-view="itemId">
					<view v-for="(item,index) in goods" :key="index" class="u-tab-item"
						:class="[current == index ? 'u-tab-item-active' : '']" @tap.stop="swichMenu(index)">
						<u-image width="40rpx" height="40rpx" :src="item.picture"></u-image>
						<text style="margin-top: 10rpx;" class="u-line-1">{{item.categoryName}}</text>
					</view>
				</scroll-view>
				<scroll-view :scroll-top="scrollRightTop" scroll-y scroll-with-animation class="right-box"
					@scroll="rightScroll">
					<!-- <u-swiper mode="none" class="swiper" :list="list"></u-swiper> -->
					<view class="page-view">
						<view class="class-item" :id="'item' + index" v-for="(item , index) in goods" :key="index">
							<view class="item-title">
								<text>{{item.categoryName}}</text>
							</view>
							<!-- <view class="item-container">
								<view class="thumb-box" v-for="(item1, index1) in item.foods" :key="index1">
									<image class="item-menu-image" :src="item1.icon" mode=""></image>
									<view class="item-menu-name">{{item1.name}}</view>
								</view>
							</view> -->
							<view @tap="choose(item1.productId)" class="item-detail"
								v-for="(item1, index1) in item.cmenuShopProductAOList" :key="index1">
								<u-image class="item-img" width="250rpx" height="250rpx" :src="item1.mainPicture">
								</u-image>
								<view class="item-goods">
									<text class="goods-name">{{item1.productName}}</text>
									<view class="item-tags">
										<text v-for="(name,index2) in item1.tagAOList" :key="index2"
											:style="{color:`#${name.colour}`}">{{name.value}}</text>
									</view>
									<text class="item-material">{{item1.sketch}}</text>
									<view class="item-price">
										<view :class="{gray:item1.sellState != 0}" class="price-num">
											￥ <text>{{item1.minPrice}}</text> 起
										</view>
										<text
											:class="{choose:item1.sellState === 0,unsell:item1.sellState != 0}">{{item1.sellState === 0? '选规格' : '待售'}}</text>
									</view>
								</view>
							</view>

						</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<u-popup style="position: relative; z-index: 20001;" class="pop" v-model="show" mode="bottom" height="90%" border-radius="40"
			closeable="true" close-icon-size="40">
			<view class="fixed">
				<view class="al_choose">
					已选规格 ：{{sp_value}}<text style="margin-left: 10rpx;" v-for="(item,index) in op_value" :key="index">{{item}}</text> 
				</view>
				<view class="al_price">
					<view class="price">
						￥ {{total_price}}
					</view>
					<u-number-box  disabled-input="true" :min="1" v-model="value" @change="valChange"></u-number-box>
				</view>
				<view class="bus" @tap="addToBag">
					<text>加入购物袋</text>
				</view>
			</view>
			<view class="goods-pic">
				<u-image width="220rpx" height="220rpx" :src="goods_detail.mainPicture"></u-image>
			</view>
			<view class="goods-desc">
				<view class="g-title">
					{{goods_detail.name}}
				</view>
				<view class="g-tags">
					<text :style="{color:`#${item.colour}`}" v-for="(item,index) in goods_detail.tagAOList" :key="index">{{item.value}}</text>
				</view>
				<view class="g-desc">
					{{goods_detail.sketch}}
				</view>
			</view>
			<view class="" style="padding-bottom: 300rpx;">
				<view class="specifi">
					<view class="sp-top">
						规格 <text style="margin-left: 5rpx;color: #f7c966;">(*必选)</text>
					</view>
					<view class="sp-bottom">
						<text @tap="changeSp(item,index)" :class="{active: sp_index === index}" v-for="(item,index) in goods_detail.cmenuShopProductSkuAOList" :key="index">{{item.skuName}}</text>
					</view>
				</view>
				<view class="option" v-for="(item,index) in goods_detail.cmenuShopProductAttrAOList" :key="index">
					<view class="op-top">
						{{item.attrName}}
						<text style="margin-left: 5rpx;color:#f7c966 ;" v-show="item.isMust"> (*必选) </text>
					</view>
					<view class="op-bottom">
						<view @tap="changeOp(item,index,item1,index1)" :class="{active: op_value[index] === item1.attrValue}" class="op-item" v-for="(item1,index1) in item.cmenuShopProductAttrValueAOList" :key="index1">
							<text  v-show="item1.price" class="price">￥{{item1.price}}</text>
							<text class="desc">{{item1.attrValue}}</text>
						</view>
					</view>
				</view>
			</view>
			
		</u-popup>

		<view class="shop_car" v-if="shop_car.length != 0">
			<view class="shop_left" @tap="showDetail">
				<view class="bag">
					<u-image width="80rpx" height="80rpx" src="/static/bag.png"></u-image>
					<text class="bagde">{{shop_car.length}}</text>
				</view>
				<view class="total">
					￥ {{mainprice}}
				</view>
			</view>
			<view class="shop_right" @tap="toBill">
				选好了
			</view>
		</view>
		
		<u-popup class="pop" v-model="show1" mode="bottom" border-radius="40" height="60%">
			<view class="clear_bag">
				<view class="">
					已选商品
				</view>
				<view class="clear_icon" @tap="clearCar">
					<u-icon name="trash"></u-icon>
					<text style="margin-left: 5rpx;">清空购物袋</text>
				</view>
			</view>
			<view class="bag_content">
				<view class="bc_item" v-for="(item,index) in shop_car" :key="index">
					<view class="bc_left">
						<u-image width="140rpx" height="140rpx" :src="item.detail.mainPicture"></u-image>
						<view class="bc_detail">
							<text class="bc_title">{{item.detail.name}}</text>
							<view class="bc_desc">
								<text style="margin-right: 3rpx;">{{item.sp_value}}</text>
								<text style="margin-right: 3rpx;" v-for="(item1,index1) in item.value" :key="index1">{{item1}}</text>
							</view>
							<text class="bc_price"> ￥ {{item.price}}</text>
						</view>
					</view>
					<view class="bc_right">
						<view class="decre" @tap="bc_decre(item,index)">
							<u-icon name="minus" size="24" color="#979797"></u-icon>
						</view>
						<view class="bc_num">
							{{item.number}}
						</view>
						<view class="incre" @tap="bc_incre(item)">
							<u-icon name="plus" size="24" color="#fff"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				sp_index: 0,
				total_price:0,
				add_price:0,
				bei_price:0,
				op_value:[
					'','','','','',''
				],
				al_choose:[],
				sp_value:"",
				list: [{
					image: "/static/carousel/1.jpg"
				}],
				scrollTop: 0, //tab标题的滚动条位置
				oldScrollTop: 0,
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				itemId: '', // 栏目右边scroll-view用于滚动的id
				menuItemPos: [],
				arr: [],
				scrollRightTop: 0, // 右边栏目scroll-view的滚动条高度
				timer: null, // 定时器
				goods: [],
				show: false,
				show1:false,
				goods_detail: {},
				value: 1,
				shop_car:[]
			};
		},

		onReady() {
			this.getMenuItemTop()
		},
		
		// computed:{
		// 	op_desc(){
		// 		return this.goods_detail.cmenuShopProductSkuAOList[0].skuName
		// 	}
		// },

		methods: {
			
			changeStore(){
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
			
			toBill(){
				this.SET_bill({
					shop_car:this.shop_car,
				})
				uni.navigateTo({
					url:"../bill/bill"
				})
			},
			
			...mapMutations(['SET_bill']),
			
			clearCar(){
				this.shop_car = []
				this.show1 = false
			},
			
			bc_decre(item,index){
				if(item.number <= 1){
					this.shop_car.splice(index,1)
					if(this.shop_car.length === 0){
						this.show1 = false
					}
					return
				}
				let per = item.price / item.number
				item.number--
				item.price -= per
				
			},
			
			bc_incre(item){
				let per = item.price / item.number
				item.number++
				item.price += per
			},
			
			showDetail(){
				this.show1 = !this.show1
			},
			
			addToBag(){
				// console.log(this.goods_detail.cmenuShopProductAttrAOList);
				let tempArr = []
				let a = 0
				this.goods_detail.cmenuShopProductAttrAOList.forEach(ele =>{
					if(ele.type === 0){
						tempArr.push(ele)
					}
				})
				tempArr.forEach(ele => {
					ele.cmenuShopProductAttrValueAOList.forEach(ele1 => {
						this.op_value.forEach(ele2 => {
							if(ele2 === ele1.attrValue){
								a++ 
							}
						})
					})
				})
				
				if(a < tempArr.length){
					uni.showToast({
						title:"请选择必选项",
						icon:"none"
					})
				}else{
					let tempArr = {}
					tempArr.price = this.total_price
					tempArr.value = this.op_value
					tempArr.detail = this.goods_detail
					tempArr.number = this.value
					tempArr.sp_value = this.sp_value
					this.shop_car.push(tempArr)
					this.show = false
				}
			},
			
			
			// 点击左边的栏目切换
			async swichMenu(index) {
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (index == this.current) return;
				this.scrollRightTop = this.oldScrollTop;
				this.$nextTick(function() {
					this.scrollRightTop = this.arr[index];
					this.current = index;
					this.leftMenuStatus(index);
				})
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({
						size: true
					}, res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if (!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return;
						}
						this[dataVal] = res.height;
						resolve();
					}).exec();
				})
			},
			// 观测元素相交状态
			async observer() {
				this.tabbar.map((val, index) => {
					let observer = uni.createIntersectionObserver(this);
					// 检测右边scroll-view的id为itemxx的元素与right-box的相交状态
					// 如果跟.right-box底部相交，就动态设置左边栏目的活动状态
					observer.relativeTo('.right-box', {
						top: 0
					}).observe('#item' + index, res => {
						if (res.intersectionRatio > 0) {
							let id = res.id.substring(4);
							this.leftMenuStatus(id);
						}
					})
				})
			},
			// 设置左边菜单的滚动状态
			async leftMenuStatus(index) {
				this.current = index;
				// 如果为0，意味着尚未初始化
				if (this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取右边菜单每个item到顶部的距离
			getMenuItemTop() {
				new Promise(resolve => {
					let selectorQuery = uni.createSelectorQuery();
					selectorQuery.selectAll('.class-item').boundingClientRect((rects) => {
						// 如果节点尚未生成，rects值为[](因为用selectAll，所以返回的是数组)，循环调用执行
						if (!rects.length) {
							setTimeout(() => {
								this.getMenuItemTop();
							}, 10);
							return;
						}
						rects.forEach((rect) => {
							// 这里减去rects[0].top，是因为第一项顶部可能不是贴到导航栏(比如有个搜索框的情况)
							this.arr.push(rect.top - rects[0].top);
							resolve();
						})
					}).exec()
				})
			},
			// 右边菜单滚动
			async rightScroll(e) {
				this.oldScrollTop = e.detail.scrollTop;
				if (this.arr.length == 0) {
					await this.getMenuItemTop();
				}
				if (this.timer) return;
				if (!this.menuHeight) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
				}
				setTimeout(() => { // 节流
					this.timer = null;
					// scrollHeight为右边菜单垂直中点位置
					let scrollHeight = e.detail.scrollTop + this.menuHeight / 2;
					for (let i = 0; i < this.arr.length; i++) {
						let height1 = this.arr[i];
						let height2 = this.arr[i + 1];
						// 如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可
						if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
							this.leftMenuStatus(i);
							return;
						}
					}
				}, 10)
			},

			choose(id) {
				uni.showLoading({
					title:"请稍后"
				})
				this.sp_index = 0
				this.value = 1
				this.add_price = 0
				this.op_value = [
					'','','','','',''
				]
				uniCloud.callFunction({
					name: "gm_getGoodsDetail",
					data: {
						id
					},
					success: (res) => {
						console.log(res.result.data[0]);
						if(res.result.data[0].sellState === 3){
							return
						}else{
							this.show = true
							uni.hideLoading()
						}
						this.goods_detail = res.result.data[0]
						this.sp_value = this.goods_detail.cmenuShopProductSkuAOList[0].skuName
						this.total_price = this.goods_detail.cmenuShopProductSkuAOList[0].sellPrice 
						this.bei_price = this.goods_detail.cmenuShopProductSkuAOList[0].sellPrice 
					}
				})
			},

			valChange(e) {
				console.log('当前值为: ' + e.value)
				this.total_price = (this.bei_price + this.add_price) * this.value
			},
			
			changeSp(item,index){
				this.sp_index = index
				this.sp_value = item.skuName
				this.bei_price = item.sellPrice 
				this.total_price = (this.bei_price + this.add_price) * this.value
			},
			
			changeOp(item,index,item1,index1){
				if(this.op_value[index] === item1.attrValue ) {
					this.op_value.splice(index,1,'')
					if(item.type === 1) {
						console.log(item1.price);
						this.add_price = 0
						this.total_price = (this.bei_price + this.add_price) * this.value
					}
				}else{
					this.op_value.splice(index,1,item1.attrValue)
					if(item.type === 1) {
						console.log(item1.price);
						this.add_price = item1.price
						this.total_price = (this.bei_price + this.add_price) * this.value
					}
				}
			}
		},
		
		// onLoad() {
		// 	uni.navigateTo({
		// 		url:"../location/location"
		// 	})
		// },
		
		onTabItemTap() {
			if(!this.isLogin){
				this.wxlogin()
			}
		},

		onShow() {
			
			// this.shop_car = []
			// this.show1 = false
			
			if(this.isLogin){
				console.log("已登录");
				if (this.address.distance) {
					console.log("有地址");
					uniCloud.callFunction({
						name: "gm_getGoods",
						success: (res) => {
							console.log(res.result[0].data);
							this.goods = res.result[0].data
						}
					})
				}else{
					uni.showModal({
						title:"选择门店",
						content:"请选择要下单的门店地址",
						success: (res) => {
							if(res.confirm){
								console.log("确认");
								uni.navigateTo({
									url:"../location/location"
								})
							}
						}
					})
				}
			}
		},

		computed: {
			...mapState(["address","isLogin"]),
			
			mainprice(){
				let money = 0
				this.shop_car.forEach(ele => {
					money += ele.price
				})
				return money
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./order.scss"
	
</style>
