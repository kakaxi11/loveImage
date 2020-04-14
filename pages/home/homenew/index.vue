<template>

		<scroll-view scroll-y class="ssc1" @scrolltolower="handlescroll" >
	<view>
<swiper
		autoplay
		circular
		indicator-dots 
		>
		<!-- 轮播图的属性,自动播放,循环播放,和小圆点指示器 -->
			<swiper-item v-for="item in tplist" :key="item.id">
			<img  :src="item.thumb" alt="">
			</swiper-item>
		</swiper>
		<!-- 轮播图结束 -->
		
		<navigator class="item" v-for="item in itemlist" :key="item.id"
		:url="`/pages/album/index?id=${item.id}`"
		>  
	  <!-- 因为这里是navi链接标签,我们可以拼接？的方式把item.id接上-->
			<view class="left">
				<img :src="item.cover" alt="" mode="aspectFill">
			</view>
			<view class="right">
				<view class="biaoti">{{item.name}}</view>
				<view class="miaosu">{{item.desc}}</view>
				<view class="btn">+关注</view>
			</view>
		</navigator>
	</view>
		</scroll-view>
	
</template>

<script>
	export default{
		data(){
			return{
				params:{
					limit:20,
					order:'new',
					skip:0,
					ins:1
				},
				tplist:[],
				itemlist:[]
			}
		},
	mounted(){   //为啥我还没有点开这个组件就已经执行了？因为你那边使用了v-show
		console.log('此时才到mounted')
		uni.setNavigationBarTitle({title:"专辑"})  //bug，不能动态修改？因为使用了v-show。
		this.reques();
		},
		methods:{
		reques(){
			this.request({
				url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
				params:this.params
			}).then((res)=>{
				console.log(res)
				console.log('为啥')
				this.tplist = res.res.banner
				this.itemlist = res.res.album
			})
		},
		
		handlescroll(){
			console.log('触底了')
			this.request({
			url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
				data:{
					limit:this.params.limit,
					order:this.params.order,
					skip:20*this.params.ins
				}
			}).then((res)=>{
				if(this.params.ins===5)
				{
						uni.showToast({
							title:'没有图片咯',
							icon:'none'
						})
					return;
				}
				
				// this.itemlist = this.itemlist.concat(res.res.album)
				this.itemlist = [...this.itemlist,...res.res.album] //数组解构组合成新数组
				this.params.ins++ 
			})
	}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		}	
	}
	//在组件中要动态改变顶部栏中的文字，需要调用这个方法
</script>

<style lang="scss" scoped>
	.ssc1{
		height:calc(100vh - 72rpx);
		
	}
	swiper{
		height: calc(750rpx / 2.3);
		 /* 2.3是图片的宽高比例 */
		  /*通过rpx自适应计算得到自适应的图片高 */ 
		  img{
			  height: 100%;
		  }
		 }
		
	
	.item {
		display:flex;    //css可是要在末尾加上分号的别忘记了
		border-bottom:2rpx solid #ccc;
		padding:6rpx;
	  .left {
		  flex: 1;
		  padding:8rpx 8rpx;
	    img {
			width:210rpx;
			height: 210rpx;
		
	    }
	  }
	  .right {
		  flex: 2;
		  padding:8rpx 10rpx;
		  overflow:hidden;  //添加这个属性才行。 flex布局如果文字一行显示会将盒子撑宽不能实现...省略效果。
	    .biaoti {
		font-size:35rpx;
	    }
	
	    .miaosu {
		padding:10rpx 0;
		font-size:26rpx;
		color:#797979;
		text-overflow:ellipsis;
		overflow: hidden;
		white-space:nowrap;  //让文字一行显示多余显示...
	
		}
	
	    .btn {
		font-size:30rpx;
		padding:4rpx 2rpx;
		width:95rpx;
		border:1rpx solid $color;
		color: $color;
		margin-left:78%;
		margin-top:6%;
	    }
	  } 
	} 
</style>
