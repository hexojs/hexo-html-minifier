'use strict';
const htmlnano = require('htmlnano');
const micromatch = require('micromatch');

module.exports = async function(str, data) {
  const options = { ...this.config.html_minifier };
  const path = data.path;
  const { exclude, ignoreCustomComments, removeComments } = options;

  if (path && exclude && exclude.length) {
    if (micromatch.isMatch(path, exclude)) return str;
  }

  delete options.exclude;
  delete options.ignoreCustomComments;
  options.skipConfigLoading = true;

  if (removeComments === true) {
    if (Array.isArray(ignoreCustomComments) && ignoreCustomComments.length) {
      options.removeComments = comment => {
        comment = comment.replace(/^<!--|-->$/g, '');

        for (const regex of ignoreCustomComments) {
          regex.lastIndex = 0;
          const preserve = regex.test(comment);
          regex.lastIndex = 0;
          if (preserve) return false;
        }

        return true;
      };
    } else {
      options.removeComments = 'safe';
    }
  }

  try {
    const result = await htmlnano.process(str, options);
    return result.html;
  } catch (err) {
    throw new Error(`Path: ${path}\n${err}`);
  }
};
