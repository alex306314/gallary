/**
 * 右侧主面包屑视图 Crumbs
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'EJS',
  'domReady!'
], function($, _, Backbone, EJS){
	el: "#J_Crumbs",
  templateid: "tpl_crumbs",
	initialize: function(){

	},
	events:{

	},
	render: function(){
	 this.addAll();
	},
  addAll: function(){
    this.$el.html("");
    gallary.crumbsCollection.each(this.addOne,this);
  },
  addOne: function(item){
    var self = this;
    var html = new EJS({element: self.templateid}).render(item.toJSON());
    this.$el.append(html);
  }
});