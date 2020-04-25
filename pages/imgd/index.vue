<template>
	<view>
		<view class="wai">
				<view class="fenduanqi"><uni-segmented-control :current="current" :values="items.map(v=>v.tittle)" @clickItem="onClickItem" style-type="text" active-color="#ea00ea"></uni-segmented-control>
				</view>
				<view class="icon">
					<view class="iconfont icon-search"></view>
				</view>
			</view>
			<!-- 图标推荐使用在线图标的方式，不容易报错 -->
		
		<scroll-view @scrolltolower="chudi"  class="content" scroll-y  enable-flex>  
			   <!-- 如果这里使用v-show（说明这里已经直接把4个组件都先创建了，只是通过v-show隐藏起来），那么这些组件的mounted将出现问题。 -->
		  <view class="item" v-for="item in catelist" :key="item.id">
			  <image :src="item.thumb" mode="widthFix"></image>
		  </view>
		     </scroll-view>
		
	</view>
</template>

<script>
	import {uniSegmentedControl} from '@dcloudio/uni-ui'  
	export default {
		data() {
			return {
				items:[
					{tittle:'最新'},
					{tittle:'热门'},
					],
				current: 0,
				id:'',
				catelist:[],
				params:{
					limit:30,
					skip:0,
					order:'new'
				},
				orders:['new','hot'],
				hasmore:true
			}
		},
		components:{
			uniSegmentedControl
		},
		methods: {
			getlist(){
			this.request({
				url:`http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
				data:this.params
			}).then(res=>{
				if(res.res.vertical.length!=0){
					this.catelist = [...this.catelist,...res.res.vertical];
				}else{
					uni.showToast({
						title:'没有图片了',
						icon:'none'
					})
					return;
				}
				
				
				
			})
				
			},
			chudi(){
				if(this.hasmore){	
				this.params.skip+=this.params.limit
				 this.getlist();
				 }
				 return;
			},
			onClickItem(e) {
			    if (this.current != e.currentIndex) {   //如果判断下标相等，说明用户点的还是当前页面，则不用换页。
			        this.current = e.currentIndex;
					this.params.order = this.orders[e.currentIndex]  //通过这里切换order。
					this.params.skip = 0
					this.catelist = []
					this.getlist()
				}
			}
		},
		onLoad(option) {//onload里面写一个参数就可以接收navagationl路由后面携带的参数
			this.id = option.id
			this.getlist();
			
		}
	}
</script>

<style lang="scss">
.wai{
	position: relative;
	.fenduanqi{
		width: 60%;
		margin:0 auto;
	}
	.icon{
	position: absolute;
	top:50%;
	transform:translateY(-50%);
	right:5%;
	}
}
.content{
	display:flex;
	flex-wrap:wrap;
	height: calc(100vh - 72rpx);
	.item{
		width: 33.33%;
		border:3rpx solid #fff ;
	}
	
}

</style>

