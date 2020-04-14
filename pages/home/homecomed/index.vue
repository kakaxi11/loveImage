<template>
	<view>最新</view>
</template>

<script>
	export default{
		data(){
			return{
				
			
		}
	},
	mounted(){
		uni.setNavigationBarTitle({
			title:'最新'
		})
	}
	}
	//在组件中要动态改变顶部栏中的文字，需要调用这个方法
</script>

<style>
</style>