/**
 * 主面包屑model
 */
define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){
	return Backbone.Model.extend({
		defaults: {
			id: 0,
      name: ""
		}
	});
})