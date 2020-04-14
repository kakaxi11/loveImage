<template>
	<view>
		
		<view class="dingbu">
		<view class="touxiang">
			<image mode="widthFix" :src="imgdetail.user.avatar"></image>
		</view>
		<view class="desc">
			<view class="text">{{imgdetail.user.name}}</view>
			<view class="time">{{imgdetail.chinatime}}</view>
		</view>
</view>
<view class="img">
	<img :src="imgurl" alt="" mode="widthFix">
	
</view>
<view class="dibu">
	<view class="iconfont icon-wei-">
		{{imgdetail.rank}}
	</view>
	<view class="ziyuant">
		<view class="iconfont icon-ziyuan">
		</view>
		<text class="u">
			收藏
		</text>
	</view>
</view>
<view class="zhuanji">
	<view class="juedui">
		<image src="../../static/image/right.png"></image>
	</view>
	<view class="zhuanjitext">
		相关
	</view>
	<view class="zhuanjiitem">
		<view class="itemzhuanji" v-for="item in album" :key="item.id">
			
		<image :src="item.cover" mode="aspectFill"></image>
		
		<view class="text">
			<view class="zjitembiaoti">
				专辑
			</view>
			<view class="zjitemtext">
				{{item.name}}
			</view>
		</view>
		</view>
	</view>
</view>
	</view>
</template>

<script>
	import moment from 'moment'
	moment.locale('zh-cn'); 
	//moment改为中文显示
	export default {
		data() {
			return {
				imgdetail:{},
				imgurl:'',
				album:[]
			}
		},
		onLoad() {
		 this.imgdetail = getApp().globalData.list[getApp().globalData.index]
		 this.imgurl = this.imgdetail.thumb+this.imgdetail.rule.replace('$<Height>',360)
		 //这里为了让程序不报小bug，我们先将数据imgurl拿到，再渲染到图片的src。
		 this.imgdetail.chinatime = moment(this.imgdetail.atime*1000).fromNow()
		 //moment库 
		 this.getlsit()
		},
		methods: {
			getlsit() {
			this.request({
				url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${this.imgdetail.id}/comment`
			}).then((res)=>{
				console.log(res);
				this.album = res.res.album
			})
			}
		},
	}
</script>
   

<style lang="scss" scoped>
	.dingbu {
		display:flex;
		padding:16rpx 22rpx;
		align-items:center;
	  .touxiang {
	    image {
			width: 78rpx;
			height: 80rpx;
			border-radius:50%;  //想让图片变成圆，直接设置50%。
			margin-right:10rpx;
		}
	  }
	  .desc {
		  padding:10rpx 10rpx;
	    .text {
			font-weight:600;
	    }
	    .time {
			color:#ccc;
	
	    }
	  }
	}
	

	
	.dibu {
		height: 80rpx;
			display: flex;
		align-items:center;
		justify-content:center;
		border-bottom:4rpx solid #ccc;
		font-size:28rpx;
	  .iconfont.icon-wei- {
		flex:1;
		display: flex;
		align-items:center;
		justify-content:center;
		
	  }
	  .ziyuant{
		  flex:1;
		display: flex;
		align-items:center;
		justify-content:center;
		
		.iconfont.icon-ziyuan {
				padding:0 10rpx;
		} 
		.u{
			
		}
	  }
	}
	
	
	.zhuanji {
		position:relative;
		.juedui{
			position:absolute;
			top:52%;
			right:5%;
			z-index:99;
			image{
				width: 28rpx;
				height: 28rpx;
			}
		}
	  .zhuanjitext {
			padding:16rpx 0;
	  }
	  .zhuanjiitem {
		  
	    .itemzhuanji {
			display:flex;
			padding:0 16rpx;
	      image {
			flex:1;
			width: 160rpx;
			height: 160rpx;
	      }
		  .text{
			  flex:3;
			  padding:0 20rpx;
			.zjitembiaoti{
				display:flex;
				justify-content:center;
				align-items:center;
				width: 90rpx;
				height: 55rpx;
				border-radius:4rpx;
				background-color:$color;
				color:#ffffff;
			}
			.zjitemtext{	 
				color:#000000;
			}    
		  }
	 