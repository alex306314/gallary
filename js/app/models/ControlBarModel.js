/**
 * 命令按钮 单个数据模型
 */
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
  return Backbone.Model.extend({
    defaults:{
      action: "replace", //操作名称
      name: "替换",   //中文
      cls: ""    //class name
    }
  });
});