'use strict';

const should = require('chai').should(); // eslint-disable-line
const htmlnano = require('htmlnano');

describe('hexo-html-minifier', () => {
  const ctx = {
    config: {
      html_minifier: {}
    }
  };
  const h = require('../lib/filter').bind(ctx);
  const defaultCfg = JSON.parse(JSON.stringify(ctx.config));
  const input = '<p id="">foo</p>';
  const path = 'index.html';

  beforeEach(() => {
    ctx.config = JSON.parse(JSON.stringify(defaultCfg));
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
});
