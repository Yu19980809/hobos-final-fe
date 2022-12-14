// pages/followings/index/index.js
import event from '@codesmiths/event';

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
	 * go to comedian detail page
	 */
	onNagivateToComedianDetail(e) {
		const { id } = e.currentTarget.dataset;

		wx.navigateTo({
			url: `/pages/comedians/show/index?comedianId=${id}&isFollowed=true`
		})
	},

	/**
	 * go to club detail page
	 */
	onNagivateToClubDetail(e) {
		const { id } = e.currentTarget.dataset;

		wx.navigateTo({
			url: `/pages/comedians/show/index?clubId=${id}&isFollowed=true`
		})
	},

	/**
	 * unfollow a comedian
	 */
	onCancelComedianFollow(e) {
		const _this = this;
		const { id } = e.currentTarget.dataset;

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
				let followedComedians = _this.data.followedComedians;
				followedComedians.forEach((comedian, index) => {
					if(comedian.id === id) {
						followedComedians[index]['isFollowed'] = false
						// update globalData
						const comedianIndex = globalData.user.followed_comedians.findIndex(function(fc) {
							return fc.id === id
						})
						getApp().globalData.user.followed_comedians.splice(comedianIndex, 1);
					}
				})
				_this.setData({ followedComedians });

				// show toast
				wx.showToast({
					title: '取消关注成功',
				})
			}
		})
	},

	/**
	 * unfollow a club
	 */
	onCancelClubFollow(e) {
		const _this = this;
		const { id } = e.currentTarget.dataset;

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
				let followedClubs = _this.data.followedClubs;
				followedClubs.forEach((club, index) => {
					if(club.id === id) {
						followedClubs[index]['isFollowed'] = false
						// update globalData
						const clubIndex = globalData.user.followed_clubs.findIndex(function(fc) {
							return fc.id === id
						})
						getApp().globalData.user.followed_clubs.splice(clubIndex, 1);
					}
				})
				_this.setData({ followedClubs });

				// show toast
				wx.showToast({
					title: '取消关注成功',
				})
			}
		})
	},

	/**
	 * search comedians / clubs
	 */
	onHandleSearch(e) {
		const _this = this;

		// 1. change search status
		this.setData({ isSearch: true });

		// 2. get the query content
		const query = e.detail.value;

		// 3. search by this query content
		if (query === '') {
			_this.setData({ isSearch: false });
			_this.onFetchData();
		} else {
			if(_this.data.category[_this.data.index] === '演员') {
				_this.onSearchComedians(query)
			} else {
				_this.onSearhClubs(query)
			}
		}
	},

	/**
	 * search comedians
	 */
	onSearchComedians(query) {
		const followedComedians = this.data.followedComedians;
		const searchedComedians = followedComedians.filter(comedian => {
			if(comedian.nickname.indexOf(query) !== -1 || (comedian.slogan && comedian.slogan.indexOf(query) !== -1)) {
				return true
			}
		})
		this.setData({ followedComedians: searchedComedians });
	},

	/**
	 * search clubs
	 */
	onSearhClubs(query) {
		const followedClubs = this.data.followedClubs;
		const searchedClubs = followedClubs.filter(club => {
			if(club.name.indexOf(query) !== -1 || (club.description && club.description.indexOf(query) !== -1)) {
				return true
			}
		})
		this.setData({ followedClubs: searchedClubs });
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
	 * fetch followed data
	 */
	onFetchData() {
		const { followed_comedians, followed_clubs } = globalData.user;
		this.setData({
			followedComedians: followed_comedians,
			followedClubs: followed_clubs
		})
	},

	/**
	 * Lifecycle function--Called when page show
	 */
	onShow() {
		// 获取关注的演员和俱乐部
		this.onFetchData()
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