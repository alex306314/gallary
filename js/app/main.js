requirejs.config({
  "baseUrl" : "./js",
  urlArgs: "a=" +  ((new Date()).getTime()+"").substr(-4),
  "paths" : {
    "jquery" : "lib/jquery",
    "backbone": "lib/backbone",
    "underscore" : "lib/underscore",
    "domReady": "lib/require.domready",
    "text" : "lib/require.text",
    "EJS" : "lib/ejs",
    "jquery.zTree": "lib/jquery.ztree.core-3.5",
    "jquery.zTree.exedit": "lib/jquery.ztree.exedit-3.5",
    "jquery.contextMenu":"lib/jquery.contextMenu",
    "jquery.rightClick": "lib/jquery.rightClick",
    'app': "app/app",   //主入口程序
    'TreeRoom': "app/views/TreeRoom",  //目录树 程序主逻辑控制
    'TreeMenu': "app/views/TreeMenu", //右键菜单
    'InfoBox': "app/views/InfoBox",  //信息提示框
    'Dialog': "app/views/Dialog",      // 弹出框view
    PagerModel: "app/models/PagerModel", // 分页数据
    PageFooter: "app/views/PageFooter",   //页脚分页视图
    ItemModel: "app/models/ItemModel",  //列表项数据模型
    ItemCollection: "app/collections/ItemCollection",  //列表项数据模型集合
    ItemFolder: "app/views/ItemFolder",   //文件夹视图
    ItemImage: "app/views/ItemImage",     //图片视图
    PicContainer: "app/views/PicContainer",   //列表容器
    JSelectBarModel: "app/models/JSelectBarModel",   //操作项数据模型
    JSelectBar: "app/views/JSelectBar",       //操作项视图
    ControlBarModel: "app/models/ControlBarModel", //右侧菜单项 模型
    ControlBarCollection: "app/collections/ControlBarCollection",  //菜单项集合
    JControlBar: "app/views/JControlBar",     //命令控制条
    JControlBarItem: "app/views/JControlBarItem",  //命令控制条单个项
    RightClickMenuItem: "app/views/RightClickMenuItem", //右键菜单个项
    RightClickMenu: "app/views/RightClickMenu",      //右键菜单视图
    ItemFolderImageBase: "app/views/ItemFolderImageBase"  // 文件夹 图片视图基类
  },
  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: "Backbone"
    },
    'underscore': {
      exports: "_"
    },
    'EJS': {
      exports: "EJS"
    },
    'jquery.ztree':{
      deps: ['jquery'],
      exports: 'jQuery.fn.zTree'
    },
    'jquery.ztree.exedit' : {
      deps:['jquery','jquery.zTree'],
      exports: "jQuery.fn.zTree.exedit"
    },
    "jquery.contextMenu": {
      deps: ['jquery'],
      exports: 'jQuery.fn.contextMenu'
    },
    "jquery.rightClick":{
      deps: ['jquery'],
      exports: "jQuery.fn.rightClick"
    }
  }
});

require(['app']);