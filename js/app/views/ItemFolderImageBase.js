/**
 * 图片文件夹视图 基类
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'EJS'
], function($, _, Backbone, EJS){
  window.gallary = window.gallary || {};

  return Backbone.View.extend({
    tagName: "div",
    className: "item ui-widget-content ui-selectee",
    initialize: function(){
      _.bindAll(this,"rightClick","clickSelected");

      this.listenTo(this.model, "change", this.render);
      //this.$el.find(".image").rightClick(this.rightClick);
    },
    events: {
      "click": "clickFunc",
      "mouseup": "rightClick",
      "keypress .rename": "renameOK"
    },
    //左键点击
    clickFunc: function(e){
      this.clickSelected(e);
    },
    //右键点击事件
    rightClick: function(e){
      //子类具体实现
    },
    //添加选中状态class
    clickSelected: function(e){
      if(gallary.selectedItems.length ===1){
        var firstItem = gallary.selectedItems.first();
        if(firstItem.get("isReName") && firstItem.cid != this.model.cid){
          //取消上一个项目的重命名状态
          gallary.itemCollection.cancelReName();
        }
      }
      //正在重命名 则当前模型已经处于选中状态 不用再加入已选择列表集合
      if(!!this.$("input.rename")[0]) return;
      $("#J_SelectAll")[0].checked = false;//取消全选
      if(!gallary.ctrl){
        gallary.selectedItems.singleAdd(this.model);//向已选择集合添加当前
        gallary.itemCollection.unSelect();  //取消数据集合中所有项的选中状态
      }else{
        gallary.selectedItems.add(this.model);
      }
      this.model.select();   //改变当前项模型数据
    },
    render:function(){
      var self = this;
      var html = new EJS({element:self.templateId}).render(this.model.toJSON());
      this.$el.html(html);
      if(this.model.get("selected")){
        this.$el.addClass("ui-selected");
      }else{
        this.$el.removeClass("ui-selected");
      }
      return this;
    },
    //重命名回车
    renameOK: function(e){
      if(e.keyCode == 13){
        var val = $(e.currentTarget).val();
        this.model.reName(val);
      }
    }
  });
});