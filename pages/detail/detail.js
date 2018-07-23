// pages/detail/detail.js
import { formatTime } from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    newsDetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({id}) {
     this.setData({
       id
     })
     this.getNewDetail()
  },
  onPullDownRefresh(){
    this.getNewDetail(()=>{
      wx.stopPullDownRefresh()
    })
  },
  getNewDetail(callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data:{
        id:this.data.id
      },
      success:({data})=>{
        let {result} = data
        this.setNewsDetail(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setNewsDetail(result){
      
      let date = new Date(result.date)
      result.date = formatTime(date).split(' ')[1].slice(0, 5)//小时:分钟 
    if (!result.source) {
      result.source = "未知来源"
      }
      this.setData({
        newsDetail:result
      })
   
  },

  
})