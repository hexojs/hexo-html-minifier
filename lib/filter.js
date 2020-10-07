'use strict';
const minify = require('html-minifier-terser').minify;
const micromatch = require('micromatch');

module.exports = function(str, data) {
  const options = this.config.html_minifier;
  const path = data.path;
  const exclude = options.exclude;

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude)) return str;
  }

  try {
    return minify(str, options);
  } catch (err) {
    throw new Error(`Path: ${path}\n${err}`);
  }
};
