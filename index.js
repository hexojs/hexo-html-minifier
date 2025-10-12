/* global hexo:true*/
'use strict';
hexo.config.html_minifier = Object.assign({
  exclude: [],
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  removeComments: false,
  removeEmptyAttributes: true,
  removeAttributeQuotes: true,
  minifyJs: true,
  minifyCss: true
}, hexo.config.html_minifier);

hexo.extend.filter.register('after_render:html', require('./lib/filter'));
