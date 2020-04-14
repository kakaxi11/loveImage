<template>
	<view>分类</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
	mounted(){
		console.log('为啥同时创建')
		uni.setNavigationBarTitle({
			title:'分类'
		})
	}}
	//在组件中要动态改变顶部栏中的文字，需要调用这个方法
</script>

<style>
</style>