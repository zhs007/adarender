'use strict';

const crypto = require('crypto');
const adarender = require('../../proto/adarender_pb');
const {getImages} = require('../export/utils');
const fs = require('fs');
const path = require('path');


const BIGMSGSIZE = 4 * 1024 * 1024 - 1024;

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

  if (obj.binaryData) {
    const bd = result.getBinarydataMap();
    if (bd) {
      for (const k in obj.binaryData) {
        if (Object.prototype.hasOwnProperty.call(obj.binaryData, k)) {
          bd.set(k, obj.binaryData[k]);
        }
      }
    }
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

  if (obj.binaryData) {
    const bd = result.getBinarydataMap();
    if (bd) {
      for (const k in obj.binaryData) {
        if (Object.prototype.hasOwnProperty.call(obj.binaryData, k)) {
          bd.set(k, obj.binaryData[k]);
        }
      }
    }
  }

  if (obj.templateName) {
    result.setTemplatename(obj.templateName);
  }

  return result;
}

/**
 * buildMarkdownData - build MarkdownData object
 * @param {string} inpath - input path
 * @param {string} fn - filename
 * @return {obj} md - markdowndata object
 */
function buildMarkdownData(inpath, fn) {
  const buf = fs.readFileSync(path.join(inpath, fn));
  if (buf) {
    const obj = {
      strData: buf.toString(),
      binaryData: {},
    };

    const imgs = getImages(inpath, fn);
    if (imgs && Array.isArray(imgs)) {
      for (let i = 0; i < imgs.length; ++i) {
        obj.binaryData[imgs[i]] = fs.readFileSync(path.join(inpath, imgs[i]));
      }
    }

    return obj;
  }

  return undefined;
}

/**
 * buildHTMLData - build HTMLData object
 * @param {VFS} vfs - VFS
 * @param {string} htmlstr - html string
 * @return {obj} html - HTMLData object
 */
function buildHTMLData(vfs, htmlstr) {
  const obj = {
    strData: htmlstr,
    binaryData: {},
  };

  vfs.eachTag((fn, buf) => {
    obj.binaryData[fn] = buf;
  });

  return obj;
}

/**
 * buildHTMLDataStream - build HTMLDataStream
 * @param {adarender.HTMLData} htmldata - adarender.HTMLData
 * @param {function} funcsend - async function send(htmlstream)
 */
async function buildHTMLDataStream(htmldata, funcsend) {
  const buf = htmldata.serializeBinary();
  if (buf.length <= BIGMSGSIZE) {
    const htmlstream = new adarender.HTMLStream();
    htmlstream.setHtmldata(htmldata);

    await funcsend(htmlstream);

    return;
  }

  const totalmd5 = getMD5String(buf);

  for (let s = 0; s < buf.byteLength;) {
    const cs = new adarender.HTMLStream();
    cs.setTotallength(buf.byteLength);
    cs.setCurstart(s);

    let cl = BIGMSGSIZE;
    if (s + BIGMSGSIZE >= buf.byteLength) {
      cl = buf.byteLength - s;

      cs.setTotalhashdata(totalmd5);
    }

    cs.setCurlength(cl);

    const curbuf = buf.subarray(s, s + cl);
    cs.setHashdata(getMD5String(curbuf));

    cs.setData(curbuf);

    await funcsend(cs);

    s += cl;
  }
}

exports.getMD5String = getMD5String;
exports.newHTMLData = newHTMLData;
exports.newMarkdownData = newMarkdownData;
exports.getSHA256String = getSHA256String;
exports.buildMarkdownData = buildMarkdownData;
exports.buildHTMLData = buildHTMLData;
exports.buildHTMLDataStream = buildHTMLDataStream;
