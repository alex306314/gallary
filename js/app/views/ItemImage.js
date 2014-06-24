/**
 * 图片文件视图
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
    templateId: "itemTemplatePic",
    initialize: function(){
      _.bindAll(this,"rightClick","clickSelected");
      this.listenTo(this.model, "change", this.render);
      //this.$el.find(".image").rightClick(this.rightClick);
    },
    events: {
      "click": "clickFunc",
      "mousedown .image": "rightClick"
    },
    //左键点击
    clickFunc: function(e){
      this.clickSelected(e);
    },
    //右键点击事件
    rightClick: function(e){
      //this.clickSelected(e);
      $(e.target).bind('contextmenu',function(e){
        return false;
      });
      if(e.which == 3){
        this.clickSelected(e)
      }
    },
    //添加选中状态class
    clickSelected: function(e){
      gallary.selectedItems.singleAdd(this);
      gallary.itemCollection.unSelect();
      this.model.select();
    },
    render:function(){
      var self = this;
      var html = new EJS({element:self.templateId}).render(this.model.toJSON());
      this.$el.html(html);
      if(this.model.get("selected")){
        this.$el.addClass("ui-selected");
      }else{
        this.$el.removeClass("ui-selected");
      }
      return this;
    }
  });
});