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
    }
  });
});