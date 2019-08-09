'use strict';

const {hashFile, copyFile} = require('../../utils');
const {join} = require('path');

/**
 * getImgType
 * @param {string} fn - filename
 * @return {string} imgtype - it's like jpg/png/gif
 */
function getImgType(fn) {
  const lst = fn.split('.');
  if (lst.length >= 2) {
    const exname = lst[lst.length - 1].toLowerCase();
    if (exname == 'jpg' || exname == 'jpeg') {
      return 'jpg';
    } else if (exname == 'png') {
      return 'png';
    } else if (exname == 'gif') {
      return 'gif';
    }
  }

  return '';
}

/**
 * markdownitEncodeImgName
 * @param {object} md - MarkdownIt
 * @param {object} config - {input, output, onlyname}
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
    let url = join(input, token.attrs[srcIndex][1]);
    const newname = hashFile(url) + '.' + getImgType(url);
    const newnamewithpath = join(output, newname);
    copyFile(url, newnamewithpath);

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
