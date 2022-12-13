// pages/shows/management/index.js
import event from '@codesmiths/event';
import { checkShowExpired } from '../../../utils/util';

const globalData = getApp().globalData;

Page({

	/**
	 * Page initial data
	 */
	data: {
		index: 0,
		isMenuShow: false,
		category: ['近期热演', '往期演出']
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
	 * navigate to show new page
	 */
	onNavigateToShowNew() {
		wx.navigateTo({
			url: '/pages/shows/new/index'
		})
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
	 * fetch created shows
	 */
	onFetchCreatedShows() {
		// 1. find user id
		const _this = this;
		const { id } = globalData.user;

		// 2. fetch shows created by this user
		wx.request({
			url: `${globalData.baseUrl}/users/${id}/created_shows`,
			header: globalData.header,
			success(res) {
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
		// get all shows created by current user
		if (globalData.header) {
			this.onFetchCreatedShows()
		} else {
			event.on('tokenReady', this, this.onFetchCreatedShows)
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