<template>
	<view>
	<view class="shiping">
		
		<image :src="shipingitem.img" mode="" class="kx"></image>
			<button open-type="share" ></button>
		<view class="tubiao">
		<image src="../../static/image/yl.png" mode=""  v-if="!muted" @click="syqh"></image>
		<image src="../../static/image/jy.png" mode="" v-else @click="syqh"></image>
		<image src="../../static/image/zf.png" mode="">
		</image>
		</view>
	<view class="hexinship">
		<video :src="shipingitem.view_video" objectFit="fill" :muted="muted"></video>  
		<!-- muted 是否禁音视频 -->
		<!-- Objecetfit是视频的填充模式 -->
	</view>
	<view class="download" @click="downloadvideo">
		<view class="text">
			下载高清
		</view>
	</view>
	</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				shipingitem:{},
				muted:false
			}
		},
	onLoad() {
		this.shipingitem = getApp().globalData.video
		console.log(this.shipingitem);
	},
	methods:{
		syqh(){
			this.muted = !this.muted
		},
			async downloadvideo(){
				uni.showLoading({
					title:'视频下载中'
				})
			const {tempFilePath} = (await uni.downloadFile({
				url:this.shipingitem.video
			}))[1]                           //微信小程序下载视频的两个步骤
			console.log(tempFilePath);
			 uni.hideLoading()
			 await uni.saveVideoToPhotosAlbum({
			 	filePath:tempFilePath
			 })
			 await uni.showToast({
			 	title:'下载成功'
			 })
		}
	}
	}
</script>

<style lang="scss" scoped>
	.shiping {
		position:relative;
		button{
			position:absolute;
			right:0;
			top:2rpx;
			width: 62rpx;
			height: 62rpx;
			background-color:rgba(0,0,0,0);
			
		}
		.kx{
			position:absolute;
			width: 100vh;
			height: 100vh;
			z-index:-1;
			filter:blur(10px)
		}
	  .tubiao {
		  height: 80rpx;
		  width: 100%;
		  display:flex;
		  justify-content:flex-end;
		  align-items:center;
	    image {
			width: 62rpx;
			height: 62rpx;
	    }
	  }
	
	  .hexinship {
		  display:flex;
		  justify-content:center;
	    video {
			 width: 335rpx;
			 height: 530rpx;
	    }
	  }
	
	  .download {
		  display:flex;
		  justify-content:center;
		  align-items:center;
		  
	    .text {
			width: 320rpx;
			height: 83rpx;
			color:#fff;
			text-align:center;
			line-height:83rpx;
			border-radius:35rpx;
			margin-top:20rpx;
			background-color:rgba(0,0,0,.5);
			border:1rpx solid #fff;
	    }
	  }
	}
</style>
