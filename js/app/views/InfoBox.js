/**
 * info box
 *
 * <div id="J_Infor_Box" class="information label" style="display:none">根目录不允许移动</div>
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'domReady!'
], function($, _, Backbone){

  return Backbone.View.extend({
    tagName: "div",
    id: "J_Infor_Box",
    className: "information label",
    attributes: {
      style:"display:none"
    },
    initialize: function(){
      _.bindAll(this, "showInfo");
    },
    render: function(){
      $("#wrap").append(this.el);
      return this;
    },
    showInfo: function(info,type){
      //type = type==undefined ?"normal":type;
      var $el = this.$el;
      $el.html(info);
      $el.css({
        zIndex: 100,
        top:"70px",
        display:"block"
      });
      if(type == "danger"){
        $el.addClass("label-danger");
      }
      $el.stop(true,true).animate({
        opacity: 1,
        top: "95px"
      },400,"linear", function(){
        setTimeout(function(){ //显示一段时间自动隐藏
          $el.stop(true,true).animate({
            opacity:0
          },800,"linear", function(){
            $el.removeClass("label-danger").css({
              top: "70px",
              display: "none"
            });
          });
        }, 1800);
      });

    }
  });
});