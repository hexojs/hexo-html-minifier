'use strict';

const hasOwn = (object, property) => Object.prototype.hasOwnProperty.call(object, property);

module.exports = function(options = {}) {
  const normalized = { ...options };
  const aliases = {
    minifyCSS: 'minifyCss',
    minifyJS: 'minifyJs'
  };

  for (const [legacyName, htmlnanoName] of Object.entries(aliases)) {
    if (hasOwn(normalized, legacyName) && !hasOwn(normalized, htmlnanoName)) {
      normalized[htmlnanoName] = normalized[legacyName];
    }

    delete normalized[legacyName];
  }

  const legacyRedundantOptions = [
    'removeScriptTypeAttributes',
    'removeStyleLinkTypeAttributes'
  ];

  if (!hasOwn(normalized, 'removeRedundantAttributes')) {
    const configuredOptions = legacyRedundantOptions.filter(option => hasOwn(normalized, option));

    if (configuredOptions.length) {
      normalized.removeRedundantAttributes = configuredOptions.some(option => normalized[option]);
    }
  }

  for (const option of legacyRedundantOptions) delete normalized[option];

  return normalized;
};
