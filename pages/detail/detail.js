
Page({
  data: {
    good: null
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '详细'  //修改title
    })
    wx.request({
      url: "https://www.cnqiangba.com/goodsku/findGoodSkuDetail",
      method: 'POST',
      data: options,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        const good = res.data.data
        this.findGoodOnlook(options, good)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  handleCheckoutOriginalPrice: function(e) {
    const gId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../order/order?id=${gId}`
    })
  },

  handleCheckoutLookerPrice: function (e) {
    const gId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../order/order?id=${gId}&isLooker=1`
    })
  },

  findGoodOnlook: function (options, detailGood){
    wx.request({
      url: "https://www.cnqiangba.com/wechat/onlook/findGoodOnlook",
      method: 'POST',
      data: options,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: (res) => {
        const good = res.data.data
        const newGood = Object.assign({}, detailGood, good)
        newGood.swiperImgs = detailGood.imagePath.split(',')

        const deadline = new Date(newGood.beginTime).getTime();
        const now = new Date().getTime();
        const tmp = deadline - now;
        newGood.isGrabbing = tmp <= 0;
    
        this.setData({ good: newGood }, () => {
          if (!newGood.isGrabbing) {
            this.calculateCountDownTime()
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  calculateCountDownTime: function () {
    const good = this.data.good;
    const timeInterval = setInterval(() => {
      const deadline = new Date(good.beginTime).getTime();
      const now = new Date().getTime();
      const tmp = deadline - now;
      if (tmp < 0) {
        clearInterval(timeInterval)
        good.isGrabbing = true;
      }
      else {
        good.hours = Math.floor((tmp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        good.minutes = Math.floor((tmp % (1000 * 60 * 60)) / (1000 * 60));
        good.seconds = Math.floor((tmp % (1000 * 60)) / 1000);
      }
      this.setData({ good })
    }, 1000);
  },

  bindDetailTap: function (e) {
    wx.navigateTo({
      url: `../swiper-details/swiper-details?detail=${this.data.good.detail}`
    })
  },
})
