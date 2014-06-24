define([
    'jquery',
    'underscore',
    'backbone',
    'TreeRoom',
    'InfoBox',
    'domReady!'
], function($, _, Backbone, TreeRoom, InfoBox){
  window.gallary = window.gallary || {};

  gallary.getListByPagerUrl = "getListByPager.php";

  //初始化 左侧目录树
  var treeRoom = new TreeRoom();
  treeRoom.render();

  //初始化 信息提示框
  gallary.infobox = new InfoBox;
  gallary.infobox.render();

});