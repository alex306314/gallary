/**
 * 主面包屑model
 */
define([
  'jquery',
  'underscore',
  'backbone'
  'CrumbsModel'
], function($, _, Backbone,CrumbsModel){
  return Backbone.Collection.extend({
    model: CrumbsModel
  });
})