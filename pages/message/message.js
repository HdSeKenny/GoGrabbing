const { $Toast } = require('../../iview/dist/base/index');
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    hasUserInfo: true,
    messages: [
      {
        "id": 1,
        "createTime": "2019-03-02 02:27:44",
        "orderno": "DB1231231231231",
        "transtype": 1,
        "skuid": 1,
        "goodid": 1,
        "goodname": "华为METE20",
        "userid": 1,
        "username": "郑伟",
        "openid": "oCKcl54wbR59eimiFDMEhrmOXCE0",
        "transamount": 650000,
        "goodnum": 1,
        "transstatus": 1,
        "transTime": "2019-02-17 17:56:19",
        "onlookId": 1,
        "goodimg": "https://img11.360buyimg.com/n1/s450x450_jfs/t25954/134/1930444050/488286/31587d0d/5bbf1fc9N3ced3749.jpg",
        "message": "您于2019-03-02 02:27:44抢购成功华为METE20商品，商品抢购完成后24小时之内发货。感谢您对我们的支持，祝您生活愉快！",
        "orderPrice": null
      }
    ],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '消息' })
    if (!app.globalData.userInfo) {
      return this.setData({
        hasUserInfo: false
      })
    }
    wx.request({
      url: "https://www.cnqiangba.com/app/transmessage/findTransMessageByUserId",
      method: 'POST',
      data: {
        // openid: 1,
        // userId: 1,
        pageSize: 1,
        pageNum: 20
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        console.log(res.data)
        // this.setData({
        //   orders: res.data.data
        // })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.onLoad()
    this.onReady()
  },
  onReady: function () {
    if (!this.data.hasUserInfo) {
      $Toast({
        content: '请先登录',
        type: 'warning'
      })
    }
  },
  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})




// {
//   "code": "1",
//     "msg": "操作成功",
//       "timestamp": 1554173803654,
//         "data": {
//     "total": 1,
//       "size": 20,
//         "current": 1,
//           "records": [
//             {
//               "id": 1,
//               "createTime": "2019-03-02 02:27:44",
//               "orderno": "DB1231231231231",
//               "transtype": 1,
//               "skuid": 1,
//               "goodid": 1,
//               "goodname": "华为METE20",
//               "userid": 1,
//               "username": "郑伟",
//               "openid": "oCKcl54wbR59eimiFDMEhrmOXCE0",
//               "transamount": 650000,
//               "goodnum": 1,
//               "transstatus": 1,
//               "transTime": "2019-02-17 17:56:19",
//               "onlookId": 1,
//               "goodimg": "https://img11.360buyimg.com/n1/s450x450_jfs/t25954/134/1930444050/488286/31587d0d/5bbf1fc9N3ced3749.jpg",
//               "message": "您于2019-03-02 02:27:44抢购成功华为METE20商品，商品抢购完成后24小时之内发货。感谢您对我们的支持，祝您生活愉快！",
//               "orderPrice": null
//             }
//           ],
//             "pages": 1
//   }
// }