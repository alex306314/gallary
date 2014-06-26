/**
 * TreeRoom
 * 页面左侧 目录树
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'TreeMenu',
  'Dialog',
  'PagerModel',
  'PageFooter',
  'PicContainer',
  'ItemCollection',
  'JSelectBarModel',
  'JSelectBar',
  'ItemAction',
  'jquery.zTree',
  'jquery.zTree.exedit',
  "jquery.contextMenu",
  'jquery.rightClick',
  'domReady!'
], function($, _, Backbone, TreeMenu, Dialog, PagerModel,PageFooter,PicContainer,
            ItemCollection, JSelectBarModel, JSelectBar, ItemAction){
  window.gallary = window.gallary||{};
  //设置窗口大小
  gallary.setResize = function(){
    var $pc = $("#J_PicContainer");
    var ph = $("#J_PageFooter").height();
    var height = $(window).height() - $pc.offset().top - ph;
    $pc.css("height", height + "px");
    $("#J_Picture").css("min-height", (height-35) + "px");
  };

  gallary.mouseDownId = -1; //目录树点击事件触发对象 ID
  gallary.itemCollection = new ItemCollection;  //列表项数据集合
  gallary.selectedItems = new ItemCollection; //选中状态 Item 集合
  gallary.selectBarModel = new JSelectBarModel;  //控制命令条数据模型
  gallary.selectBar = new JSelectBar({model: gallary.selectBarModel});//控制命令条视图
  gallary.itemAction = new ItemAction;  //命令条及右键菜单动作实现

  $(document).click(function(e){
    if(gallary.selectedItems.length === 1
        && gallary.selectedItems.first().get("isReName")
        && !$(e.target).parents("#J_PicRightmenu")[0]
        && !$(e.target).parents("#J_ControlBar")[0]
        && !$(e.target).parents(".ui-widget-content")[0]){
      gallary.itemCollection.cancelReName();
    }
  });

  var ztree,   //目录树对象
       treeMenu,// 目录树右键菜单
       dialog = new Dialog, //弹出框对象
       pagerModel = new PagerModel({total:20}),  //分页数据
       pageFooter = new PageFooter({model:pagerModel}),  //页脚分页
       picContainer = new PicContainer,   //列表项view
       test;

  gallary.dialog = dialog;

  /**
   * 检测window resize事件
   */
  $(window).resize(function(){
    //console.log("top:  " + $("#J_PicContainer").offset().top);
    //console.log($(window).height())
    gallary.setResize();
  });
  /**
   * 通过页码获取相关页数据
   * @param id   获取对应ID 目录内所有项目数据
   * @param page 页码
   */
  gallary.getListByPager = function(id,page){
    var postData = {
      id: id,
      page: page
    };
    $.post(gallary.getListByPagerUrl, postData, function(data){
      //console.log(data);
      var $ss = $("#J_Picture .item");
      if(!!$ss[0]){
        $ss.animate({
          marginLeft: "-20px",
          opacity:0
        },200,"linear", function(){
          gallary.itemCollection.reset();
          gallary.itemCollection.add(data.items);
          pagerModel.set({page:page});
        });
      }else{
        gallary.itemCollection.reset();
        gallary.itemCollection.add(data.items);
        pagerModel.set({page:page});
      }

    }, "json");

  };


  //点击右键
  function zTreeOnRightClick(event, treeid,treeNode){
    //console.log(treeNode);
    ztree.selectNode(treeNode);
    //console.log(event);
    treeMenu.show(event);
  }
  //改名后事件
  function zTreeOnRename(event, treeId, treeNode, isCancel){
    if(!isCancel){
      var postData={};
      if(!treeNode.addNew){ //不是新建重命名
        console.log(treeNode);
        postData = {
          action: "rename",
          id : treeNode.id,
          name: treeNode.name
        };
      }else{//新建
        postData = {
          id: -1,
          action: "addnew",
          name: treeNode.name,
          pid : treeNode.pid
        };
      }
      $.post("getNodes.php",postData,function(data){
        if(treeNode.addNew){
          treeNode.id = data.id;
          treeNode.addNew = false;
          console.log(treeNode);
        }
      }, "json");
    }
  }
  //点击事件处理
  function zTreeOnMouseDown(event, treeId, treeNode){
    if(treeNode){
      gallary.mouseDownId = treeNode.id;
      gallary.getListByPager(treeNode, 1); //获取相关列表
    }
    console.log(treeNode);
  }

  //ztree 配置参数
  var setting = {
    view: {
      selectedMulti: false
    },
    async: {
      enable: false,
      url:"getNodes.php",
      autoParam:["id", "name"]
    },
    callback: {
      onRightClick: zTreeOnRightClick,
      onRename: zTreeOnRename,
      onMouseDown: zTreeOnMouseDown
    },
    edit:{
      enable: true,
      showRemoveBtn: false,
      showRenameBtn: false,
      drag: {
        isCopy: false,
        isMove: true
      }
    }
  };


  /**
   * 返回view类
   */
  return Backbone.View.extend({
    el: "#J_MainTree",
    initialize: function(){
      _.bindAll(this, "postCallback");
    },
    render: function(){
      $.post("getNodes.php",{
        action: "init"
      },this.postCallback,'json');

    },
    postCallback: function(data){
      gallary.ztree = ztree = $.fn.zTree.init(this.$el, setting,data); //实例化目录树
      treeMenu = new TreeMenu({ztree:ztree,dialog: dialog}); // 实例化目录树右键菜单
      pageFooter.render();
      gallary.getListByPager(data.id,1); //获取默认顶级目录数据
    }
  });
});