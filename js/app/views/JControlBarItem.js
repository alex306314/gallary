/**
 * 单个命令按钮视图
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
    tagName: "li",
    templateId: "tpl_control_bar",
    attributes: {
      style:"display:list-item"
    },
    initialize: function(){
      this.$el.addClass(this.model.get("cls"));
    },
    events: {
      "click": "barClick"
    },
    render: function(){
      var self = this;
      var html = new EJS({element:self.templateId}).render(this.model.toJSON());
      this.$el.html(html);
      return this;
    },
    barClick: function(){
      var action = this.model.get("action");
      switch(action){
        case "rename":
            gallary.itemAction.reName();
          break;
        case "delete":
            gallary.itemAction.delete();
          break;
        case "move":
            gallary.itemAction.move();
          break;
      }
    }
  });
});