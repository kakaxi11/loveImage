<template>
	<view class="" @click="handlechange">
		
		
		<slot>
			
		</slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:['list','index'],
		methods:{
			handlechange(){
			getApp().globalData.list = this.list
			getApp().globalData.index = this.index
			// 把数据存储到uni小程序的全局变量里去，可以在每个页面存取。
			uni.navigateTo({   //uniapp的跳转函数，类似于原生vue的push()
				url:'/pages/pcdt/index'
			})	
			}
		}
	}
</script>

<style>
</style>
