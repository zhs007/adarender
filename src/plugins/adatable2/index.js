'use strict';

const yaml = require('js-yaml');
// const {compileString} = require('../../ejs.utils');
const {makeBlockFunc} = require('../../md.utils');
const path = require('path');
const ejs = require('ejs');
// const fs = require('fs');

// const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.ejs'));
// const template = compileString(tmpbuf.toString());

/**
 * renderTable - render for table
 * @param {string} content - token.content
 * @return {string} str - HTML string
 */
function renderTable(content) {
  try {
    const table = yaml.safeLoad(content);
    if (table) {
      let html = '';
      ejs.renderFile(path.join(__dirname, 'template.ejs'), table, {}, function(
          err,
          str,
      ) {
        if (err) {
          console.log('renderTable:renderFile', err);
        }
        html = str;
      });

      return html;
    }
  } catch (err) {
    console.log('renderTable:catch', err);
  }

  return '';
}

/**
 * markdownitAdaTable2
 * @param {object} md - MarkdownIt
 * @param {object} config - {}
 */
function markdownitAdaTable2(md, config) {
  config = config || {};

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'ada.table2') {
      return renderTable(token.content);
    }

    return oldRule(tokens, idx, options, env, slf);
  };

  const adatableblock = makeBlockFunc(
      '$$ada.table2$$',
      '$$ada.table2$$',
      'adatable2_block',
      'adatable2',
  );

  md.block.ruler.after('blockquote', 'adatable2_block', adatableblock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
  md.renderer.rules.adatable2_block = (tokens, idx) => {
    return renderTable(tokens[idx].content);
  };
}

module.exports = markdownitAdaTable2;
