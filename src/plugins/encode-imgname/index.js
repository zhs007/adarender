'use strict';

// const {hashFile, copyFile, hashBuffer} = require('../../utils');
const {getImgType, hashFileEx, copyFileEx} = require('../../hashfile');
// const {join} = require('path');

/**
 * markdownitEncodeImgName
 * @param {object} md - MarkdownIt
 * @param {object} config - {input, output, onlyname, vfs}
 */
function markdownitEncodeImgName(md, config) {
  config = config || {};

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

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const srcIndex = token.attrIndex('src');
    let url = token.attrs[srcIndex][1];

    const newname = hashFileEx(config.vfs, input, url) + '.' + getImgType(url);
    copyFileEx(config.vfs, input, output, url, newname);

    if (onlyname) {
      url = newname;
    } else {
      url = newnamewithpath;
    }

    let title = '';
    const caption = md.utils.escapeHtml(token.content);

    if (token.attrIndex('title') !== -1) {
      title =
        ' title="' +
        md.utils.escapeHtml(token.attrs[token.attrIndex('title')][1]) +
        '"';
    }

    return '<img src="' + url + '" alt="' + caption + '"' + title + '>';
  };
}

module.exports = markdownitEncodeImgName;
