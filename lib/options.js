'use strict';

const hasOwn = (object, property) => Object.prototype.hasOwnProperty.call(object, property);

module.exports = function(options = {}, warn = () => {}) {
  const normalized = { ...options };
  const hasScriptOption = hasOwn(normalized, 'removeScriptTypeAttributes');
  const hasStyleOption = hasOwn(normalized, 'removeStyleLinkTypeAttributes');

  if (!hasScriptOption && !hasStyleOption) return normalized;

  if (!hasOwn(normalized, 'removeDefaultTypeAttributes')) {
    const removeScriptType = hasScriptOption ? Boolean(normalized.removeScriptTypeAttributes) : true;
    const removeStyleLinkType = hasStyleOption ? Boolean(normalized.removeStyleLinkTypeAttributes) : true;

    if (removeScriptType === removeStyleLinkType) {
      normalized.removeDefaultTypeAttributes = removeScriptType;
    } else {
      normalized.removeDefaultTypeAttributes = false;
      warn('html-minifier-next combines removeScriptTypeAttributes and removeStyleLinkTypeAttributes into removeDefaultTypeAttributes; preserving both type attributes because the legacy settings differ');
    }
  }

  delete normalized.removeScriptTypeAttributes;
  delete normalized.removeStyleLinkTypeAttributes;

  return normalized;
};
