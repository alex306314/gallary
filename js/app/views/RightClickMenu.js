/**
 * 右侧右键菜单视图
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'RightClickMenuItem',
  'domReady!'
], function($, _, Backbone, RightClickMenuItem){
  window.gallary = window.gallary || {};

  return Backbone.View.extend({
    el: "#J_PicRightmenu",
    initialize: function(){
      _.bindAll(this, "imageShow", "hide");
      $(document).click(this.hide);
    },
    render: function(){

    },
    addOne: function(item){
      var v = new RightClickMenuItem({model: item});
      this.$el.append(v.render().el);
    },
    addAll: function(collection){
      this.$el.html("");
      collection.each(this.addOne, this);
    },
    //点击图片时显示
    imageShow: function(e){
      this.addAll(gallary.imageBar);
      this.$el.css({
        left: e.pageX + "px",
        top: e.pageY + "px",
        display: "block"
      });
    },
    folderShow: function(e){
      this.addAll(gallary.folderBar);
      this.$el.css({
        left: e.pageX + "px",
        top: e.pageY + "px",
        display: "block"
      });
    },
    hide: function(){
      this.$el.css({
        display:"none"
      });
    }
  });
});