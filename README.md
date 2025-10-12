# hexo-html-minifier

[![Build Status](https://github.com/hexojs/hexo-html-minifier/workflows/Tester/badge.svg)](https://github.com/hexojs/hexo-html-minifier/actions?query=workflow%3ATester)
[![NPM version](https://badge.fury.io/js/hexo-html-minifier.svg)](https://www.npmjs.com/package/hexo-html-minifier)

Minify HTML files with [HTMLMinifier](https://github.com/kangax/html-minifier).

## Installation

``` bash
$ npm install hexo-html-minifier --save
```

## Options

You can set options of HTMLMinifier in the main `_config.yml` file:

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
  removeComments: false
  removeEmptyAttributes: true
  removeAttributeQuotes: true
  minifyJS: true
  minifyCSS: true
```

Description of the above options and other available options, see [HTMLMinifier](https://github.com/kangax/html-minifier#options-quick-reference)
