<template>
	<view >
	<scroll-view  class="ssc" scroll-y  @scrolltolower="handlescroll" >  
	<!-- scroll组件,把需要滚动的部分放在这个标签里，需要给它设置一个高度，且高度正确否则会滚动内容看不到， -->
	<!-- 如果是上下滚动，需要把scroll-y改为true。 该组件有很多事件，例如滚动条触底事件。 -->
				<!-- 专辑推荐-开始 -->
			<view class="hometj">
				<navigator class="items" v-for="item in hometjst" :key="item.id"
				:url="`/pages/album/index?id=${item.target}`"
				>
				<!-- 点击将跳转到推荐页 -->
					<img :src="item.thumb" alt=""  mode="widthFix"><!-- widthFix图片高度自适应,是微信小程序的属性 -->
				</navigator>
			</view>
			  <!-- 专辑推荐结束 -->
			  <!-- 月份开始 -->
			  <view class="month">
				  <view class="nbmonth">
					 <view class="clmonth"> {{homemonth.day}}
					 
					 <text class="s">/{{homemonth.month}}月 </text>
					 </view>
					{{homemonth.title}}
				  </view>
				  
				  <view class="more">
				  		 更多 >
				  </view>
			  </view>
			  <view class="monthp">
				  
				  <view class="monthitem" v-for="(item,index) in homemonth.items" :key="item.id">
					  			  <godetail :list="homemonth.items" :index="index"> 
								  <!-- 里面的图片就替换上面这个组件的slot -->
					  <img :src="item.thumb+item.rule.replace('$<Height>',360)" alt="" mode="aspectFill"> <!-- 图片的mode属性来源于微信小程序，可以调整图片的显示方式。 -->
					  <!-- replace() 方法用于在字符串中用一些字符替换另一些字符 -->
		<!-- 			  根据返回的数据发现，这里可以通过图片url来调整请求的图片大小。 -->
					  </godetail>
				  </view>
			  </view>
			  <!-- 月份结束 -->
			  <!-- 热门开始 -->
			  <view class="hottext">
				  <view class="a"></view> <text class="b">热门</text></view>
			  <view class="hot">
				  <view class="hotpitem" v-for="(item,index) in hotlist">
					  <godetail :list="hotlist" :index="index">
					  <img :src="item.thumb" alt="" mode="aspectFill">
					  </godetail>
				  </view>
			  </view>
	</scroll-view>
	</view>
</template>
<script>
	import moment from 'moment'
	import godetail from '../godetail.vue'
	export default {
		data() {
			return{
				hometjst:[],
				homemonth:{},
				hotlist:[],
				params:{
					limit:30,
					order:'hot',
					ins:1
				}
			}
		},
		components:{
			godetail
		},
		mounted() {
			this.request({
			url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
			data:this.params
				//请求体
			
			}).then((res)=>{
				this.hometjst = res.res.homepage[1].items
				this.homemonth = res.res.homepage[2]
				this.homemonth.month = moment(res.res.homepage[2].stime).format('MM');
				this.homemonth.day = moment(res.res.homepage[2].stime).format('DD');
			//可以利用moment.js这个库快速对时间戳进行处理转换,需要引入moment.js
				this.hotlist = res.res.vertical
				
			})
		},
	 //注意组件里的声明周期用mounted。
	methods:{
		handlescroll(){
				
			this.request({
			url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
			data:{
				limit:30, //一次请求多少张图片
				order:'hot',          //请求体
				skip:30*this.params.ins  ,
				//skip表示从后端数组的什么位置开始请求
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
				
				this.hotlist = this.hotlist.concat(res.res.vertical)
				this.params.ins++ 
				//一旦触发了下拉触底事件，说明要更新30张新图，此时skip也要更新
				// 才能请求到新的数据,所以设置了一个ins.
			})
			
		}
		
		
	}
	}
</script>
<style lang="scss" scoped>
.ssc{
	height: calc(100vh - 72rpx);
	 // calc计算函数,100vh表示当前屏幕的高度.
	
}	
.hometj{    //推荐部分
	display: flex;
	flex-wrap: wrap;         
	.items{
	width: 50%;
	border:5rpx solid #fff;
	// img{
	// 	width: 100%;   //表示图片即使缩放也要全部显示出来，但是全局样式
		// 我已经写了这个属性所以这里省略
	// 	border: 4rpx solid #FFFFFF;
	// } 
	}
}

//像下面这种类似树形结构的多个类，可以使用插件css tree。
.month {
	display: flex;
	justify-content:space-between;
	padding:10rpx;
  .nbmonth {
	  display: flex;
	  font-weight:700;
	  font-size:36rpx;
	  padding-left:10rpx;
	  color: #666;
    .clmonth {
		color:$color; 
		 //使用uni.css里面的全局变量
    }
	.s{
		color:$color;  //使用uni.css里面的全局变量
		font-size:26rpx;
		padding-right:10rpx;
		
	}
  }
	padding-left:10rpx;
 .more {
		margin-right:5%;
		color:$color;
		font-size:33rpx;
  }
}	
.monthp {
		display: flex;
		flex-wrap: wrap;
		.monthitem{
			width: 33.33%;
			border: 4rpx solid #ffffff;
			
		}
}
.hot{     //热门部分
	display: flex;
	flex-wrap: wrap;
	.hotpitem{
		width: 33.33%;
		border:5rpx solid #ffffff;
	}
}
.hottext{
	display:flex;
	justify-content:flex-start;  //横向对齐方式
	color:$color;
	padding:8rpx 15rpx;
	align-items:center;  //纵向对齐方式
	.a{
		background-color: $color;
		width: 14rpx;
		height: 34rpx;
		margin-right:10rpx;
		
	}
	.b{
		font-size: 36rpx;
		font-weight: 700;
	}
	
}
	
	
</style>
