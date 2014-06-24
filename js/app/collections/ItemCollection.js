/**
 * folder / image   collection
 * 数据 集合
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'ItemModel'
], function($, _, Backbone, ItemModel){
  return Backbone.Collection.extend({
    model: ItemModel,
    //添加单一项
    singleAdd: function(item){
      this.reset();
      this.add(item);
    },
    //添加多个值
    multiAdd: function(items){
      this.reset();
      this.add(items);
    },
    //选中所有
    select: function(){
      this.each(function(item){
        if(!item.get("selected")){
          item.select();
        }
      });
    },
    // 所有项取消选择
    unSelect: function(){
      var self = this;
      this.each(function(item){
        if(item.get("selected")){
          item.unSelect();
        }
      });
    }
  });
});