'use strict';
const minify = require('html-minifier').minify;
const micromatch = require('micromatch');

module.exports = function(str, data) {
  const options = this.config.html_minifier;
  const path = data.path;
  const exclude = options.exclude;

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude, { basename: true })) return str;
  }

  return minify(str, options);
};
