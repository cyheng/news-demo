//index.js
//获取应用实例
const typeMapper = ["gn","gj","cj","yl","js","ty","other"]
import  {formatTime}  from "../../utils/util.js"
Page({
  data: {
   navItems:['国内','国际','财经','娱乐','军事','体育','其它'],
   activeItemIndex:"0",
   news:[]
  },
 
  onLoad() {
    this.getNews()
  },
  onPullDownRefresh() {
    this.getNews(() => {
      wx.stopPullDownRefresh()
    })
  },
  getNews(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        "type": typeMapper[this.data.activeItemIndex]
      },
      success:({data})=>{
        let {result} = data
        this.setNews(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  }
  ,
  setNews(result){
    result.forEach(it => {
      let date = new Date(it.date)
      it.date = formatTime(date).split(' ')[1].slice(0, 5)//小时:分钟 
      if (!it.source) {
        it.source = "未知来源"
      }
      if (!it.firstImage) {
        it.firstImage = "/images/default.png" 
      }
    })
    this.setData({
      "news": result
    })
  },
  changeNews({ target}){
    this.setData({
      "activeItemIndex":target.id
    })
    this.getNews()
  },
  viewDetail( {target}){
    let id = target.dataset.id
    if(id){
      wx.navigateTo({
        url: `/pages/detail/detail?id=${id}`,
      })
    }
  },
})
