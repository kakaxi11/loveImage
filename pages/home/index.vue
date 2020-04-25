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
       <view v-if="current === 0">
            <homealbum></homealbum>
       </view>
       <view v-if="current === 1">
            <homecate></homecate>
       </view>
       <view v-if="current === 2">
           <homecomed></homecomed>
       </view>
		<view v-if="current === 3">          
		   <homenew></homenew> 
			</view>
        </view>
 
	 
  </view>
</template>


	<!-- map函数的类似于foreach -->
<!-- 	使用uni-ui需要安装sass，有时候报错重启可以解决问题。 -->

<script>

import homealbum from './homealbum'
import homecate from './homecate'
import homecomed from './homecomed'
import homenew from './homenew'
import {uniSegmentedControl} from '@dcloudio/uni-ui'  //uni-app开发有时候引入组件后报错，可以加上花括号，然后重启。
export default {
		 data() {
		        return {
		            items:[{tittle:'推荐'},{tittle:'分类'},{tittle:'最新'},{tittle:'专辑'}],
		            current: 1
		        }
		    },
		    methods: {
		        onClickItem(e) {
		            if (this.current !== e.currentIndex) {   //如果判断下标相等，说明用户点的还是当前页面，则不用换页。
		                this.current = e.currentIndex;
		            }
		        }
		},
		onLoad() {
			
		},
	components:{
		homealbum,
		homecate,
		homecomed,
		homenew,
		uniSegmentedControl
		// uniSegmentedControl,
		// uniLoadMore
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

</style>