/**
 * 页脚 分页部分
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'domReady!'
], function($, _, Backbone){
  window.gallary = window.gallary || {};
  return Backbone.View.extend({
    el : "#J_PageFooter",
    templateId : "tpl_page_footer",
    initialize: function(){
      _.bindAll(this, "generatePagination", "generatePagesNumber", "pagerRefresh");
      this.listenTo(this.model, "change", this.pagerRefresh);
    },
    events: {
      "click .pagination a": "pagerClick",
      "click #J_GotoPage" : "gotoPage"
    },
    render: function(){
      var html = $("#" + this.templateId).html();
      this.$el.html(html);
      this.pagerRefresh();
    },
    //分页项点击事件
    pagerClick: function(e){
      var $s = $(e.target);
      if($s.parent().hasClass("disabled") || $s.parent().hasClass("active")){
        return;
      }
      var data_page = parseInt($s.attr("data-page"));
      gallary.getListByPager(gallary.mouseDownId,data_page);
    },
    //跳转页面事件
    gotoPage: function(e){
      e.preventDefault();
      var $ipt = this.$el.find("#J_GotoPageNumber");
      var val = $ipt.val();
      if(val === "") return;  //空值不处理
      var data_page = parseInt(val);
      if(data_page == this.model.get("page")) return; //当前页和输入页相同不做处理
      gallary.getListByPager(gallary.mouseDownId,data_page);
    },
    //刷新分页 重新生成
    pagerRefresh: function(){
      //插入分页
      this.$el.find(".pagination").html(this.generatePagination());
      //插入页码数
      this.$el.find(".pages-number").html(this.generatePagesNumber());
    },
    //生成分页
    generatePagination: function(){

      var page = this.model.get("page"), //当前页码
          total = this.model.get("total"), //总页数
          perNum = this.model.get("perNum"), //每页显示个数
          show = 5,  //要显示页码控制点个数
          start, //循环显示起始页
          end,   //显示结束页
          test;
      var half = Math.ceil(show/2);
      start = page - half+1;
      end = page + half;
      if(page < half){
        start = 1;
        end = start + show;
      }
      if(page > total-half){
        end = total+1;
        start = end - show;
      }
      var html = "<ul>";

      if(page > 1 ){ //上一页
        html += '<li><a class="serverprevious" data-page="'+ (page-1) +'">«</a></li>';
      }else{
        html += '<li class="disabled"><a class="serverprevious disabled">«</a></li>';
      }

      if(start > 1){ //没有显示第一页
        html += '<li><a class="page" data-page="1">1</a></li>';
      }

      if(start > 2){ //显示不连续省略符
        html += '<li class="disabled"><span>…</span></li>';
      }

      for(var i=start; i<end; i++){ //分页主体
        if(i>0){
          if(i == page){
            html += '<li class="active"><a class="page" data-page="'+ i +'">'+ i +'</a></li>';
          }else{
            html += '<li><a class="page" data-page="'+ i +'">'+ i +'</a></li>';
          }
        }
      }

      if(end < total){ //显示不连续省略符
        html += '<li class="disabled"><span>…</span></li>';
      }

      if(end < total+1){ //没有显示最后一页
        html += '<li><a class="page" data-page="'+ total +'">'+ total +'</a></li>';
      }

      if(page < total ){ //下一页
        html += '<li><a class="servernext" data-page="'+ (page+1) +'">»</a></li>';
      }else{
        html += '<li class="disabled"><a class="servernext  disabled">»</a></li>';
      }

      html += "</ul>";
      return html;
    },
    //生成总页数
    generatePagesNumber: function(){
      return "共有<span>"+ this.model.get("total") +"</span>页";
    }
  });
});