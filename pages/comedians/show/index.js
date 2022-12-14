// pages/comedians/show/index.js
const globalData = getApp().globalData;

import { checkShowExpired } from '../../../utils/util';

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
	 * follow a club
	 */
	onNewClubFollow(e) {
		const _this = this;
		const id = this.data.clubId;

		wx.request({
			url: `${globalData.baseUrl}/club_followings`,
			method: 'POST',
			header: globalData.header,
			data: { club_following: { club_id: id } },
			success(res) {
				// set this club followed
				_this.setData({ isFollowed: true });

				// update globalData
				getApp().globalData.user.followed_clubs.unshift(_this.data.club);

				// show toast
				wx.showToast({
					title: '关注成功',
				})
			}
		})
	},

	/**
	 * unfollow a club
	 */
	onCancelClubFollow(e) {
		const _this = this;
		const id = this.data.clubId;

		wx.showModal({
			title: '取关提示',
			content: '确认取消关注该俱乐部吗？',
			complete: (res) => {
				if (res.confirm) {
					_this.onDestroyClubFollowing(id)
				}
			}
		})
	},

	 /**
	  * delete a club_following
	  */
	onDestroyClubFollowing(id) {
		const _this = this;

		wx.request({
			url: `${globalData.baseUrl}/club_followings/0?club_id=${id}`,
			method: 'DELETE',
			header: globalData.header,
			success(res) {
				// set this comedian unfollowed
				_this.setData({ isFollowed: false });

				// update globalData
				const clubIndex = globalData.user.followed_clubs.findIndex(function(fc) {
					return fc.id === id
				})
				getApp().globalData.user.followed_clubs.splice(clubIndex, 1);

				// show toast
				wx.showToast({
					title: '取消关注成功',
				})
			}
		})
	},

	/**
	 * follow a comedian
	 */
	onNewComedianFollow(e) {
		const _this = this;
		const id = this.data.comedianId;

		wx.request({
			url: `${globalData.baseUrl}/comedian_followings`,
			method: 'POST',
			header: globalData.header,
			data: { comedian_following: { comedian_id: id } },
			success(res) {
				// set this comedian followed
				_this.setData({ isFollowed: true });

				// update globalData
				getApp().globalData.user.followed_comedians.unshift(_this.data.comedian);

				// show toast
				wx.showToast({
					title: '关注成功',
				})
			}
		})
	},

	/**
	 * unfollow a comedian
	 */
	onCancelComedianFollow(e) {
		const _this = this;
		const id = this.data.comedianId;

		wx.showModal({
			title: '取关提示',
			content: '确认取消关注该演员吗？',
			complete: (res) => {
				if (res.confirm) {
					_this.onDestroyComedianFollowing(id)
				}
			}
		})
	},

	/**
	 * delete a comedian_following
	 */
	onDestroyComedianFollowing(id) {
		const _this = this;

		wx.request({
			url: `${globalData.baseUrl}/comedian_followings/0?comedian_id=${id}`,
			method: 'DELETE',
			header: globalData.header,
			success(res) {
				// set this comedian unfollowed
				_this.setData({ isFollowed: false });

				// update globalData
				const comedianIndex = globalData.user.followed_comedians.findIndex(function(fc) {
					return fc.id === id
				})
				getApp().globalData.user.followed_comedians.splice(comedianIndex, 1);

				// show toast
				wx.showToast({
					title: '取消关注成功',
				})
			}
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
	 * fetch comedian data
	 */
	onFetchComedianInfo(id) {
		const _this = this;

		wx.request({
			url: `${globalData.baseUrl}/users/${id}`,
			header: globalData.header,
			success(res) {
				_this.setData({ comedian: res.data.comedian })
				checkShowExpired(_this, res.data.comedian.shows);
			}
		})
	},

	/**
	 * fetch club data
	 */
	onFetchClubInfo(id) {
		const _this = this;

		wx.request({
			url: `${globalData.baseUrl}/clubs/${id}`,
			header: globalData.header,
			success(res) {
				_this.setData({ club: res.data.club })
				checkShowExpired(_this, res.data.club.shows);
			}
		})
	},

	/**
	 * Lifecycle function--Called when page load
	 */
	onLoad(options) {
		const { comedianId, clubId } = options;
		const isFollowed = options.isFollowed === 'true'
		this.setData({ comedianId, clubId, isFollowed });
		console.log('isFollowed', isFollowed)
		console.log('isFollowed type', this.data.isFollowed)
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
		// fech comedian/club data
		if(this.data.comedianId) {
			this.onFetchComedianInfo(this.data.comedianId)
		} else {
			this.onFetchClubInfo(this.data.clubId)
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