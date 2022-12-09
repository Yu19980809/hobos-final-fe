// pages/bookings/index/index.js
import event from '@codesmiths/event';
import { checkShowExpired } from '../../../utils/util';

const globalData = getApp().globalData;

Page({

	/**
	 * Page initial data
	 */
	data: {

	},

	/**
	 * navigate to detail page (upcoming show)
	 */
	onNavigateToDetailUpcoming(e) {
		// 1. get id of show
		const { id } = e.currentTarget.dataset;

		// 2. navigate to detail page
		wx.navigateTo({
			url: `/pages/shows/show/index?id=${id}&isExpired=false`,
		})
	},

	/**
	 * navigate to detail page (expired show)
	 */
	onNavigateToDetailExpired(e) {
		// 1. get id of show
		const { id } = e.currentTarget.dataset;

		// 2. navigate to detail page
		wx.navigateTo({
			url: `/pages/shows/show/index?id=${id}&isExpired=true`,
		})
	},

	/**
	 * fetch bookings
	 */
	onFetchBookings() {
		// 1. find user id
		const _this = this;
		const { id } = globalData.user;

		// 2. fetch this user's booked shows
		wx.request({
			url: `${globalData.baseUrl}/users/${id}/bookings`,
			header: globalData.header,
			success(res) {
				// 3. store booked shows
				_this.setData({ bookings: res.data.bookings });
				checkShowExpired(_this, res.data.shows);
			}
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
		if (globalData.header) {
			this.onFetchBookings();
		} else {
			event.on('tokenReady', this, this.onFetchBookings);
		}
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