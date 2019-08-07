'use strict';
const minify = require('html-minifier').minify;
const micromatch = require('micromatch');

module.exports = function(str, data) {
  const options = this.config.html_minifier;
  const path = data.path;
  let exclude = options.exclude;

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude)) return str;
  }

  return minify(str, options);
};
