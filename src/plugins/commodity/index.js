'use strict';

const yaml = require('js-yaml');
const {compileString} = require('../../ejs.utils');
const {makeBlockFunc} = require('../../md.utils');
const path = require('path');
const fs = require('fs');
const {getImgType, hashFileEx, copyFileEx} = require('../../hashfile');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.ejs'));
const template = compileString(tmpbuf.toString());

/**
 * renderCommodity - render for table
 * @param {string} content - token.content
 * @param {object} config - config
 * @return {string} str - HTML string
 */
function renderCommodity(content, config) {
  let output = './';
  if (typeof config.output == 'string') {
    output = config.output;
  }

  let input = './';
  if (typeof config.input == 'string') {
    input = config.input;
  }

  let onlyname = false;
  if (typeof config.onlyname == 'boolean') {
    onlyname = config.onlyname;
  }

  try {
    const commodity = yaml.safeLoad(content);
    if (commodity) {
      if (Array.isArray(commodity.items) && commodity.items.length > 0) {
        for (let i = 0; i < commodity.items.length; ++i) {
          let url = commodity.items[i].img;

          const newname =
            hashFileEx(config.vfs, input, url) + '.' + getImgType(url);
          copyFileEx(config.vfs, input, output, url, newname);

          if (onlyname) {
            url = newname;
          } else {
            url = newnamewithpath;
          }

          commodity.items[i].img = url;
        }

        const html = template(commodity);

        return html;
      } else {
        console.log('renderCommodity:invalid items');
      }
    }
  } catch (err) {
    console.log('renderCommodity:catch', err);
  }

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
      return renderCommodity(token.content, config);
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
    return renderCommodity(tokens[idx].content, config);
  };
}

module.exports = markdownitAdaCommodity;
