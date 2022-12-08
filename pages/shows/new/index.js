// pages/shows/new/index.js
Page({

	/**
	 * Page initial data
	 */
	data: {
		t2: "19:30",

        formData: {
            club_name: '',
            name: '',
            date: '',
            time: '',
            address: '',
            description: '',
            poster_url: ''
        }

	},

	/**
	 * Lifecycle function--Called when page load
	 */
	onLoad(options) {
		this.initData()
	},

	initData() {
        //昨天的时间
        let yestoday = new Date()
        yestoday.setTime(yestoday.getTime() - 24 * 60 * 60 * 1000);
        let s1 = yestoday.getFullYear() + "-" + (yestoday.getMonth() + 1) + "-" + yestoday.getDate();
        // let t1 = yestoday.getHours() + ":" + yestoday.getMinutes();
        //今天的时间
        let today = new Date();
        today.setTime(today.getTime());
        let s2 = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        // let t2 = today.getHours() + ":" + today.getMinutes();
        //明天的时间
        let tomorrow = new Date();
        tomorrow.setTime(tomorrow.getTime() + 24 * 60 * 60 * 1000);
        let s3 = tomorrow.getFullYear() + "-" + (tomorrow.getMonth() + 1) + "-" + tomorrow.getDate();
        // let t3 = tomorrow.getHours() + ":" + tomorrow.getMinutes();
        this.setData({
          s1,
          s2,
          s3
        })
      },

      bindDateChange(e) {
        this.setData({
          s2: e.detail.value,
          date: e.detail.value
        })
      },

      bindTimeChange(e) {
        this.setData({
          t2: e.detail.value,
          time: e.detail.value
        })
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