// pages/comedians/index/index.js
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
		const follow = e.currentTarget.dataset.follow || false;

		wx.navigateTo({
			url: `/pages/comedians/show/index?comedianId=${id}&isFollowed=${follow}`
		})
	},

	/**
	 * go to club detail page
	 */
	onNagivateToClubDetail(e) {
		const { id } = e.currentTarget.dataset;
		const follow = e.currentTarget.dataset.follow || false;

		wx.navigateTo({
			url: `/pages/comedians/show/index?clubId=${id}&isFollowed=${follow}`
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
		const comedians = this.data.comedians;
		const searchedComedians = comedians.filter(comedian => {
			if(comedian.nickname.indexOf(query) !== -1 || (comedian.slogan && comedian.slogan.indexOf(query) !== -1)) {
				return true
			}
		})
		this.setData({ comedians: searchedComedians });
	},

	/**
	 * search clubs
	 */
	onSearhClubs(query) {
		const clubs = this.data.clubs;
		const searchedClubs = clubs.filter(club => {
			if(club.name.indexOf(query) !== -1 || (club.description && club.description.indexOf(query) !== -1)) {
				return true
			}
		})
		this.setData({ clubs: searchedClubs });
	},

	/**
	 * follow a comedian
	 */
	onNewComedianFollow(e) {
		const _this = this;
		const { id } = e.currentTarget.dataset;

		wx.request({
			url: `${globalData.baseUrl}/comedian_followings`,
			method: 'POST',
			header: globalData.header,
			data: { comedian_following: { comedian_id: id } },
			success(res) {
				// set this comedian followed
				let comedians = _this.data.comedians;
				comedians.forEach((comedian, index) => {
					if(comedian.id === id) {
						comedians[index]['isFollowed'] = true
						// update globalData
						getApp().globalData.user.followed_comedians.unshift(comedian)
					}
				})
				_this.setData({ comedians });

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
				let comedians = _this.data.comedians;
				comedians.forEach((comedian, index) => {
					if(comedian.id === id) {
						comedians[index]['isFollowed'] = false
						// update globalData
						const comedianIndex = globalData.user.followed_comedians.findIndex(function(fc) {
							return fc.id === id
						})
						getApp().globalData.user.followed_comedians.splice(comedianIndex, 1);
					}
				})
				_this.setData({ comedians });

				// show toast
				wx.showToast({
					title: '取消关注成功',
				})
			}
		})
	},

	/**
	 * follow a club
	 */
	onNewClubFollow(e) {
		const _this = this;
		const { id } = e.currentTarget.dataset;

		wx.request({
			url: `${globalData.baseUrl}/club_followings`,
			method: 'POST',
			header: globalData.header,
			data: { club_following: { club_id: id } },
			success(res) {
				// set this club followed
				let clubs = _this.data.clubs;
				clubs.forEach((club, index) => {
					if(club.id === id) {
						clubs[index]['isFollowed'] = true
						// update globalData
						getApp().globalData.user.followed_clubs.unshift(club);
					}
				})
				_this.setData({ clubs })

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
				let clubs = _this.data.clubs;
				clubs.forEach((club, index) => {
					if(club.id === id) {
						clubs[index]['isFollowed'] = false
						// update globalData
						const clubIndex = globalData.user.followed_clubs.findIndex(function(fc) {
							return fc.id === id
						})
						getApp().globalData.user.followed_clubs.splice(clubIndex, 1);
					}
				})
				_this.setData({ clubs });

				// show toast
				wx.showToast({
					title: '取消关注成功',
				})
			}
		})
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
				event.emit('comediansReady');
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
				event.emit('clubsReady');
			}
		})
	},

	/**
	 * get all comedian_followings
	 */
	// onFetchAllComedianFollowings() {
	// 	const _this = this;
	// 	const { id } = globalData.user;

	// 	wx.request({
	// 		url: `${globalData.baseUrl}/users/${id}/comedian_followings`,
	// 		header: globalData.header,
	// 		success(res) {
	// 			const comedian_followings = res.data.comedian_followings;
	// 			let comedians = _this.data.comedians;
	// 			comedians.forEach((item, index) => {
	// 				comedian_followings.forEach(cf => {
	// 					if(item.id === cf.comedian_id) {
	// 						comedians[index]['isFollowed'] = true
	// 					}
	// 				})

	// 			})
	// 		}
	// 	})
	// },

	 /**
	  * get all club_followings
	  */
	//  onFetchAllClubFollowings() {
	// 	const _this = this;
	// 	const { id } = globalData.user;

	// 	wx.request({
	// 		url: `${globalData.baseUrl}/users/${id}/club_followings`,
	// 		header: globalData.header,
	// 		success(res) {
	// 			const club_followings = res.data.club_followings;
	// 			let clubs = _this.data.clubs;
	// 			clubs.forEach((item, index) => {
	// 				club_followings.forEach(cf => {
	// 					if(item.id === cf.club_id) {
	// 						clubs[index]['isFollowed'] = true
	// 					}
	// 				})
	// 			})
	// 		}
	// 	})
	//  },

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
	 * fetch data
	 */
	onFetchData() {
		// 获取演员列表和俱乐部列表
		this.onFetchAllComeidans();
		this.onFetchAllClubs();

		// 获取comedian_following信息
		if(this.data.comedians) {
			// this.onFetchAllComedianFollowings();
			this.onCheckComedianFollowed;
		} else {
			// event.on('comediansReady', this, this.onFetchAllComedianFollowings)
			event.on('comediansReady', this, this.onCheckComedianFollowed)
		}

		// 获取club_followings信息
		if(this.data.clubs) {
			// this.onFetchAllClubFollowings()
			this.onCheckClubFollowed()
		} else {
			// event.on('clubsReady', this, this.onFetchAllClubFollowings)
			event.on('clubsReady', this, this.onCheckClubFollowed)
		}
	},

	/**
	 * check comedian followed status
	 */
	onCheckComedianFollowed() {
		const comedians = this.data.comedians;
		const followedComedians = globalData.user.followed_comedians;

		comedians.forEach((comedian, index) => {
			followedComedians.forEach(item => {
				if(comedian.id === item.id) {
					comedians[index]['isFollowed'] = true
				}
			})
		})

		this.setData({ comedians });
	},

	onCheckClubFollowed() {
		const clubs = this.data.clubs;
		const followedClubs = globalData.user.followed_clubs;

		clubs.forEach((club, index) => {
			followedClubs.forEach(item => {
				if(club.id === item.id) {
					clubs[index]['isFollowed'] = true;
				}
			})
		})

		this.setData({ clubs })
	},

	/**
	 * Lifecycle function--Called when page show
	 */
	onShow() {
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