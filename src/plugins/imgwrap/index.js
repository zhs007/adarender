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
 * renderImgWrap - render for image wrap
 * @param {string} content - token.content
 * @param {object} config - config
 * @return {string} str - HTML string
 */
function renderImgWrap(content, config) {
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
    const imgwrap = yaml.safeLoad(content);
    if (imgwrap) {
      if (Array.isArray(imgwrap.items) && imgwrap.items.length > 0) {
        for (let i = 0; i < imgwrap.items.length; ++i) {
          let url = imgwrap.items[i].img;

          const newname =
            hashFileEx(config.vfs, input, url) + '.' + getImgType(url);
          copyFileEx(config.vfs, input, output, url, newname);

          if (onlyname) {
            url = newname;
          } else {
            url = newnamewithpath;
          }

          imgwrap.items[i].img = url;
        }

        const html = template(imgwrap);

        return html;
      } else {
        console.log('renderImgWrap:invalid items');
      }
    }
  } catch (err) {
    console.log('renderImgWrap:catch', err);
  }

  return '';
}

/**
 * markdownitAdaImgWrap
 * @param {object} md - MarkdownIt
 * @param {object} config - {}
 */
function markdownitAdaImgWrap(md, config) {
  config = config || {};

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'ada.imgwrap') {
      return renderImgWrap(token.content, config);
    }

    return oldRule(tokens, idx, options, env, slf);
  };

  const adaimgwrapblock = makeBlockFunc(
      '$$ada.imgwrap$$',
      '$$ada.imgwrap$$',
      'adaimgwrap_block',
      'adaimgwrap',
  );

  md.block.ruler.after('blockquote', 'adaimgwrap_block', adaimgwrapblock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
  md.renderer.rules.adaimgwrap_block = (tokens, idx) => {
    return renderImgWrap(tokens[idx].content, config);
  };
}

module.exports = markdownitAdaImgWrap;
