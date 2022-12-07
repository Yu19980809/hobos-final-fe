// pages/shows/index/index.js
import event from '@codesmiths/event';

const globalData = getApp().globalData

Page({

	/**
	 * Page initial data
	 */
	data: {
        isSearch: false
    },
    
    /**
     * 获取所有演出
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