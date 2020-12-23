'use strict';

const htmlnano = require('htmlnano');
const htmlnanoSafePreset = htmlnano.presets.safe;
const micromatch = require('micromatch');

module.exports = function(str, data) {
  const options = this.config.html_minifier;
  const path = data.path;
  const exclude = options.exclude;

  delete options.exclude;

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude)) return str;
  }

  try {
    return htmlnano.process(str, options, htmlnanoSafePreset, {})
      .then(result => result.html);
  } catch (err) {
    throw new Error(`Path: ${path}\n${err}`);
  }
};
