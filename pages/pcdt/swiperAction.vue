<template>
	
	<view
	@touchstart="handleclick" 
	@touchend="handleclickleave"     
	>
	
	<!-- 通过这两个点击事件来做一个滑动翻页的组件 -->
		<slot></slot>
	</view>
	
</template>

<script>
	export default{
		data() {
			return {
				
				starttime:0,
				djx:0,  	
				// 点击时的时间
				// 点击时的坐标
				djy:0,
				deraction:''
			}
		},
	methods: {
		handleclick(event) {
			// 点击时触发
			this.starttime = Date.now();
			this.djx = event.changedTouches[0].clientX
			this.djy = event.changedTouches[0].clientY
			console.log(this.djx,this.djy,this.starttime);
			
		},
		
		handleclickleave(event){
			// 离开时触发
			const nowx = event.changedTouches[0].clientX
			const nowy= event.changedTouches[0].clientY
			const nowtime = Date.now()
			if(nowtime-this.starttime<2000)   //滑动的时间不能超出2s
			{
				if(Math.abs(nowx-this.djx)>=10&&Math.abs(nowy-this.djy<20))   //再判断左右滑动是否超过了10，这里要用绝对值，因为往左滑动计算出是负数。
				{
						this.deraction = nowx-this.djx>=10?'right':'left'
						// 这里根据deraction就可以进行滑动事件切换图片了.
						this.$emit('swiperaction',this.deraction)
						
				}
			}
			return;
		}
	}
	}
</script>

<style>
</style>
