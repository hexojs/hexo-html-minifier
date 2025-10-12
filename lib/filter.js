'use strict';
const htmlnano = require('htmlnano');
const micromatch = require('micromatch');

module.exports = async function(str, data) {
  const options = this.config.html_minifier;
  const path = data.path;
  const exclude = options.exclude;

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude)) return str;
  }

  try {
    const result = await htmlnano.process(str, options);
    return result.html;
  } catch (err) {
    throw new Error(`Path: ${path}\n${err}`);
  }
};
