'use strict';
const micromatch = require('micromatch');
const minifier = import('html-minifier-next');
const optionsCache = new WeakMap();

const getMinifierOptions = options => {
  const keys = Object.keys(options).filter(key => key !== 'exclude');
  const cached = optionsCache.get(options);

  if (cached
    && keys.length === cached.keys.length
    && keys.every((key, index) => key === cached.keys[index] && options[key] === cached.values[index])) {
    return cached.options;
  }

  const minifierOptions = {};
  const values = [];

  for (const key of keys) {
    minifierOptions[key] = options[key];
    values.push(options[key]);
  }

  optionsCache.set(options, { keys, values, options: minifierOptions });
  return minifierOptions;
};

module.exports = async function(str, data) {
  const options = this.config.html_minifier;
  const path = data.path;
  const exclude = options.exclude;

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude)) return str;
  }

  try {
    const { minify } = await minifier;
    return await minify(str, getMinifierOptions(options));
  } catch (err) {
    throw new Error(`Path: ${path}\n${err}`);
  }
};
