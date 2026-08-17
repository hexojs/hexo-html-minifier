# hexo-html-minifier

[![Build Status](https://github.com/hexojs/hexo-html-minifier/workflows/Tester/badge.svg)](https://github.com/hexojs/hexo-html-minifier/actions?query=workflow%3ATester)
[![NPM version](https://badge.fury.io/js/hexo-html-minifier.svg)](https://www.npmjs.com/package/hexo-html-minifier)

Minify HTML files with [HTML Minifier Next](https://github.com/j9t/html-minifier-next), the maintained successor to HTMLMinifier.

Version 2 requires Node.js 22.13 or newer.

## Installation

``` bash
$ npm install hexo-html-minifier --save
```

## Options

You can set options of HTML Minifier Next in the main `_config.yml` file:

``` yaml
html_minifier:
  exclude:
```

- **exclude**: Exclude files from being minified. Support [globbing patterns](https://github.com/micromatch/micromatch#extended-globbing).

Default options:

``` yaml
html_minifier:
  collapseBooleanAttributes: true
  collapseWhitespace: true
  # Ignore '<!-- more -->' https://hexo.io/docs/tag-plugins#Post-Excerpt
  ignoreCustomComments: [ !!js/regexp /^\s*more/]
  removeComments: true
  removeEmptyAttributes: true
  removeDefaultTypeAttributes: true
  minifyJS: true
  minifyCSS: true
```

- **ignoreCustomComments**: Array of regex'es that allow to ignore certain comments, when matched. Need to prepend [`!!js/regexp`](https://github.com/nodeca/js-yaml#supported-yaml-types) to support regex.

Description of the above options and other available options, see [HTML Minifier Next](https://github.com/j9t/html-minifier-next#options-quick-reference).

## Migrating from version 1

Version 2 replaces the unmaintained `html-minifier` package with HTML Minifier Next and raises the minimum Node.js version to 22.13.

HTML Minifier Next combines `removeScriptTypeAttributes` and `removeStyleLinkTypeAttributes` into `removeDefaultTypeAttributes`. Matching legacy values are converted automatically. If the legacy values differ, both kinds of `type` attribute are preserved and a warning asks you to choose the combined option explicitly.
