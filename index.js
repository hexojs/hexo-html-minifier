var assign = require('object-assign');

hexo.config.html_minifier = assign({
  exclude: [],
  priority : 10
}, hexo.config.html_minifier);

hexo.extend.filter.register('after_render:html', require('./lib/filter'), hexo.config.html_minifier.priority);
