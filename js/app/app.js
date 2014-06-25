define([
    'jquery',
    'underscore',
    'backbone',
    'TreeRoom',
    'InfoBox',
    'ControlBarCollection',
    'JControlBar',
    'RightClickMenu',
    'domReady!'
], function($, _, Backbone, TreeRoom, InfoBox, ControlBarCollection,JControlBar,
            RightClickMenu){
  window.gallary = window.gallary || {};

  gallary.getListByPagerUrl = "getListByPager.php";
  gallary.ctrl = false; //ctrl 键是否按下
  gallary.controlBar = new JControlBar; //控制菜单
  gallary.rightMenu = new RightClickMenu; //右键菜单

  //folder 控制条
  gallary.folderBar = new ControlBarCollection([
    {action:"move", name: "移动", cls:"move"},
    {action:"rename", name: "重命名", cls:"rename"},
    {action:"delete", name: "删除", cls:"delete"}
  ]);
  //image 控制条
  gallary.imageBar = new ControlBarCollection([
    {action:"replace", name: "替换", cls:"replace"},
    {action:"copy", name: "多图复制", cls:"copy"},
    {action:"move", name: "移动", cls:"move"},
    {action:"rename", name: "重命名", cls:"rename"},
    {action:"checkSee", name: "查看引用", cls:"check-see"},
    {action:"edit", name: "编辑", cls:"edit"},
    {action:"toPhone", name: "适配手机", cls:"tophone"},
    {action:"delete", name: "删除", cls:"delete"}
  ]);

  //ajax 提交 默认参数包装
  gallary.ajax = function(options){
    var defaults = {//默认参数
      type: "post",
      url: gallary.getListByPagerUrl,
      data: {},
      dataType: 'json',
      success: function(){},
      beforeSend: function(){}
    };
    $.extend(defaults, options);
    $.ajax(defaults);
  };


  //
  $(window).keydown(function(e){
    gallary.ctrl = e.ctrlKey;
  });
  $(window).keyup(function(e){
    gallary.ctrl = e.ctrlKey;
  });

  //初始化 左侧目录树
  var treeRoom = new TreeRoom();
  treeRoom.render();

  //初始化 信息提示框
  gallary.infobox = new InfoBox;
  gallary.infobox.render();



});