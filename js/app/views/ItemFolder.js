/**
 * 文件夹视图
 */
define([
  'ItemFolderImageBase',
  'domReady!'
], function(ItemFolderImageBase){
  return ItemFolderImageBase.extend({
    templateId: "itemTemplateFol",
    //右键点击事件
    rightClick: function(e){
      //this.clickSelected(e);
      if(e.which == 3){
        this.clickSelected(e);
        gallary.rightMenu.folderShow(e);
      }
    }
  });
});