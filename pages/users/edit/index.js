// pages/users/edit/index.js
const globalData = getApp().globalData;

Page({

	/**
	 * Page initial data
	 */
	data: {
		isMenuShow: false,
		roles: ['观众', '演员', '主理人']
	},

	/**
	 * set index for dropdown
	 */
	onSetIndex() {
		let role = globalData.user.role;
		switch(role) {
			case 'holder':
				role = '主理人';
				break;
			case 'comedian':
				role = '演员';
				break;
			default:
				role = '观众';
		}

		const index = this.data.roles.indexOf(role);
		this.setData({ index });
	},

	// 点击下拉显示框
	onSelectTaps(e) {
		this.setData({ isMenuShow: !this.data.isMenuShow });
	},

	// 点击下拉列表
	onOptionTaps(e) {
		const index = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
		this.setData({ index, isMenuShow: !this.data.isMenuShow });
	},

	/**
	 * update user info
	 */
	onEditUserInfo(e) {
		// 1. 获取头像URL
		const _this = this;
		const avatar = this.data.avatarUrl;

		// 2. 获取身份
		let role = this.data.roles[this.data.index];
		switch(role) {
			case '主理人':
				role = 'holder';
				break;
			case '演员':
				role = 'comedian';
				break;
			default:
				role = 'audience';
		}

		// 3. 获取其他信息
		let data;
		const { nickname } = e.detail.value;
		switch(role) {
			case 'comedian':
				const { slogan, experience } = e.detail.value;
				data = { avatar, role, nickname, slogan, experience };
				break;
			case 'holder':
				const { clubName, clubAddr, clubDesc } = e.detail.value;
				data = { avatar, role, nickname }
				const clubData = {
					name: clubName,
					address: clubAddr,
					description: clubDesc
				}

				if(_this.data.currentRole === 'holdr') {
					_this.onUpdateClub(clubData)
				} else {
					_this.onCreateClub(clubData)
				}
				break;
			default:
				data = { avatar, role, nickname };
		}

		// 4. 更新用户信息
		this.onUpdateUserInfo(data);
	},

	/**
	 * send request to update user info
	 */
	onUpdateUserInfo(data) {
		const _this = this;
		const id = globalData.user.id;

		wx.request({
			url: `${globalData.baseUrl}/users/:${id}`,
			method: 'PUT',
			header: globalData.header,
			data: { user: data },
			success(res) {
				// update globalData
				getApp().globalData.user = res.data.user;

				// switch tabBar
				wx.switchTab({
					url: '/pages/users/index/index',
				})

				// show toast
				wx.showToast({
					title: '信息更新成功',
				})
			}
		})
	},

	/**
	 * send request to create club
	 */
	onCreateClub(data) {
		wx.request({
			url: `${globalData.baseUrl}/clubs`,
			method: 'POST',
			header: globalData.header,
			data: { club: data },
			success(res) {
				// update globalData
				getApp().globalData.user.club = res.data.club
			}
		})
	},

	/**
	 * send request to update club
	 */
	onUpdateClub(data) {
		const { id } = this.globalData.user.club;

		wx.request({
			url: `${globalData.baseUrl}/clubs/${id}`,
			method: 'PUT',
			header: globalData.header,
			data: { club: data },
			success(res) {
				// update globalData
				getApp().globalData.user.club = res.data.club
			}
		})
	},

	/**
	 * choose avatar
	 */
	onChooseAvatar(e) {
		console.log('chooseAvatar', e);
		const { avatarUrl } = e.detail;
		this.setData({ avatarUrl });
	},

	bindPickerChange(e) {
		this.setData({
		  index: e.detail.value
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
		this.onSetIndex();
		this.setData({
			user: globalData.user,
			avatarUrl: globalData.user.avatar,
			currentRole: globalData.user.role
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