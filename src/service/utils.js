'use strict';

const crypto = require('crypto');
const adarender = require('../../proto/adarender_pb');

/**
 * getMD5String
 * @param {object} buf - buffer
 * @return {string} str - str
 */
function getMD5String(buf) {
  const md5 = crypto.createHash('md5');
  return md5.update(buf).digest('base64');
}

/**
 * getSHA256String
 * @param {object} buf - buffer
 * @return {string} str - str
 */
function getSHA256String(buf) {
  const md5 = crypto.createHash('sha256');
  return md5.update(buf).digest('base64');
}

/**
 * new HTMLData with object
 * @param {object} obj - object
 * @return {object} htmldata - adarender.HTMLData
 */
function newHTMLData(obj) {
  const result = new adarender.HTMLData();

  if (obj.strData) {
    result.setStrdata(obj.strData);
  }

  return result;
}

/**
 * new MarkdownData with object
 * @param {object} obj - {strData, templateName}
 * @return {object} mddata - adarender.MarkdownData
 */
function newMarkdownData(obj) {
  const result = new adarender.MarkdownData();

  if (obj.strData) {
    result.setStrdata(obj.strData);
  }

  if (obj.templateName) {
    result.setTemplatename(obj.templateName);
  }

  return result;
}

exports.getMD5String = getMD5String;
exports.newHTMLData = newHTMLData;
exports.newMarkdownData = newMarkdownData;
exports.getSHA256String = getSHA256String;
