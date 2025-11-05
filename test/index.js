'use strict';

const should = require('chai').should(); // eslint-disable-line
const htmlnano = require('htmlnano');

describe('hexo-html-minifier', () => {
  const ctx = {
    config: {
      html_minifier: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: false,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeAttributeQuotes: true,
        minifyJs: true,
        minifyCss: true
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

  it('default', async () => {
    const result = await h(input, { path });
    result.should.eql('<p>foo</p>');
  });

  it('option', async () => {
    ctx.config.html_minifier.removeEmptyAttributes = false;
    const result = await h(input, { path });
    // htmlnano still removes the empty attribute value, leaving just the attribute name
    result.should.eql('<p id>foo</p>');
  });

  it('exclude', async () => {
    ctx.config.html_minifier.exclude = '**/*.min.html';
    const result = await h(input, { path: 'foo/bar.min.html' });
    result.should.eql(input);
  });

  it('invalid input', async () => {
    // htmlnano handles malformed HTML gracefully without throwing errors
    const invalid = '<html><>?:"{}|_+</html>';
    const result = await h(invalid, { path });
    // htmlnano processes the content as-is
    result.should.eql(invalid);
  });
});
