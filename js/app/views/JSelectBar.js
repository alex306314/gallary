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
      }else{
        gallary.itemCollection.unSelect();
      }
      console.log(e.currentTarget.checked)
    },
    modelChange: function(){
      //状态文字信息
      this.$(".selected-msg").text(this.model.get("selectedMsg"));
    }
  });
});