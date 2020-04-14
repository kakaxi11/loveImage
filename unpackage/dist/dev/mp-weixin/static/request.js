//封装了uniap的类似ajax请求函数
export default (params)=>{
	
uni.showLoading({
	title:"加载中哦"
})
	
	return new Promise((resolve,reject)=>{
		wx.request({
		...params,
		success(res){
			resolve(res.data);
		},
		fail(err){
		reject(err);	
		},
		complete(){
			uni.hideLoading();
		}
		})
	})
}