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
   <view class="content">
	   <!-- 如果这里使用v-show（说明这里已经直接把4个组件都先创建了，只是通过v-show隐藏起来），那么这些组件的mounted将出现问题。 -->
       <view v-if="current!=4">
          <mainfile :objp="items[current]"></mainfile>   
		  <!-- 通过props传递数据给子组件，curretn可以用来做数组的下标 -->
       </view>
       <view v-if="current === 4">
          <fourfile :objp="items[current]"> </fourfile>
       </view>
      </view>
  </view>
</template>


	<!-- map函数的类似于foreach -->
<!-- 	使用uni-ui需要安装sass，有时候报错重启可以解决问题。 -->

<script>
import mainfile from './mainfile/index.vue'
import fourfile from './fourfile/index.vue'
import {uniSegmentedControl} from '@dcloudio/uni-ui'  //uni-app开发有时候引入组件后报错，可以加上花括号，然后重启。
export default {
		 data() {
		        return {
		            items:[
						{tittle:'推荐',url:'http://157.122.54.189:9088/videoimg/v1/videowp/featured',params:{limit:30,skip:0,order:'hot'}},
						{tittle:'娱乐',url:'http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',params:{limit:30,skip:0,order:'new'}},
						{tittle:'最新',url:'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',params:{limit:30,skip:0,order:'new'}},
						{tittle:'热门',url:'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',params:{limit:30,skip:0,order:'hot'}},
						{tittle:'分类',url:'http://157.122.54.189:9088/videoimg/v1/videowp/category',params:{}}
						],
		            current: 0
		        }
		    },
		    methods: {
		        onClickItem(e) {
		            if (this.current !== e.currentIndex) {   //如果判断下标相等，说明用户点的还是当前页面，则不用换页。
		                this.current = e.currentIndex;
		            }
		        }
		},
	
	components:{
		uniSegmentedControl,
		mainfile,
		fourfile
	}
	
}
</script>

<style lang="scss" scoped>
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
	height:calc(100vh - 35rpx);
	
}

</style>