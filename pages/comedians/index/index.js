// pages/comedians/index/index.js
Page({

	/**
	 * Page initial data
	 */
	data: {
        array: [ '演员', '俱乐部' ],
		index: 0
	},

	/**
	 * Lifecycle function--Called when page load
	 */
	onLoad(options) {

	},


    bindPickerChange(e) {
		this.setData({
		  index: e.detail.value
		})
    },
    
	/**
	 * Lifecycle function--Called when page is initially rendered
	 */
	onReady() {

	},

	/**
	 * Lifecycle function--Called when page show
	 */
	onShow() {

	},

	/**
	 * Lifecycle function--Called when page hide
	 */
	onHide() {

	},

	/**
	 * Lifecycle function--Called when page unload
	 */
	onUnload() {

	},

	/**
	 * Page event handler function--Called when user drop down
	 */
	onPullDownRefresh() {

	},

	/**
	 * Called when page reach bottom
	 */
	onReachBottom() {

	},

	/**
	 * Called when user click on the top right corner to share
	 */
	onShareAppMessage() {

	}
})