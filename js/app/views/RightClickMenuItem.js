/**
 * 右侧右键菜单视图
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'EJS',
  'ItemAction',
  'domReady!'
], function($, _, Backbone, EJS,act){
  window.gallary = window.gallary || {};
  return Backbone.View.extend({
    tagName: "li",
    templateId: "tpl_picright_menu",
    attributes:{
      style: "display:list-item;"
    },
    initialize: function(){
      this.$el.addClass(this.model.get("cls"));
    },
    events:{
      "click": "click"
    },
    render: function(){
      var self = this;
      var html = new EJS({element:self.templateId}).render(this.model.toJSON());
      this.$el.html(html);
      return this;
    },
    //菜单项点击事件处理
    click: function(e){
      var action = this.model.get("action");
      switch(action){
        case "replace":

          break;
        case "copy":

          break;
        case "move":
          act.move();
          break;
        case "rename":
          act.reName();
          break;
        case "checkSee":

          break;
        case "edit":

          break;
        case "toPhone":

          break;
        case "delete":
          act.delete();
          break;
      }
      gallary.rightMenu.hide();
    }
  });
});