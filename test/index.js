'use strict';

const should = require('chai').should();
const normalizeOptions = require('../lib/options');

describe('hexo-html-minifier', () => {
  const ctx = {
    config: {
      html_minifier: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        ignoreCustomComments: [/^\s*more/],
        removeComments: true,
        removeEmptyAttributes: true,
        removeDefaultTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      }
    }
  };
  const h = require('../lib/filter').bind(ctx);
  const defaultCfg = { ...ctx.config.html_minifier };
  const input = '<p id="">foo</p>';
  const path = 'index.html';

  beforeEach(() => {
    ctx.config.html_minifier = { ...defaultCfg };
  });

  it('default', async () => {
    const result = await h(input, { path });
    result.should.eql('<p>foo</p>');
  });

  it('option', async () => {
    ctx.config.html_minifier.removeEmptyAttributes = false;
    const result = await h(input, { path });
    result.should.eql(input);
  });

  it('exclude', async () => {
    ctx.config.html_minifier.exclude = '**/*.min.html';
    const result = await h(input, { path: 'foo/bar.min.html' });
    result.should.eql(input);
  });

  it('preserves the Hexo excerpt comment', async () => {
    const result = await h('<!-- more --><!-- remove --><p>Content</p>', { path });
    result.should.eql('<!-- more --><p>Content</p>');
  });

  it('invalid input', async () => {
    const invalid = '<html><>?:"{}|_+</html>';
    let error;

    try {
      await h(invalid, { path });
    } catch (err) {
      error = err;
    }

    should.exist(error);
    error.message.should.match(/^Path: index\.html\n/);
  });

  it('maps matching legacy type attribute options', () => {
    const options = normalizeOptions({
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false
    });

    options.should.eql({ removeDefaultTypeAttributes: false });
  });

  it('preserves type attributes when legacy options differ', () => {
    const warnings = [];
    const options = normalizeOptions({ removeScriptTypeAttributes: false }, message => warnings.push(message));

    options.should.eql({ removeDefaultTypeAttributes: false });
    warnings.should.have.lengthOf(1);
  });
});
