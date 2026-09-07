/* global hexo:true*/
'use strict';

const normalizeOptions = require('./lib/options');
const warn = hexo.log?.warn?.bind(hexo.log);
const options = normalizeOptions(hexo.config.html_minifier, warn);

hexo.config.html_minifier = Object.assign({
  exclude: [],
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  // Ignore '<!-- more -->' https://hexo.io/docs/tag-plugins#Post-Excerpt
  ignoreCustomComments: [/^\s*more/],
  removeComments: true,
  removeEmptyAttributes: true,
  removeDefaultTypeAttributes: true,
  minifyJS: true,
  minifyCSS: true
}, options);

hexo.extend.filter.register('after_render:html', require('./lib/filter'));
