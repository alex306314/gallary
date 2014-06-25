/**
 * 单个命令按钮视图
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'EJS',
  'ItemAction',
  'domReady!'
], function($, _, Backbone, EJS,ItemAction){
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
            ItemAction.reName();
          break;
        case "delete":
            ItemAction.delete();
          break;
        case "move":
            ItemAction.move();
          break;
      }
    }
  });
});