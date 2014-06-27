/**
 * 上传／新建／回收站视图
 *
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'UpFileModal',
  'domReady!'
], function($, _, Backbone,UpFileModal){
  window.gallary = window.gallary || {};
  gallary.upFileModal = -1;
  return Backbone.View.extend({
    el: "#J_UpAndNew",
    initialize: function(){
      gallary.upFileModal = new UpFileModal;
    },
    events:{
      "click .up": "upLoad",
      "click .new": "createNew",
      "click .recycle": "recycle"
    },
    //上传
    upLoad: function(){
      gallary.upFileModal.show();
    },
    //创建新文件夹
    createNew: function(){

    },
    //回收站
    recycle: function(){

    }
  });
});