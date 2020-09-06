'use strict';

const should = require('chai').should(); // eslint-disable-line

describe('hexo-html-minifier', () => {
  const ctx = {
    config: {
      html_minifier: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        ignoreCustomComments: [/^\s*more/],
        removeComments: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      }
    }
  };
  const h = require('../lib/filter').bind(ctx);
  const defaultCfg = JSON.parse(JSON.stringify(ctx.config));
  const input = '<p id="">foo</p>';
  const path = 'index.html';

  beforeEach(() => {
    ctx.config = JSON.parse(JSON.stringify(defaultCfg));
  });

  it('default', () => {
    const result = h(input, { path });
    result.should.eql('<p>foo</p>');
  });

  it('option', () => {
    ctx.config.html_minifier.removeEmptyAttributes = false;
    const result = h(input, { path });
    result.should.eql(input);
  });

  it('exclude', () => {
    ctx.config.html_minifier.exclude = '**/*.min.html';
    const result = h(input, { path: 'foo/bar.min.html' });
    result.should.eql(input);
  });
});
