/**
 * item 处理
 * JControlBar  以及 item 右键菜单 事件具体处理
 */
define([
  'jquery',
  'domReady!'
  ], function($){
  window.gallary = window.gallary || {};
    
  var moveids = [];
  if(gallary.selectedItems){
    gallary.selectedItems.each(function(item){
      moveids.push(item.get("id"));
    });
  }
  
  console.log(gallary.selectedItems);
  var ztree=gallary.ztree,
      modalTree,  //保存弹出框目录树对象
      moveid= 1,  //当前要移动的对象ID
      movepid= 2, //当前要移动对象父ID
      targetid = -1, //要移动到的目的目录ID
      id="move_to_tree";   //弹出框目录树ID 属性值

  function zTreeOnClick(event, treeId, treeNode) {
    if(moveid == treeNode.id){
      gallary.dialog.showMsg("请不要移动到同源目录下!","danger");
      modalTree.cancelSelectedNode();
      return;
    }
    if(movepid == treeNode.id){
      gallary.dialog.showMsg("要移动的文件夹就在此目录下,不需要移动!","danger");
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
      gallary.dialog.showMsg("请选择要移动到哪个文件夹!","danger");
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
      gallary.dialog.hide();
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



  return {
    //重命名
    reName: function(){
      if(gallary.selectedItems.length == 1){
        var item = gallary.selectedItems.first();
        window.item = item;
        item.set({isReName: true});
      }
    },
    //delete
    delete: function(){
      if(gallary.selectedItems.length == 1){
        var item = gallary.selectedItems.first();
        if(confirm("你确定要删除: " + item.get("name") + " 吗？")){
          var postData = {
            action: 'delete',
            id: item.get("id")
          };
          gallary.ajax({
            data: postData,
            success: function(data){
              gallary.itemCollection.remove(gallary.itemCollection.get(item.cid));
              gallary.infobox.showInfo("删除成功!");
            }
          });

        }
      }
    },
    //
    move: function(){
      var html = '<ul id="'+id+'" class="left-move ztree"></ul>';
      gallary.dialog.setBody(html);
      modalTree = $.fn.zTree.init($("#" + id), setting, gallary.ztree.getNodes());
      gallary.dialog.show().bindActionToBtnOk(btnOKCallback); //显示弹出框体 并绑定回调事件
    }
  };
});