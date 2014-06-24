/**
 * 分页数据  PagerModel
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'domReady!'
], function($, _, Backbone){
  return Backbone.Model.extend({
    defaults: {
      page: 1,   //当前页码
      total: 10,  //总页数
      perNum: 10  //每页显示个数
    }
  });
});