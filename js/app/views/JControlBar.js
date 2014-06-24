/**
 * 命令按钮视图
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'JControlBarItem',
  'domReady!'
], function($, _, Backbone, JControlBarItem){
  window.gallary = window.gallary || {};
  return Backbone.View.extend({
    el: "#J_ControlBar",
    initialize: function(){

    },
    render: function(){
      var self = this;
      var html = new EJS({element:self.templateId}).render(this.model.toJSON());
      this.$el.html(html);
      return this;
    },
    addOne: function(item){
      var i = new JControlBarItem({model:item});
      this.$el.append(i.render().el);
    },
    addAll: function(collection){
      this.$el.html("");
      collection.each(this.addOne, this);
    }
  });
});