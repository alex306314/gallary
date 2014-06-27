/**
 * picContainer
 * 右侧列表主体容器
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'ItemFolder',
  'ItemImage',
  '',
  'domReady!'
], function($, _, Backbone, ItemFolder,ItemImage){

  window.gallary = window.gallary || {};

  return Backbone.View.extend({
    el: "#J_PicContainer",
    initialize: function(){
      gallary.setResize();

      $("#J_PicContainer").bind('contextmenu',function(e){
        return false;
      });
      //_.bindAll(this);
      this.listenTo(gallary.itemCollection, 'add', this.addOne);
      this.listenTo(gallary.itemCollection, 'reset', this.addAll);
      this.listenTo(gallary.itemCollection, 'remove', this.addAll);
    },
    events: {
    },
    render: function(){

    },
    addOne: function(item){
      var view;
      if(item.get("type") == 1){ //folder
        view = new ItemFolder({model: item});
      }else if(item.get("type") == 2){ //image
        view = new ItemImage({model: item});
      }
      this.$("#J_Picture").append(view.render().el);
    },
    addAll: function(){
      var self = this;
        self.$("#J_Picture .item").remove();
        gallary.itemCollection.each(self.addOne, self);
    }
  });
});