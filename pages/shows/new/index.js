// pages/shows/new/index.js
import event from '@codesmiths/event';
import { fetchCurrentDate } from '../../../utils/util';

const globalData = getApp().globalData;

Page({

	/**
	 * Page initial data
	 */
	data: {
		index: 0,
		isMenuShow: false,
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
				// set category
				let comedians = [];
				res.data.comedians.forEach(comedian => {
					comedians.unshift(comedian.nickname)
				})
				_this.setData({ comedians: res.data.comedians });
				_this.setData({ category: comedians });
				event.emit('categoryReady')	;
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
	 * post a show
	 */
	onHandleShow(e) {
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

		// 2. check this action is edit or add
		if (this.data.isEdit) {
			// send request to update a show
			this.onUpdateShow(data);
		} else {
			// send request to create a show
			this.onCreateShow(data);
		}		
	},

	/**
	 * send request to update a show
	 */
	onUpdateShow(data) {
		const _this = this;
		const { id } = this.data.show;

		wx.request({
			url: `${globalData.baseUrl}/shows/${id}`,
			method: 'PUT',
			header: globalData.header,
			data: { show: data },
			success(res) {
				// check whether comedian changed or not
				const oldComedian = _this.data.show.comedians[0].nickname;
				const currentComedian = _this.data.category[_this.data.index];
				if(oldComedian !== currentComedian) {
					_this.onDestroyShowComedian(res.data.show.id);
					_this.onCreateShowComedian(res.data.show.id);
				}

				// nagivate to detail page
				wx.navigateTo({
					url: `/pages/shows/show/index?id=${res.data.show.id}`,
				})

				// show toast
				wx.showToast({
					title: '演出更新成功',
				})
			}
		})
	},

	/**
	 * send request to create a show
	 */
	onCreateShow(data) {
		const _this = this;

		wx.request({
			url: `${globalData.baseUrl}/shows`,
			method: 'POST',
			header: globalData.header,
			data: { show: data },
			success(res) {
				// send rquest to create a show_comedian
				_this.onCreateShowComedian(res.data.show.id);

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
	 * send request to create a show_comedian
	 */
	onCreateShowComedian(showId) {
		const comedianName = this.data.category[this.data.index];
		let comedianId;
		this.data.comedians.forEach(comedian => {
			if(comedian.nickname === comedianName) {
				comedianId = comedian.id
			}
		})

		wx.request({
			url: `${globalData.baseUrl}/show_comedians`,
			method: 'POST',
			header: globalData.header,
			data: {
				show_comedian: {
					show_id: showId,
					user_id: comedianId
				}
			}
		})
	},

	/**
	 * send request to delete a show_comedian
	 */
	onDestroyShowComedian(showId) {
		const comedianId = this.data.show.comedians[0].id;
		
		wx.request({
			url: `${globalData.baseUrl}/show_comedians/0?show_id=${showId}&comedian_id=${comedianId}`,
			method: 'DELETE',
			header: globalData.header
		})
	},

	/**
	 * select date
	 */
	bindDateChange: function(e) {
		this.setData({ date: e.detail.value })
	},

	/**
	 * select start time
	 */
	bindStartTimeChange: function(e) {
		this.setData({ startTime: e.detail.value })
	},

	/**
	 * select end time
	 */
	bindEndTimeChange: function(e) {
		this.setData({ endTime: e.detail.value })
	},

	/**
	 * fetch show inf0
	 */
	onFetchShowInfo(id) {
		const _this = this;

		wx.request({
			url: `${globalData.baseUrl}/shows/${id}`,
			header: globalData.header,
			success(res) {
				// set show info
				let { show } = res.data;
				show.date = show.date.replace(/\//g, '-');
				_this.setData({ show });
				event.emit('infoReady');

				// set comedian
				if(_this.data.category) {
					_this.onSetComedian()
				} else {
					event.on('categoryReady', _this, _this.onSetComedian)
				}
			}
		})
	},

	/**
	 * Lifecycle function--Called when page load
	 */
	onLoad(options) {
		const isEdit = options.isEdit || false;
		const id = options.id || null;
		this.setData({ isEdit, id });
	},

	/**
	 * Lifecycle function--Called when page is initially rendered
	 */
	onReady() {

	},

	/**
	 * set comedian
	 */
	onSetComedian() {
		const comedians = this.data.category;
		const comedian = this.data.show.comedians[0];
		const comedianIndex = comedians.findIndex(function(item) {
			return comedian.nickname === item
		})
		this.setData({ index: comedianIndex });
	},

	/**
	 * Lifecycle function--Called when page show
	 */
	onShow() {
		// 获取全部演员
		this.onFetchAllComeidans();

		const isEdit = this.data.isEdit;

		// 设置title
		const title = isEdit ? '编辑演出' : '创建演出';
		wx.setNavigationBarTitle({ title });

		// 获取演出信息（编辑状态下）
		if(isEdit) {
			this.onFetchShowInfo(this.data.id)
		}

		// 设置当前日期和时间
		// 设置club信息
		if(isEdit) {
			if(this.data.show) {
				this.onSetDateTime()
			} else {
				event.on('infoReady', this, this.onSetDateTime)
			}
		} else {
			this.onSetDateTime()
		}
	},

	/**
	 * set data and time
	 */
	onSetDateTime() {
		const isEdit = this.data.isEdit;
		const show = this.data.show;

		this.setData({
			date: isEdit ? show.date : fetchCurrentDate(),
			startTime: isEdit ? show.start_time : '19:00',
			endTime: isEdit ? show.end_time : '21:30',
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