<template>
	<view>
	<view class="album">
		<img :src="album.cover" alt="" mode="withFix">
		<view class="texts">
			<view class="left">{{album.name}}</view>
			<view class="rightbtn">关注专辑</view>
		</view>
	</view>
	
	
	<view class="biaoti">
		<view class="a">
			<view class="img" mode="">
				<image :src="album.user.avatar" mode="widthFix"></image>
			</view>
			<view class="desc">{{album.user.name}}</view>
		</view>
		<text class="bdesc">
     {{album.desc}}
     	<!-- 如果后台返回的是文本，用text标签包裹最合适，它能够读取换行符 -->   
		</text>
	</view>
	<view class="dibu">
	
		
		<view class="itemimg" v-for="(item,index) in wallpaperst" :key="item.id" >
				<godetail :list="wallpaperst" :index="index">
			<image :src="item.thumb+item.rule.replace('$<Height>',360)" alt="" mode="aspectFill"></image>
			<!-- 通过url调整请求的图片大小。 -->
				</godetail>
		</view>
	
	</view>	
	</view>
</template>

<script>
	import godetail from '../home/godetail.vue'
	export default {
		data() {
			return {
				params:{
					limit:20,
					order:'new',
					skip:0,
					first:1
				},
				id:-1,
				wallpaperst:[],
				album:{},
				haspc:true,
			}
		},
		onLoad(options) {
			console.log(options);
			this.id = options.id
			this.reques()
		},
		onReachBottom() {
			//自带的滚动事件函数，监听整个事件的滚动。
			if(this.haspc ===false)
			{
				uni.showToast({
					title:'没有图片了',
					icon:'none'
				})
				return;
			}
			this.params.first = 0
			this.params.skip = this.params.limit+this.params.skip
			//在这里修改请求参数
			console.log('哈哈哈')
			this.request({
			url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
			data:this.params	
			}).then((res)=>{
			console.log(res);
			if(res.res.wallpaper.length===0){
				this.haspc = false
			}
			this.wallpaperst = [...this.wallpaperst,...res.res.wallpaper]
			})
			
		},
		components:{
			godetail
		},
		methods: {
			reques() {
				this.request({
				url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
				data:this.params	
				}).then((res)=>{
				console.log(res);
				this.album = res.res.album
				this.wallpaperst = res.res.wallpaper
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.album {
		position:relative;
	  img {
	
	  }
	
	  .texts {
		  position:absolute;
		  bottom:0;
		  left:0;
		  width: 100%;
		  display:flex;
		  justify-content:space-between;
		  color:#ffffff;
	    .left {
			font-size:40rpx;
			margin-left:5rpx;
			margin-bottom:8rpx;
			max-width:580rpx;  //写一个max-width做限制，不管文字多大，不能影响到右边的按钮布局。
	    }
	
	    .rightbtn {
			padding:0 4rpx;
			display:flex;
			justify-content:center;
			align-items:center;
			margin-bottom:14rpx;
			width: 132rpx;
			height: 56rpx;
			margin-right:12rpx;
			border-radius:6rpx;
			background-color:$color;   //uni.css的全局属性
	    }
	  }
	}
	.biaoti {
		padding:8rpx;
	  .a {
		  display:flex;
		  align-items:center;
		  padding:10rpx 8rpx;
		  color:#000000;
	    .img {
			width: 50rpx;
	    }
	    .desc {
			margin-left:10rpx;
			font-size:50rpx;
			font-weight:600;
	    }
	  }
	  .bdesc {
	
	  }
	}
	.dibu {
		display:flex;
		flex-wrap:wrap;
	  .itemimg {
		  width:33.33%;
		  border:3rpx solid #ffffff;
		
	    image{
			  height: 130rpx;
	    }
	  }
	}
	
</style>

    