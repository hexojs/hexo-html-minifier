# hexo-html-minifier

[![Build Status](https://github.com/hexojs/hexo-html-minifier/workflows/Tester/badge.svg)](https://github.com/hexojs/hexo-html-minifier/actions?query=workflow%3ATester)
[![NPM version](https://badge.fury.io/js/hexo-html-minifier.svg)](https://www.npmjs.com/package/hexo-html-minifier)

Minify HTML files with [htmlnano](https://github.com/maltsev/htmlnano).

## Installation

``` bash
$ npm install hexo-html-minifier --save
```

## Options

You can set [htmlnano options](https://htmlnano.netlify.app/modules) in the main `_config.yml` file:

``` yaml
html_minifier:
  exclude:
```

- **exclude**: Exclude files from being minified. Support [globbing patterns](https://github.com/micromatch/micromatch#extended-globbing).

Default options:

``` yaml
html_minifier:
  collapseBooleanAttributes: true
  collapseWhitespace: conservative
  # Ignore '<!-- more -->' https://hexo.io/docs/tag-plugins#Post-Excerpt
  ignoreCustomComments: [ !!js/regexp /^\s*more/]
  removeComments: true
  removeEmptyAttributes: true
  removeRedundantAttributes: true
  removeAttributeQuotes: true
  minifyJs: true
  minifyCss: true
```

- **ignoreCustomComments**: Array of regex'es that allow to ignore certain comments, when matched. Need to prepend [`!!js/regexp`](https://github.com/nodeca/js-yaml#supported-yaml-types) to support regex.

Description of the above options and other available options, see the [htmlnano module documentation](https://htmlnano.netlify.app/modules).

## Migrating from HTMLMinifier

This release replaces HTMLMinifier with htmlnano and requires Node.js 22.12 or newer. The legacy `minifyJS` and `minifyCSS` option names are accepted as aliases for `minifyJs` and `minifyCss`. The legacy `removeScriptTypeAttributes` and `removeStyleLinkTypeAttributes` options are mapped to `removeRedundantAttributes`.

Other HTMLMinifier-specific options are not supported. Review the [htmlnano modules](https://htmlnano.netlify.app/modules) when upgrading an existing configuration.
