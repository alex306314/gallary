define([
  'jquery',
  'domReady!'
], function($) {
  window.gallary = window.gallary || {};

  var ItemAction = function() {

  };
  ItemAction.prototype = {
    inititalize: function() {

    },
    //重命名
    reName: function() {
      if (gallary.selectedItems.length == 1) {
        var item = gallary.selectedItems.first();
        window.item = item;
        item.set({
          isReName: true
        });
      }
    },
    //delete
    delete: function() {
      if (gallary.selectedItems.length == 1) {
        var item = gallary.selectedItems.first();
        if (confirm("你确定要删除: " + item.get("name") + " 吗？")) {
          var postData = {
            action: 'delete',
            id: item.get("id")
          };
          gallary.ajax({
            data: postData,
            success: function(data) {
              gallary.itemCollection.remove(gallary.itemCollection.get(item.cid));
              gallary.infobox.showInfo("删除成功!");
            }
          });

        }
      }
    },
    //移动对象到选定目录
    move: function() {
      var ztree = gallary.ztree,
        modalTree, //保存弹出框目录树对象
        moveid = -1, //当前要移动的对象ID
        movepid = -1, //当前要移动对象父ID
        targetid = -1, //要移动到的目的目录ID
        id = "move_to_tree"; //弹出框目录树ID 属性值
      //要移动的对象列表ID数组
      var moveids = [], moveNames = [];
      gallary.selectedItems.each(function(item) {
        moveids.push(item.get("id"));
        movepid = (item.get("pid"));
        moveNames.push(item.get("name"));
      });
      

      function zTreeOnClick(event, treeId, treeNode) {
        if (moveids.indexOf(treeNode.id) >= 0) {//所选目录ID 包含在要移动对象ID数组中
          gallary.dialog.showMsg("请不要移动到同源目录下!", "danger");
          modalTree.cancelSelectedNode();
          return;
        }
        if (movepid == treeNode.id) { //要移动的对象已经在所选目录中
          gallary.dialog.showMsg("要移动的文件夹就在此目录下,不需要移动!", "danger");
          modalTree.cancelSelectedNode();
          return;
        }
        targetid = treeNode.id;
      }
      /**
       * 确定按钮回调
       */
      function btnOKCallback(e) {
        if (targetid == -1) {
          gallary.dialog.showMsg("请选择要移动到哪个文件夹!", "danger");
          return;
        }
        var postData = {
          action: "move",
          id: -1,  //兼容测试属性 可删除
          moveids: moveids.join(","),
          targetid: targetid
        };
        gallary.ajax({
          data: postData,
          success: function(data){
            gallary.itemCollection.reset();
            gallary.itemCollection.add(data.items);
            gallary.dialog.hide();
            gallary.infobox.showInfo(moveNames.join(",") + " 等对象已经成功移动！");
          }
        });
      }

      var setting = {
        view: {
          selectedMulti: false
        },
        callback: {
          onClick: zTreeOnClick
        }
      };

      //弹出框目录树具体实现
      var html = '<ul id="' + id + '" class="left-move ztree"></ul>';
      gallary.dialog.setBody(html);
      modalTree = $.fn.zTree.init($("#" + id), setting, gallary.ztree.getNodes());
      gallary.dialog.show().bindActionToBtnOk(btnOKCallback); //显示弹出框体 并绑定回调事件
    }
  };

  return ItemAction;
});