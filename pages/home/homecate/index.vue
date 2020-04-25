<template>
	<view class="big">
		<navigator class="item" v-for="item in catelist" :key="item.id"
		:url="`/pages/imgd/index?id=${item.id}`"
		>
			<image :src="item.cover" mode="aspectFill"></image>
			<view class="text">{{item.name}}</view>
		</navigator>
	</view>
</template>

<script>
	export default{
		data(){
			return{
			catelist:[]
		}
	},
	mounted(){
		uni.setNavigationBarTitle({
			title:'分类'
		}),
		this.getlist()
	},
	methods: {
		getlist() {
			this.request({
				url:'http://157.122.54.189:9088/image/v1/vertical/category'
			}).then(res=>{
				this.catelist = res.res.category;
				console.log(this.catelist);
			})
			
		}
	},
	}
	//在组件中要动态改变顶部栏中的文字，需要调用这个方法
</script>

<style lang="scss" scoped>
	.big {
		display:flex;
		flex-wrap:wrap;
	  .item {
			width: 33.33%;
			border:4rpx solid #fff;
			position:relative;
	    image {
			  
			  height: 224rpx;
	    }
	
	    .text {
			display:flex;
			align-items:center;
		height: 50rpx;
		width:100%;
	background-image: linear-gradient(to right top,rgba(0,0,0,.2),rgba(0,0,0,0));
		// 从左边到右上背景颜色渐变css属性。
		position:absolute;
		left:0;
		bottom:0;
		padding-left:20rpx;
		padding-bottom:1rpx;
		color:#fff;
		font-size:35rpx;
	    }
	  }
	}
</style>