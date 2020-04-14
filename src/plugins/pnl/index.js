'use strict';

const yaml = require('js-yaml');
const {compileString} = require('../../ejs.utils');
const {makeBlockFunc} = require('../../md.utils');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.ejs'));
const template = compileString(tmpbuf.toString());

/**
 * renderPNL - render for PNL
 * @param {string} content - token.content
 * @param {object} config - config
 * @return {string} str - HTML string
 */
function renderPNL(content, config) {
  try {
    const table = yaml.safeLoad(content);
    if (table) {
      const html = template(table);

      return html;
    }
  } catch (err) {
    console.log('renderPNL:catch', err);
  }

  return '';
}

/**
 * markdownitAdaPNL
 * @param {object} md - MarkdownIt
 * @param {object} config - {}
 */
function markdownitAdaPNL(md, config) {
  config = config || {};

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'ada.pnl') {
      return renderPNL(token.content);
    }

    return oldRule(tokens, idx, options, env, slf);
  };

  const adapnlblock = makeBlockFunc(
      '$$ada.pnl$$',
      '$$ada.pnl$$',
      'adapnl_block',
      'adapnl',
  );

  md.block.ruler.after('blockquote', 'adapnl_block', adapnlblock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
  md.renderer.rules.adapnl_block = (tokens, idx) => {
    return renderPNL(tokens[idx].content);
  };
}

module.exports = markdownitAdaPNL;
