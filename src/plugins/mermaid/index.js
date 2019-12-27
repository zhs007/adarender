'use strict';

// const mermaid = require('mermaid');
const {compileString} = require('../../handlebarsutils');
const {makeBlockFunc} = require('../../mdutils');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.hbs'));
const template = compileString(tmpbuf.toString());

let curid = 1;
let mermaidTheme = 'default';

/**
 * renderMermaid - render for mermaid
 * @param {string} content - token.content
 * @return {string} str - HTML string
 */
function renderMermaid(content) {
  try {
    const html = template({id: curid++, theme: mermaidTheme, code: content});
    return html;
  } catch (err) {}

  return '';
}

/**
 * markdownitMermaid
 * @param {object} md - MarkdownIt
 * @param {object} config - {theme, ganttaxisformat}
 */
function markdownitMermaid(md, config) {
  config = config || {};

  if (config.theme) {
    mermaidTheme = config.theme;
  }

  // let ganttAxisFormat = config.ganttaxisformat;
  // if (ganttAxisFormat === undefined) {
  //   ganttAxisFormat = '%Y-%m-%d';
  // }

  // mermaid.initialize({
  //   theme: mermaidTheme,
  //   gantt: {
  //     axisFormatter: [
  //       [
  //         ganttAxisFormat,
  //         (d) => {
  //           return d.getDay() === 1;
  //         },
  //       ],
  //     ],
  //   },
  // });

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'mermaid') {
      return renderMermaid(token.content);
    }

    return oldRule(tokens, idx, options, env, slf);
  };

  const mermaidblock = makeBlockFunc(
      '$$mermaid$$',
      '$$mermaid$$',
      'adamermaid_block',
      'adamermaid',
  );

  md.block.ruler.after('blockquote', 'adamermaid_block', mermaidblock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
  md.renderer.rules.adamermaid_block = (tokens, idx) => {
    return renderMermaid(tokens[idx].content);
  };
}

module.exports = markdownitMermaid;
