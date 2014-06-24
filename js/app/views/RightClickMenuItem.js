/**
 * 右侧右键菜单视图
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'EJS',
  'domReady!'
], function($, _, Backbone, EJS){

  return Backbone.View.extend({
    tagName: "li",
    templateId: "tpl_picright_menu",
    attributes:{
      style: "display:list-item;"
    },
    initialize: function(){
      this.$el.addClass(this.model.get("cls"));
    },
    render: function(){
      var self = this;
      var html = new EJS({element:self.templateId}).render(this.model.toJSON());
      this.$el.html(html);
      return this;
    }
  });
});