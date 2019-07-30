const crypto = require('crypto');
const adarender = require('../../proto/adarender_pb');

/**
 * getMD5String
 * @param {object} buf - buffer
 * @return {string} str - str
 */
function getMD5String(buf) {
  const md5 = crypto.createHash('md5');
  return md5.update(buf).digest('hex');
}

/**
 * new HTMLData with object
 * @param {object} obj - Paragraph object
 * @return {object} htmldata - adarender.HTMLData
 */
function newHTMLData(obj) {
  const result = new adarender.HTMLData();

  if (obj.strData) {
    result.setStrdata(obj.strData);
  }

  return result;
}

exports.getMD5String = getMD5String;
exports.newHTMLData = newHTMLData;
