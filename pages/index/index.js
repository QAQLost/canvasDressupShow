//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    TabCur: 0,
    wardrobe: [{
      idx: 0,
      name: '西裤',
      num: 4,
      type: 'xk',
      badge: false
    }, {
      idx: 1,
      name: '衬衣',
      num: 2,
      type: 'cy',
      badge: false
    }, {
      idx: 2,
      name: '马甲',
      num: 1,
      type: 'mj',
      badge: false
    }, {
      idx: 3,
      name: '西服',
      num: 7,
      type: 'xf',
      badge: false
    }, {
      idx: 4,
      name: '大衣',
      num: 5,
      type: 'dy',
      badge: false
    }],
    list: ['', '', '', '','']
  },
  //事件处理函数
  bingImgChange: function (e) {
    let img = e.currentTarget.dataset.img;
    let cur = e.currentTarget.dataset.cur;
    let badge = "wardrobe[" + cur + "].badge"
    let badgeFlag = true;
    let list = this.data.list;
    let idx = "list[" + cur + "]"
    if (list[cur] == img) {
      img = "";
      badgeFlag = false;
    }
    this.setData({
      [idx]: img,
      [badge]: badgeFlag
    })
    this.drawClothes(list);
  },
  clearAll: function () {
    let that = this;
    wx.showModal({
      title: '重置',
      content: '是否要重新换装？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let arr = that.data.list;
          let idx = 0;
          arr.forEach(key => {
            let list = "list[" + idx + "]";
            that.setData({
              [list]: '',
            })
            idx++;
          });
          that.drawClothes(arr);
          let wardrobe = that.data.wardrobe;
          for (let i = 0; i < wardrobe.length; i++) {
            let badge = "wardrobe[" + i + "].badge";
            that.setData({
              [badge]: false
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  drawClothes: function (list) {
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.draw();
    ctx.drawImage('/images/body.png', 0, 20, 100, 220);
    ctx.draw(true);
    list.forEach(key => {
      if (key != '') {
        ctx.drawImage(key, 0, 20, 100, 220);
        ctx.draw(true);
      }
    });
  },
  onLoad: function () {
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.drawImage('/images/body.png', 0, 20, 100, 220);
    ctx.draw();
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
})
