/**
 * 图片文件视图
 */
define([
  'ItemFolderImageBase',
  'domReady!'
], function(ItemFolderImageBase){
  return ItemFolderImageBase.extend({
    templateId: "itemTemplatePic",
    //右键点击事件
    rightClick: function(e){
      e.stopPropagation();
      //this.clickSelected(e);
      if(e.which == 3){
        this.clickSelected(e);
        gallary.rightMenu.imageShow(e);
      }
    }
  });
});