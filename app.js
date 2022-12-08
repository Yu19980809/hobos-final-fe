// app.js
App({
  onLaunch() {
	const _this = this;

    // 登录
    wx.login({
      success: res => {
		// 发送 res.code 到后台换取 openId, sessionKey, unionId
		_this.onLogin(res.code);
      }
    })
  },

  /**
   * 发起登录请求
   */
  onLogin(code) {
	const _this = this;

	wx.request({
		url: `${_this.globalData.baseUrl}/login`,
		method: "POST",
		data: { code },
		success(res) {
			if (res.statusCode === 200) {
				// 保存请求到的数据
				_this.globalData.user = res.data.user;
				_this.globalData.header = { Authorization: res.header['Authorization'] };
			} else {
				// 登录失败，进行提示
				wx.showToast({
					title: '登录失败，请重新登录！！！',
				})
			}
		}
	})
  },

  globalData: {
	baseUrl: 'http://hobos.wogengapp.cn/api/v1',
	user: null,
	header: null
  }
})
