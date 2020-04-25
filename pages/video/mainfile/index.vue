<template>
	<scroll-view scroll-y enable-flex class="content" @scrolltolower="chudi">
		<view class="item" v-for="item in vielist"  :key="item.id"  @click="imgtz(item)">
			<image :src="item.img" mode="widthFix">
				
			</image>
		</view>
		
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
			vielist:[],
			hasmore:true
			}
		},
		components: {
			
		},
		props:{
			objp:Object
		},
		mounted(){
			console.log(this.objp);
			console.log('新创建的组件，先请求一遍');
			this.getlist()
		},
		watch:{    //监听data或者props里面的数据实时改变
			objp(){
				console.log('数据已改变来自watch 切换');
				this.vielist = []
				
				this.getlist()
			}
	},
	methods: {
		getlist() {
			this.request({
				url:this.objp.url,
				data:this.objp.params
			}).then(res=>{
				console.log(res);
				if(res.res.videowp.length<1)
				{
					uni.showToast({
						title:'没有更多数据了',
						icon:'none',
					});
					this.hasmore = false;
					return;
				}
			
				this.vielist =[...this.vielist,...res.res.videowp]
				
			
			})
			
		},
		chudi(){
			if(this.hasmore){
				this.objp.params.skip += this.objp.params.limit
				this.getlist()
			}
		},
		imgtz(item){
			getApp().globalData.video = item
			uni.navigateTo({
				url:'/pages/vdxiangqing/index'
			})
		}		
	}
	}
</script>

<style lang="scss" scoped>
	.content{
		height:calc(100vh - 35rpx);
		display:flex;
		flex-wrap:wrap;
		.item{
			width: 33.33%;
			border:4rpx solid #fff;
		}
	}
</style>
