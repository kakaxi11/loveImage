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
<swiper-actions @swiperaction="handleSwiperAction"> 
<!-- 监听子组件的滑动 -->
	<image :src="imgurl" mode="widthFix"></image>
	</swiper-actions>
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
	<view class="zhuanjiitem" v-if="album.length">
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
<view class="betterhot">
	<view class="hot" v-if="hot.length">
		<view class="png">
			<image src="../../static/image/hot.png"></image>
		</view>
		<view class="text">
			最热评论
		</view>
	</view>
	<view class="list" v-for="item in hot" :key="item.id">
		<view class="shangmianyiceng">
		<view class="picicontouxiang">
			<image :src="item.user.avatar" mode="widthFix"></image>
		</view>
		<view class="usertext">
			<view class="name">{{item.user.name}}</view>
			<view class="time">{{item.atime}}</view>
		</view>
		<view class="xunzhang">
				<view class="xunz" v-for="items in item.user.title">
					<image :src="items.icon" mode="widthFix"></image>
				</view>
		</view>
		</view>
		<view class="xiamianyiceng">
			<view class="pinglun">{{item.content}}</view>
			<view class="yesdian">
				<view class="iconfont icon-wei-">
				{{item.size}}
				</view>
			</view>
		</view>
		
		
	</view>
</view>
<view class="new" v-if="comment.length">
	<image src="../../static/image/pinglun.png" mode=""></image>
	<view class="text" >最新评论</view> 
</view>
<view class="betterhot">
	<view class="hot">
		
	</view>
	<view class="list" v-for="item in comment" :key="item.id">
		<view class="shangmianyiceng">
		<view class="picicontouxiang">
			<image :src="item.user.avatar" mode="widthFix"></image>
		</view>
		<view class="usertext">
			<view class="name">{{item.user.name}}</view>
			<view class="time">{{item.atime}}</view>
		</view>
		<view class="xunzhang">
				<view class="xunz" v-for="items in item.user.title">
					<image :src="items.icon" mode="widthFix"></image>
				</view>
		</view>
		</view>
		<view class="xiamianyiceng">
			<view class="pinglun">{{item.content}}</view>
			<view class="yesdian">
				<view class="iconfont icon-wei-">
				{{item.size}}
				</view>
			</view>
		</view>
		
		
	</view>
</view>
<view class="download" @click="handledownload">
	<view class="text">
		下载图片
	</view>
</view>
	</view>
</template>

<script>
	import moment from 'moment'
	moment.locale('zh-cn'); 
	import swiperActions from './swiperAction.vue'
	//moment改为中文显示
	export default {
		data() {
			return {
				imgdetail:{},
				imgurl:'',
				album:[],
				comment:[],
				hot:[],
				imgindex:0
			}
		},
		components:{
			swiperActions
		},
		onLoad() {
		 this.imgdetail = getApp().globalData.list[getApp().globalData.index]
		
		 // +this.imgdetail.rule.replace('$<Height>',360)
		 //这里为了让程序不报小bug，我们先将数据imgurl拿到，再渲染到图片的src。
		 this.imgdetail.chinatime = moment(this.imgdetail.atime*1000).fromNow()
		 //moment库 
		 this.imgindex = getApp().globalData.index;
		 this.getlsit()
		 
		},
		methods: {
			async handledownload(){    //使用async简化promise
			 //下面是两个uniapp下载图片的两个api，返回的都是promise。
			await uni.showLoading({
				title:'图片下载中'
			})
			const result= await uni.downloadFile({
					url:this.imgdetail.img
				})     
			const tempFilePath = await result[1].tempFilePath   //微信小程序提供的图片地址
			await uni.saveImageToPhotosAlbum({
				filePath:tempFilePath
			})
			uni.hideLoading();
			console.log(result);
			await uni.showToast({
				title:'下载成功',
			})
			
			},
			getlsit() {
			this.request({
				url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${this.imgdetail.id}/comment`
			}).then((res)=>{
				console.log(res);
				this.album = res.res.album
				this.comment = res.res.comment
				this.hot = res.res.hot
				 this.imgurl = this.imgdetail.thumb
			})
			},
			handleSwiperAction(e){
				// 切换图片,left index++
				const {list}= getApp().globalData
			
				if(e==="left"&&this.imgindex<list.length-1)
				{
					this.imgindex++;
					this.imgdetail = list[this.imgindex]
					this.getlsit()
				}
				else if(e==='right'&&this.imgindex!==0)
				{
					this.imgindex--;
					this.imgdetail = list[this.imgindex]
					this.getlsit()
				}
				else{
					//如果不满足则提示图片没有了， 并退出
					uni.showToast({
						title:'没有图片数据了',
						icon:'none'
					})
					return;
				}
			}
		}
		
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
	.img{
		border-bottom:3rpx  solid #bcbcbc;
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
			  padding:0 26rpx;
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
	    }
	  }
	}
	
	.betterhot {
		margin-top:12rpx;
		padding:12rpx 0;
		border-top:7rpx solid #dadada;
	  .hot {
		  display:flex;
		  align-items:center;
	    .png {
			image{
				width: 50rpx;
				height: 50rpx;
				
			}
			padding-right:10rpx;
	    }
	
	    .text {
	
	    }
	  }
	
	  .list {
		  border-bottom:3.5rpx solid #e1e1e1;
	    .shangmianyiceng {
			display:flex;
			padding:15rpx 8rpx;
			align-items:center;
			
	      .picicontouxiang {
				width:70rpx;
				height:70rpx;
				margin:18rpx 27rpx 15rpx 2rpx;
				border-radius:4px;
				
				
	      }
	
	      .usertext {
			  flex:9;
	        .name {
			color:#a5a5a5;
	        }
	
	        .time {
			color:#7d7d7d;
	        }
	      }
		  .xunzhang{
		  flex:1;
		  display:flex;
		  justify-content:flex-end;
		  	.xunz{
		  		width: 48rpx;
		  		height: 48rpx;
				
		  	}
		  }
	    }
	
	    .xiamianyiceng {
			display:flex;
			justify-content:space-between;
			margin-right:4rpx;
			align-items:center;
			font-size:25rpx;
	      .pinglun {
		font-weight:600;
		color:#000000;
		margin-left:106rpx;
		padding-bottom:15rpx;
		font-size:30rpx;
	      }
	.yesdian
	      {
			   display:flex;
				width: 80rpx;
				justify-content:space-around;
			  .iconfont.icon-dianzan {  
			  			 
			  			
			  }
		  }
	    }
	  }
	}
	.new{
		display:flex;
		align-items:center;
		
		image{
			width: 50rpx;
			height: 50rpx;
			margin-left:5rpx;
		}
	}
	.download{
		
			display:flex;
			height:78rpx;
			width: 100%;
			justify-content:center;
			align-items:center;
		.text{
			width:90%;
			height:93%;
			display:flex;
			justify-content:center;
			align-items:center;
			font-size:40rpx;
			font-weight:600;
			color:#fff;
			background-color:$color;
		}
		
	}
	
	
</style>





