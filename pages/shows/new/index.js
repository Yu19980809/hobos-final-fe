// pages/shows/new/index.js
import { fetchCurrentDate } from '../../../utils/util';

const globalData = getApp().globalData;

Page({

	/**
	 * Page initial data
	 */
	data: {
		startTime: '19:00',
		endTime: '21:30'
	},

	/**
	 * post a show
	 */
	onPostShow(e) {
		// 1. get data user typed
		const { showName, address, description } = e.detail.value;
		const date = this.data.date.replace(/-/g, '/');
		const startTime = this.data.startTime;
		const endTime = this.data.endTime;
		const clubId = this.data.club.id;
		const data = {
			name: showName,
			description,
			address,
			date,
			start_time: startTime,
			end_time: endTime,
			club_id: clubId
		}

		// 2. send request to create a show
		this.onCreateShow(data);
	},

	/**
	 * send request to create a show
	 */
	onCreateShow(data) {
		wx.request({
			url: `${globalData.baseUrl}/shows`,
			method: 'POST',
			header: globalData.header,
			data: { show: data },
			success(res) {
				// nagivate to detail page
				wx.navigateTo({
					url: `/pages/shows/show/index?id=${res.data.show.id}`,
				})

				// show toast
				wx.showToast({
					title: '演出创建成功',
				})
			}
		})
	},

	/**
	 * 选择日期
	 */
	bindDateChange: function(e) {
		this.setData({ date: e.detail.value })
	},

	/**
	 * 选择开始时间
	 */
	bindStartTimeChange: function(e) {
		this.setData({ startTime: e.detail.value })
	},

	/**
	 * 选择结束时间
	 */
	bindEndTimeChange: function(e) {
		this.setData({ endTime: e.detail.value })
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
		// 设置当前日期
		// 设置club信息
		this.setData({
			date: fetchCurrentDate(),
			club: getApp().globalData.user.club
		});
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