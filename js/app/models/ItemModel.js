/**
 * folder / image   model
 * 数据模型
 */
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  window.gallary = window.gallary || {};
  return Backbone.Model.extend({
    defaults: {
      id: -1, //当前ID
      pid: -1, //对应父ID
      type: 1, //项目类型 1=>folder     2=> image
      name: "",
      time: "2014-6-10 14:59",
      url: "",   //图片 url
      clientType: 0,   //客户端类型是否为手机
      suffix: "jpg",  //图片后缀
      px: "10x10",    //图片尺寸
      size: "64.34k",  //图片大小
      isref:0,       //是否引用
      freezed: 0,    //是否冻结图片
      why: "why",    //冻结原因
      selected: false, //是否选中
      isReName: false,  //是否重命名状态
      eurl: "",   //复制链接
      ecode: ""   //复制图片
    },
    initialize: function(){
      if(this.get("type")==2){
        //console.log(this);
        this.set({eurl: encodeURIComponent(this.get("url"))});
        this.set({ecode: encodeURIComponent('<img src="'+ this.get("url") +'" alt=" '+ this.get("name") + '"/>')});
      }
    },
    select: function(){
      this.set({selected:true});
    },
    unSelect: function(){
      this.set({selected:false});
    },
    //重命名
    reName: function(name){
      var self = this;
      var postData = {
        action:"rename",
        id: this.get('id'),
        name: name
      };
      gallary.ajax({
        data: postData,
        success: function(data){
          self.set({name:name, isReName:false});
          gallary.infobox.showInfo("修改成功!");
        }
      });
    }
  });
});