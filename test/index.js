'use strict';

const should = require('chai').should(); // eslint-disable-line
const normalizeOptions = require('../lib/options');

describe('hexo-html-minifier', () => {
  const ctx = {
    config: {
      html_minifier: {
        exclude: [],
        collapseBooleanAttributes: true,
        collapseWhitespace: 'conservative',
        ignoreCustomComments: [/^\s*more/],
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeAttributeQuotes: true,
        minifyJs: true,
        minifyCss: true
      }
    }
  };
  const h = require('../lib/filter').bind(ctx);
  const defaultCfg = {...ctx.config.html_minifier};
  const input = '<p id="">foo</p>';
  const path = 'index.html';

  beforeEach(() => {
    ctx.config.html_minifier = {...defaultCfg};
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

  it('ignoreCustomComments', async () => {
    ctx.config.html_minifier.ignoreCustomComments = [/^\s*more/, /^\s*keep\s*$/g];
    const content = '<!-- more --><!-- keep --><!-- remove --><p>Content</p><!-- keep --!>';
    const result = await h(content, { path });
    result.should.include('<!-- more -->');
    result.match(/<!-- keep/g).should.have.length(2);
    result.should.not.include('<!-- remove -->');
  });

  it('does not mutate config', async () => {
    const options = ctx.config.html_minifier;

    await h(input, { path });

    ctx.config.html_minifier.should.equal(options);
    options.should.have.property('exclude');
    options.should.have.property('ignoreCustomComments');
    options.should.not.have.property('skipConfigLoading');
  });

  it('normalizes legacy option names', () => {
    const options = normalizeOptions({
      minifyCSS: false,
      minifyJS: false,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    });

    options.should.include({
      minifyCss: false,
      minifyJs: false,
      removeRedundantAttributes: true
    });
    options.should.not.have.property('minifyCSS');
    options.should.not.have.property('minifyJS');
    options.should.not.have.property('removeScriptTypeAttributes');
    options.should.not.have.property('removeStyleLinkTypeAttributes');
  });
});
