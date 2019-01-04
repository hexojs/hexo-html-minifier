/* global hexo:true*/
'use strict';
hexo.config.html_minifier = Object.assign({
  exclude: []
}, hexo.config.html_minifier);

hexo.extend.filter.register('after_render:html', require('./lib/filter'));
