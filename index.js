/* global hexo:true*/
'use strict';

const normalizeOptions = require('./lib/options');

hexo.config.html_minifier = Object.assign({
  exclude: [],
  collapseBooleanAttributes: true,
  collapseWhitespace: 'conservative',
  // Ignore '<!-- more -->' https://hexo.io/docs/tag-plugins#Post-Excerpt
  ignoreCustomComments: [/^\s*more/],
  removeComments: true,
  removeEmptyAttributes: true,
  removeRedundantAttributes: true,
  removeAttributeQuotes: true,
  minifyJs: true,
  minifyCss: true
}, normalizeOptions(hexo.config.html_minifier));

hexo.extend.filter.register('after_render:html', require('./lib/filter'));
