'use strict';

const yaml = require('js-yaml');
const {compileString} = require('../../handlebars.utils');
const {makeBlockFunc} = require('../../md.utils');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.hbs'));
const template = compileString(tmpbuf.toString());

/**
 * renderCommodity - render for table
 * @param {string} content - token.content
 * @return {string} str - HTML string
 */
function renderCommodity(content) {
  try {
    const commodity = yaml.safeLoad(content);
    if (commodity) {
      const html = template(commodity);

      return html;
    }
  } catch (err) {}

  return '';
}

/**
 * markdownitAdaCommodity
 * @param {object} md - MarkdownIt
 * @param {object} config - {}
 */
function markdownitAdaCommodity(md, config) {
  config = config || {};

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'ada.commodity') {
      return renderCommodity(token.content);
    }

    return oldRule(tokens, idx, options, env, slf);
  };

  const adacommodityblock = makeBlockFunc(
      '$$ada.commodity$$',
      '$$ada.commodity$$',
      'adacommodity_block',
      'adacommodity',
  );

  md.block.ruler.after('blockquote', 'adacommodity_block', adacommodityblock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
  md.renderer.rules.adacommodity_block = (tokens, idx) => {
    return renderCommodity(tokens[idx].content);
  };
}

module.exports = markdownitAdaCommodity;
