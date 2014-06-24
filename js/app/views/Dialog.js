/**
 * Dialog
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'jquery.zTree',
  'domReady!'
], function($, _, Backbone){
  return Backbone.View.extend({
    el: "#J_Modal",
    $bg: $(".modal-backdrop"),
    initialize: function(){
      _.bindAll(this, "show", "hide","showMsg","setBody","bindActionToBtnOk");
    },
    render: function(){

    },
    events: {
      "click .close": "close",
      "click .btn-default": "close"
    },
    close: function(){
      this.hide();
    },
    show: function(){
      this.$bg.addClass("in").show();
      this.$el.addClass("in").css("display","block");
      return this;
    },
    hide: function(){
      this.$el.removeClass("in").css("display","none");
      this.$bg.removeClass("in").hide();
    },
    //设置主体内容
    setBody: function(html){
      this.$el.find(".modal-body").html(html);
    },
    /**
     * 显示提示信息
     * @param msg
     * @param type
     *  - 默认空时绿色背景
     *  - danger  红色背景危险信息
     */
    showMsg: function(msg, type){
      var $msg = this.$el.find(".modal-msg");
      $msg.text(msg);
      if(type=="danger"){
        $msg.addClass("label-danger");
      }
      $msg.fadeIn();
      setTimeout(function(){
        $msg.stop(true,true).fadeOut(function(){ //隐藏
          $msg.removeClass("label-danger");
        });

      },1800);
    },
    //获取确定按钮dom对象
    getBtnOk: function(){
      return this.$el.find("#J_ModalSure");
    },
    // 向确定按钮绑定事件
    bindActionToBtnOk: function(func){
      var $btn = this.getBtnOk();
      $btn.off("click", "**");
      $btn.click(func);
    }
  });
});