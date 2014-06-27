/**
 * 图片上传弹出框视图
 *
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'EJS',
  'text!lib/uploadify/uploadify.css', //相应CSS文件
  'text!../js/app/tpl/tpl_upfilemodal.html',
  //uploadify 相关JS
  'swfupload',
  'swfobject',
  'jquery.uploadify',
  'domReady!'
], function($, _, Backbone, EJS, uploadifycss, template){
  window.gallary = window.gallary || {};

  return Backbone.View.extend({
    id: "J_UpfileModal",
    className: "modal up-modal",
    template: template,
    attributes: {
      style: "display:none"
    },
    ztree : -1, //保存目录树对象
    targetid: 0, //保存所选目录ID
    isShowTree: false,// 目录树显示状态
    speed: 300,
    initialize: function(){
      _.bindAll(this, "uploadSuccess", "uploadStart", "allComplete", "setUpTree", "zTreeOnClick",
        "boxShow", "boxHide");
      //添加CSS文件到HEAD
      $("head").prepend('<style type="text/css">' + uploadifycss + '</style>');
      this.render();
    },
    events: {
      "click .close" : "close",
      "click .show-tree": "showTree"
    },
    render: function(){
      this.$el.html(this.template);
      $("body").append(this.el);
      if(!$(".modal-backdrop")[0]){//添加弹出框背景层
        $("body").append('<div style="display:none" class="modal-backdrop fade"></div>');
      }
      var self = this;
      //初始化uploadify文件上传方法
      $("#btn_file_upload").uploadify({
        swf           : 'js/lib/uploadify/uploadify.swf',
        uploader      : 'js/lib/uploadify/uploadify.php',
        buttonClass: "btn btn-default",
        buttonText: "点击上传",
        //fileObjName: "",
        fileSizeLimit: "3MB",
        width: 110,
        height:45,
        formData     : {  //post 到后台的数据
          'timestamp' :  gallary.timestamp,
          'token'     :  gallary.token,
          targetid    :  this.targetid
        },
        onUploadSuccess: self.uploadSuccess,
        onUploadStart: self.uploadStart,
        onQueueComplete: self.allComplete
      });
      
    },
    //显示当前框体
    show: function(){
      if(this.ztree == -1){
        //初始化上传目录位置选择树
        this.setUpTree();
      }
      $(".modal-backdrop").show().addClass("in");
      this.$el.css({
        display: "block"
      });
    },
    //关闭
    close: function(){
      $(".modal-backdrop").hide().removeClass("in");
      this.$el.css({
        display: "none"
      });
    },
    uploadSuccess: function(file, data, response){
      //$("body").append(data);
    },
    uploadStart: function(){
      $("#btn_file_upload-queue").css("display", "block");
    },
    allComplete: function(data){
      var self = this;
      window.setTimeout(function(){
        $("#btn_file_upload-queue").css("display", "none");
        self.close();
        gallary.infobox.showInfo("成功上传" + data.filesSelected + "个文件！");
        gallary.getListByPager(self.targetid, 1);
      },1500);
      
    },
    //初始化上传目录位置选择树
    setUpTree: function(){
      var self = this;
      var setting = {
        view: {
          selectedMulti: false
        },
        callback: {
          onClick: self.zTreeOnClick
        }
      };
      this.ztree = $.fn.zTree.init($("#J_UpTree"), setting, gallary.ztree.getNodes());
      //初始化默认目录
      this.$(".breadcrumb").html('<li>'+ this.ztree.getNodeByParam("id", 0).name +'</li>');
    },
    //ztree 点击事件回调 刷新breadcrumb路径显示
    zTreeOnClick: function(event, treeId, treeNode) {
      //console.log(treeNode);
      //获取当前点击节点所有父节点
      this.targetid = treeNode.id;
      var node = treeNode;
      var names = [];
      while(node.id != 0){
        names.push(node.name);
        node = node.getParentNode();
      }
      var root = this.ztree.getNodeByParam("id", 0);
      names.push(root.name);
      names.reverse();
      //生成dom
      var html="";
      for(var i=0; i<names.length; i++){
        if(i !== names.length-1){
          html += '<li>'+ names[i] +'&nbsp;>&nbsp;</li>';
        }else{
          html += '<li>'+ names[i] +'</li>';
        }
      }
      this.$(".breadcrumb").html(html);
      //console.log(names)
      this.boxHide();
    },
    //修改位置点击事件 显示目录树
    showTree: function(){
      var $box = this.$(".tree-box");
      var self = this, speed=300;
      if(this.isShowTree){//隐藏
        this.boxHide();
      }else{
        this.boxShow();
      }
    },
    //位置选择弹出框显示
    boxShow: function(){
      var $box = this.$(".tree-box");
      var self = this;
      $box.css("display", "block").stop(true,true).animate({
        width:"569px",
        height:"260px"
      }, self.speed, "linear", function(){
        self.isShowTree = true;
      });
    },
    //位置选择弹出框隐藏
    boxHide: function(){
      var $box = this.$(".tree-box");
      var self = this;
      $box.stop(true,true).animate({
        width:0,
        height:0
      }, self.speed, "linear", function(){
        self.isShowTree = false;
        $box.css("display","none");
      });
    }
  });

});