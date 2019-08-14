'use strict';

const yaml = require('js-yaml');
const {compileString} = require('../../handlebarsutils');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.hbs'));
const template = compileString(tmpbuf.toString());

/**
 * renderBar - render for bar
 * @param {string} content - token.content
 * @return {string} str - HTML string
 */
function renderBar(content) {
  try {
    const line = yaml.safeLoad(content);
    if (line) {
      const html = template(line);

      return html;
    }
  } catch (err) {

  }

  return '';
}

/**
 * markdownitAdaBar
 * @param {object} md - MarkdownIt
 * @param {object} config - {input, output, onlyname, vfs}
 */
function markdownitAdaBar(md, config) {
  config = config || {};

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'ada.bar') {
      return renderBar(token.content);
    }

    return oldRule(tokens, idx, options, env, slf);
  };
}

module.exports = markdownitAdaBar;
