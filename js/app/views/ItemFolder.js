/**
 * 文件夹视图
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'EJS',
  'domReady!'
], function($, _, Backbone, EJS){
  return Backbone.View.extend({
    tagName: "div",
    className: "item ui-widget-content ui-selectee",
    templateId: "itemTemplateFol",
    initialize: function(){

    },
    events: {
      "click": "clickFunc"
    },
    clickFunc: function(e){
      $(e.target).parents("#J_Picture").find(".ui-selectee").removeClass("ui-selected");
      this.$el.addClass("ui-selected");
    },
    render:function(){
      var self = this;
      var html = new EJS({element:self.templateId}).render(this.model.toJSON());
      this.$el.html(html);
      return this;
    }
  });
});