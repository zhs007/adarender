'use strict';

const yaml = require('js-yaml');
const {compileString} = require('../../handlebars.utils');
const {makeBlockFunc} = require('../../md.utils');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.hbs'));
const template = compileString(tmpbuf.toString());

/**
 * renderLine - render for line
 * @param {string} content - token.content
 * @return {string} str - HTML string
 */
function renderLine(content) {
  try {
    const line = yaml.safeLoad(content);
    if (line) {
      const html = template(line);

      return html;
    }
  } catch (err) {}

  return '';
}

/**
 * markdownitAdaLine
 * @param {object} md - MarkdownIt
 * @param {object} config - {}
 */
function markdownitAdaLine(md, config) {
  config = config || {};

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'ada.line') {
      return renderLine(token.content);
    }

    return oldRule(tokens, idx, options, env, slf);
  };

  const adalineblock = makeBlockFunc(
      '$$ada.line$$',
      '$$ada.line$$',
      'adaline_block',
      'adaline',
  );

  md.block.ruler.after('blockquote', 'adaline_block', adalineblock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
  md.renderer.rules.adaline_block = (tokens, idx) => {
    return renderLine(tokens[idx].content);
  };
}

module.exports = markdownitAdaLine;
