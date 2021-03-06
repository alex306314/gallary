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
    },
    //获取folder 的数量
    getFolderNum: function(){
      return (this.where({type:1})).length;
    },
    //获取image 的数量
    getImageNum: function(){
      return (this.where({type:2})).length;
    },
    //取消重命名状态
    cancelReName: function(){
      this.each(function(item){
        item.set({isReName: false});
      },this);
    }
  });
});