<template>
	<view>
		4
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:{
			objp:Object
		},
		components: {
			
		},
		mounted(){
			console.log(this.objp);
			console.log('先请求一遍');
		},
		watch:{    //监听data或者props里面的数据实时改变
			objp(){
				console.log('数据已改变 切换');
			}
		}
	}
</script>

<style>
</style>
