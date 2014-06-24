/**
 * 操作命令条数据模型
 */
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  return Backbone.Model.extend({
    defaults: {
      selectedMsg: "已经选择了1张图片",
      itemType: 0  //选中项类型 0:多选或未选  1: folder   2: image
    }
  });
});