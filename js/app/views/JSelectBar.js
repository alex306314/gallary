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
      _.bindAll(this,"modelChange");
      this.listenTo(this.model, "change", "modelChange");
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
    }
  });
});