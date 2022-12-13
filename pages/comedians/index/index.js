// pages/comedians/index/index.js
const globalData = getApp().globalData;

Page({

	/**
	 * Page initial data
	 */
	data: {
		index: 0,
		isMenuShow: false,
		category: ['演员', '俱乐部']
	},

	/**
	 * get all comedians
	 */
	onFetchAllComeidans() {
		const _this = this;

		wx.request({
			url: `${globalData.baseUrl}/comedians`,
			header: globalData.header,
			success(res) {
				_this.setData({ comedians: res.data.comedians });
			}
		})
	},
		
	/**
	 * get all clubs
	 */
	onFetchAllClubs() {
		const _this = this;

		wx.request({
			url: `${globalData.baseUrl}/clubs`,
			header: globalData.header,
			success(res) {
				_this.setData({ clubs: res.data.clubs });
			}
		})
	},

	/**
	 * 点击下拉显示框
	 */
	onSelectTaps(e) {
		this.setData({ isMenuShow: !this.data.isMenuShow });
	},

	/**
	 * 点击下拉列表
	 */
	onOptionTaps(e) {
		const index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
		this.setData({ index, isMenuShow: !this.data.isMenuShow });
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
		// 获取演员列表和俱乐部列表
		this.onFetchAllComeidans();
		this.onFetchAllClubs();
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