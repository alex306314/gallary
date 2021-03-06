/**
 * 控制条视图
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'EJS',
  'domReady!'
], function($, _, Backbone, EJS){
  window.gallary = window.gallary || {};
  return Backbone.View.extend({
    el: "#J_SelectBar",
    initialize: function(){
      _.bindAll(this,"modelChange","selectedItemsReset");
      this.listenTo(this.model, "change", this.modelChange);
      this.listenTo(gallary.selectedItems,"add", this.selectedItemsAdd);//选中集合添加事件
      this.listenTo(gallary.selectedItems,"reset", this.selectedItemsReset);
      this.listenTo(gallary.itemCollection, "add",this.item);
    },
    events: {
      "click #J_SelectAll": "selectAll"
    },
    //全选
    selectAll: function(e){
      if(e.currentTarget.checked){
        gallary.itemCollection.select();
        //添加所有项到已选中集合中
        gallary.selectedItems.multiAdd(gallary.itemCollection.toJSON());
      }else{
        gallary.itemCollection.unSelect();
        //从选中集合删除所有项
        gallary.selectedItems.reset();
      }
      //console.log(e.currentTarget.checked)
    },
    modelChange: function(){
      //状态文字信息
      this.$(".selected-msg").text(this.model.get("selectedMsg"));

      var itemType = this.model.get("itemType");
      if(itemType==1){
        gallary.controlBar.addAll(gallary.folderBar);
      }else if(itemType==2){
        gallary.controlBar.addAll(gallary.imageBar);
      }else{
        gallary.controlBar.$el.html("");
      }
    },
    //已选集合添加事件
    selectedItemsAdd: function(){
      var msg, itemType = 0;
      var folderNum = gallary.selectedItems.getFolderNum();
      var imageNum = gallary.selectedItems.getImageNum();
      if(!folderNum){
        msg = "已经选择了"+ imageNum +"张图片";
        itemType = 2;
      }else if(!imageNum){
        msg = "已经选择了"+ folderNum +"个文件夹";
        itemType = 1;
      }else{
        msg = "已经选择了"+ folderNum +"个文件夹和"+ imageNum +"张图片";
      }
      this.model.set({selectedMsg: msg, itemType:itemType});
    },
    //未选择目标状态
    selectedItemsReset: function(){
      var folderNum = gallary.itemCollection.getFolderNum();
      var imageNum = gallary.itemCollection.getImageNum();
      this.model.set({selectedMsg:"当前目录共有"+ folderNum +"个文件夹和"+ imageNum +"张图片", itemType:0});
    }
  });
});