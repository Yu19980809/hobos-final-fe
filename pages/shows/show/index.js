// pages/shows/show/index.js
const globalData = getApp().globalData;

Page({

	/**
	 * Page initial data
	 */
	data: {
        isBooked: false
    },

    /**
     * cancel book
     */
    onCancel() {
        const _this = this;

        wx.showModal({
            title: '取消提示',
            content: '确认取消参加吗？',
            complete: (res) => {
                if (res.confirm) {
                    _this.onDestroyBooking();
                }
            }
        })
    },

    /**
     * destroy a booking
     */
    onDestroyBooking() {
        // 1. find the booking id
        const _this = this;
        const id = this.data.show.booking.id || this.data.bookingId;

        // 2. delete this booking
        wx.request({
            url: `${globalData.baseUrl}/bookings/${id}`,
            method: 'DELETE',
            header: globalData.header,
            success(res) {
                // 3. change book status
                _this.setData({ isBooked: false });

                // 4. fetch detail again
                _this.onFetchShow(_this.data.show.id);
            }
        })
    },

    /**
     * check book status
     */
    onCheckBookStatus(members) {
        const _this = this;
        const userId = globalData.user.id;

        members.forEach(member => {
            if (member.id === userId) {
                _this.setData({ isBooked: true });
            }
        })
    },

    /**
     * book current show
     */
    onBook() {
        const _this = this;
        
        wx.showModal({
            title: '确认提示',
            content: '确认要参加当前演出吗？',
            complete: (res) => {
                if (res.confirm) {
                    _this.onCreateBooking()
                }
            }
        })
    },

    /**
     * create a new booking
     */
    onCreateBooking() {
        const _this = this;
        const id = _this.data.show.id

        // 1. create a booking
        wx.request({
            url: `${globalData.baseUrl}/bookings`,
            method: 'POST',
            header: globalData.header,
            data: { 
                booking: { show_id: id }
            },
            success(res) {
                // 2.1 change book status
                _this.setData({ isBooked: true, bookingId: res.data.booking.id });

                // 3. fetch detail again
                _this.onFetchShow(id);
            }
        })
    },
    
    /**
     * fetch details about a show by show_id
     */
    onFetchShow(id) {
        const _this = this;

        wx.request({
            url: `${globalData.baseUrl}/shows/${id}`,
            header: globalData.header,
            success(res) {
                // store the data
                _this.setData({ show: res.data.show });

                // check book status
                _this.onCheckBookStatus(res.data.show.members);
            }
        })
    },

	/**
	 * Lifecycle function--Called when page load
	 */
	onLoad(options) {
        // 1. get show_id and expired status
        const { id, isExpired } = options;

        // 2. get info about this show
		this.onFetchShow(id);
		this.setData({ isExpired: isExpired === "true" });
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