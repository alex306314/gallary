/**
 * Treemenu
 * 移动 命令 弹出框目录树
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'jquery.zTree',
  'domReady!'
], function($, _, Backbone){
  window.gallary = window.gallary || {};
  var modalTree, //弹出框树
      ztree, //目录树
      dia,
      moveid = -1,  //要移动的节点 tId
      movepid = -1, // 要移动节点的父ID
      targetid = -1; //移动目标节点 tId

  function zTreeOnClick(event, treeId, treeNode) {
    targetid = -1;
    if(moveid == treeNode.id){
      dia.showMsg("请不要移动到同源目录下!","danger");
      modalTree.cancelSelectedNode();
      return;
    }
    if(movepid == treeNode.id){
      dia.showMsg("要移动的文件夹就在此目录下,不需要移动!","danger");
      modalTree.cancelSelectedNode();
      return;
    }
    targetid = treeNode.id;
  }

  /**
   * 确定按钮回调
   */
  function btnOKCallback(e){
    if(targetid == -1){
      dia.showMsg("请选择要移动到哪个文件夹!","danger");
      return;
    }
    var targetNode = ztree.getNodeByParam("id", targetid);
    var treeNode = ztree.getNodeByParam("id",moveid);
    var postData = {
      action : "move",
      moveid: moveid,
      targetid: targetid
    };
    $.post("getNodes.php",postData,function(data){
      ztree.moveNode(targetNode,treeNode);
      dia.hide();
    },'json');

  }


  var setting = {
    view: {
      selectedMulti: false
    },
    callback: {
      onClick: zTreeOnClick
    }
  };






  return Backbone.View.extend({
    el: "#tree_menu",
    ztree: -1, // 保存树对象
    dialog:-1,
    initialize: function(options){
      $.extend(this, options);
      _.bindAll(this, "hide","treeAdd","treeMove","treeRename","treeDelete");
      dia = this.dialog;
      ztree = this.ztree;
      //点击事件隐藏
      $("body").click(this.hide);
    },
    events: {
      "click li": "menuItemClick"
    },
    menuItemClick: function(e){
      var cls = e.currentTarget.className;
      if(cls.indexOf("tree-add")>=0){  //添加
        this.treeAdd();
      }else if(cls.indexOf("tree-move")>=0){//移动
        this.treeMove();
      }else if(cls.indexOf("tree-rename")>=0){//重命名
        this.treeRename();
      }else if(cls.indexOf("tree-delete")>=0){//删除
        this.treeDelete();
      }
      //console.log(e.currentTarget.className);
    },
    treeAdd: function(){
      var nodes = this.ztree.getSelectedNodes();
      var newNode = {name:"新建文件夹", pid:nodes[0].pid, addNew: true};
      newNode = this.ztree.addNodes(nodes[0], newNode);
      this.ztree.editName(newNode[0]);
    },
    //移动节点
    treeMove: function(){
      //获取当前选中节点
      var nodes = this.ztree.getSelectedNodes();
      moveid = nodes[0].id;
      movepid = nodes[0].pid;
      //console.log(nodes[0].pid)

      if(nodes[0].pid == -1){
        gallary.infobox.showInfo("顶级目录不允许移动", "danger");
        return;
      }

      //定义弹出框主体内容
      var id = "J_ModalTree";
      var html = '<ul id="'+id+'" class="left-move ztree"></ul>';
      this.dialog.setBody(html);
      modalTree = $.fn.zTree.init($("#" + id), setting,this.ztree.getNodes());
      this.dialog.show().bindActionToBtnOk(btnOKCallback); //显示弹出弹体 并绑定回调事件
    },
    treeRename: function(){
      var nodes = this.ztree.getSelectedNodes();
      this.ztree.editName(nodes[0]);
    },
    // remove 所选节点
    treeDelete: function () {
      var self = this;
      var nodes = this.ztree.getSelectedNodes();
      if (confirm("你确定要删除文件夹： " + nodes[0].name + " 吗?")) {
        var postData = {
          action: "remove",
          id: nodes[0].id,
          name: nodes[0].name
        };
        $.post("getNodes.php", postData, function (data) {
          console.log(data);
          self.ztree.removeNode(nodes[0]);
        });
      }
    },
    show: function(event){
      this.$el.css({
        left: event.pageX + "px",
        top: event.pageY + "px"
      }).show();
    },
    hide: function(){
      this.$el.hide();
    }
  });
});