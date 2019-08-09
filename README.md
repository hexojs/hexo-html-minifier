# hexo-html-minifier

[![Build Status](https://travis-ci.org/hexojs/hexo-html-minifier.svg?branch=master)](https://travis-ci.org/hexojs/hexo-html-minifier)
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

- **exclude**: Exclude files from minification

For the other options, see https://github.com/kangax/html-minifier#options-quick-reference

Here is an example of a more aggressive set of option that will minfy your html further than by default:

``` yaml
html_minifier:  
  removeComments: true
  collapseWhitespace: true
  collapseBooleanAttributes: true
  removeEmptyAttributes: true
  removeScriptTypeAttributes: true
  removeStyleLinkTypeAttributes: true
```
