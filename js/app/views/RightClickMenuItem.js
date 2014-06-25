/**
 * 右侧右键菜单视图
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'EJS',
  'domReady!'
], function($, _, Backbone, EJS){
  window.gallary = window.gallary || {};
  return Backbone.View.extend({
    tagName: "li",
    templateId: "tpl_picright_menu",
    attributes:{
      style: "display:list-item;"
    },
    initialize: function(){
      this.$el.addClass(this.model.get("cls"));
    },
    events:{
      "click": "click"
    },
    render: function(){
      var self = this;
      var html = new EJS({element:self.templateId}).render(this.model.toJSON());
      this.$el.html(html);
      return this;
    },
    //菜单项点击事件处理
    click: function(e){
      var action = this.model.get("action");
      switch(action){
        case "replace":
            this.funcReplace();
          break;
        case "copy":
            this.funcCopy();
          break;
        case "move":
            this.funcMove();
          break;
        case "rename":
            this.funcRename();
          break;
        case "checkSee":
            this.funcCheckSee();
          break;
        case "edit":
            this.funcEdit();
          break;
        case "toPhone":
            this.funcToPhone();
          break;
        case "delete":
            this.funcDelete();
          break;
      }
      gallary.rightMenu.hide();
    },
    //替换
    funcReplace: function(){

    },
    //复制
    funcCopy: function(){

    },
    //移动
    funcMove: function(){

    },
    //重命名
    funcRename: function(){
      if(gallary.selectedItems.length == 1){
        var item = gallary.selectedItems.first();
        item.set({isReName: true});
      }
    },
    //查看引用
    funcCheckSee: function(){

    },
    //编辑
    funcEdit: function(){

    },
    //适配手机
    funcToPhone: function(){

    },
    //删除
    funcDelete: function(){
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
            }
          });

        }
      }
    }
  });
});