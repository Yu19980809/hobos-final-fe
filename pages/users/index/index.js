// pages/users/index/index.js
const globalData = getApp().globalData;

Page({

	/**
	 * Page initial data
	 */
	data: {

	},

	/**
	 * log out
	 */
	onLogout() {
		wx.showModal({
			title: '注销提醒',
			content: '确认注销当前账号吗？',
			complete: (res) => {
				if (res.confirm) {
					console.log('log out');
				}
			}
		})
	},

	/**
	 * go to following page
	 */
	onNavigateToFollowing() {
		wx.navigateTo({
			url: '/pages/followings/index/index',
		})
	},

	/**
	 * go to info page
	 */
	onNavigateToInfo() {
		wx.navigateTo({
			url: '/pages/users/edit/index',
		})
	},

	/**
	 * go to booking history
	 */
	onNavigateToBookingHistory() {
		wx.navigateTo({
			url: '/pages/bookings/index/index',
		})
	},

	/**
	 * go to show management
	 */
	onNavigateToShowManagement() {
		wx.navigateTo({
			url: '/pages/shows/management/index',
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
	 * fetch user data
	 */
	onFetchUserData() {
		const { id } = globalData.user;

		wx.request({
			url: `${globalData.baseUrl}/users/${id}/infos`,
			header: globalData.header,
			success(res) {
				console.log('fetch user data', res);
			}
		})
	},

	/**
	 * Lifecycle function--Called when page show
	 */
	onShow() {
		// fetch user data
		this.setData({ user: globalData.user });
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