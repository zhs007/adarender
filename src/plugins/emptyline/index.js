'use strict';

// const yaml = require('js-yaml');
const {compileString} = require('../../ejs.utils');
const {makeBlockFunc} = require('../../md.utils');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.ejs'));
const template = compileString(tmpbuf.toString());

/**
 * renderEmptyLine - render for empty line
 * @param {string} content - token.content
 * @return {string} str - HTML string
 */
function renderEmptyLine(content) {
  try {
    const html = template({});
    return html;
  } catch (err) {
    console.log('renderEmptyLine:catch', err);
  }

  return '';
}

/**
 * markdownitAdaTable2
 * @param {object} md - MarkdownIt
 * @param {object} config - {}
 */
function markdownitAdaEmptyLine(md, config) {
  config = config || {};

  const adaemptylineblock = makeBlockFunc(
      '$$ada.emptyline$$',
      '$$ada.emptyline$$',
      'adaemptyline_block',
      'adaemptyline',
  );

  md.block.ruler.after('blockquote', 'adaemptyline_block', adaemptylineblock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
  md.renderer.rules.adaemptyline_block = (tokens, idx) => {
    return renderEmptyLine(tokens[idx].content);
  };
}

module.exports = markdownitAdaEmptyLine;
