/**
 * 命令按钮 数据模型 集合
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'ControlBarModel'
], function($, _, Backbone,ControlBarModel){
  return Backbone.Collection.extend({
    model: ControlBarModel
  });
});