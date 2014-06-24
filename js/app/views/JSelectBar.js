define([
  'jquery',
  'underscore',
  'backbone',
  'EJS',
  'domReady!'
], function($, _, Backbone, EJS){
  return Backbone.View.extend({
    el: "#J_SelectBar",
    initialize: function(){
      _.bindAll(this,"modelChange");
      this.listenTo(this.model, "change", "modelChange");
    },
    events: {
      "click #J_SelectAll": this.selectAll
    },
    //全选
    selectAll: function(e){
      console.log(e.target.selected)
    },
    modelChange: function(){
      //状态文字信息
      this.$(".selected-msg").text(this.model.get("selectedMsg"));
    }
  });
});