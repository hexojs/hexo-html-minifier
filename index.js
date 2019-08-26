/* global hexo:true*/
'use strict';
hexo.config.html_minifier = Object.assign({
  exclude: [],
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  // Ignore '<!-- more -->' https://hexo.io/docs/tag-plugins#Post-Excerpt
  ignoreCustomComments: [/^\s*more/],
  removeComments: true,
  removeEmptyAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyJS: true,
  minifyCSS: true
}, hexo.config.html_minifier);

hexo.extend.filter.register('after_render:html', require('./lib/filter'));
