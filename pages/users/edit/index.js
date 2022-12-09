// pages/users/edit/index.js
Page({

	/**
	 * Page initial data
	 */
	data: {
		array: ['Hobo', '演员', '演出发起人'],
		index: 0,
		formData: {
			user_name: '',
			type: '',
            comedian_name: '',
            slogan: '',
            experience: '',
            club_name: '',
			description: '',
		}
	},

	bindPickerChange(e) {
		this.setData({
		  index: e.detail.value
		})
	},

	/**
	 * Lifecycle function--Called when page load
	 */
	onLoad(options) {

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