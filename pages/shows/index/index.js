// pages/shows/index/index.js
import event from '@codesmiths/event';

const globalData = getApp().globalData

Page({

	/**
	 * Page initial data
	 */
	data: {
		isSearch: false,
		query: ''
	},

	/**
	 * navigate to details page
	 */
	onNavigateToDetail(e) {
		// 1. get id of show
		const { id } = e.currentTarget.dataset;

		// 2. go to detail page
		wx.navigateTo({
			url: `/pages/shows/show/index?id=${id}`
		})
	},

	/**
	 * cancel search
	 */
	onCancelSearch() {
		// 1. clear the search bar
		// 2. change search status
		this.setData({ query: '', isSearch: false });

		// 3. fetch all shows
		this.onFetchShows();
	},
	
	/**
	 * search shows by query content
	 */
	onSearchShow(e) {
		const _this = this;

		// 1. change search status
		this.setData({ isSearch: true });

		// 2. get the query content
		const query = e.detail.value;

		// 3. search by this query content
		if (query === '') {
			_this.setData({ isSearch: false });
			_this.onFetchShows();
		} else {
			wx.request({
				url: `${globalData.baseUrl}/shows?query=${query}`,
				header: globalData.header,
				success(res) {
					// 4. store searched data
					_this.setData({ shows: res.data.shows });
				}
			})
		}
	},
    
    /**
     * fetch all shows
     */
    onFetchShows() {
        const _this = this;

        wx.request({
            url: `${globalData.baseUrl}/shows`,
			header: globalData.header,
            success(res) {
                wx.hideLoading();
                _this.setData({ shows: res.data.shows })
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
        wx.showLoading({
            title: '正在加载数据...',
        })

        if(globalData.header) {
            this.onFetchShows()
        } else {
            event.on('tokenReady', this, this.onFetchShows);
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