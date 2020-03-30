'use strict';

const yaml = require('js-yaml');
const {compileString} = require('../../ejs.utils');
const {makeBlockFunc} = require('../../md.utils');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.ejs'));
const template = compileString(tmpbuf.toString());

/**
 * renderAssets - render for assets
 * @param {string} content - token.content
 * @param {object} config - config
 * @return {string} str - HTML string
 */
function renderAssets(content, config) {
  try {
    const table = yaml.safeLoad(content);
    if (table) {
      const html = template(table);

      return html;
    }
  } catch (err) {
    console.log('renderAssets:catch', err);
  }

  return '';
}

/**
 * markdownitAdaAssets
 * @param {object} md - MarkdownIt
 * @param {object} config - {}
 */
function markdownitAdaAssets(md, config) {
  config = config || {};

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'ada.assets') {
      return renderAssets(token.content);
    }

    return oldRule(tokens, idx, options, env, slf);
  };

  const adaassetsblock = makeBlockFunc(
      '$$ada.assets$$',
      '$$ada.assets$$',
      'adaassets_block',
      'adaassets',
  );

  md.block.ruler.after('blockquote', 'adaassets_block', adaassetsblock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
  md.renderer.rules.adaassets_block = (tokens, idx) => {
    return renderAssets(tokens[idx].content);
  };
}

module.exports = markdownitAdaAssets;
