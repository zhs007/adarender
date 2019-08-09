'use strict';

const MarkdownIt = require('markdown-it');
const fs = require('fs');
const path = require('path');

/**
 * getTokenAttr
 * @param {object} token - markdown-it token
 * @param {string} attrname - attrname
 * @return {string} val - value
 */
function getTokenAttr(token, attrname) {
  if (token && token.attrs) {
    for (let i = 0; i < token.attrs.length; ++i) {
      if (token.attrs[i][0] == attrname) {
        return token.attrs[i][1];
      }
    }
  }

  return '';
}

/**
 * getImages
 * @param {string} inpath - input path
 * @param {string} fn - markdown filename
 * @return {Array} imgs - image list
 */
function getImages(inpath, fn) {
  const imgs = [];

  const buf = fs.readFileSync(path.join(inpath, fn));
  if (buf) {
    const str = buf.toString();
    const md = new MarkdownIt();

    const tokens = md.parse(str);

    for (let i = 0; i < tokens.length; ++i) {
      if (tokens[i].type == 'inline') {
        for (let j = 0; j < tokens[i].children.length; ++j) {
          if (tokens[i].children[j].type == 'image') {
            const imgsrc = getTokenAttr(tokens[i].children[j], 'src');
            imgs.push(imgsrc);
          }
        }
      }
    }
  }

  return imgs;
}

exports.getImages = getImages;
