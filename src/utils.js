'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/**
 * hashFile
 * @param {string} fn - filename
 * @return {string} str - str
 */
function hashFile(fn) {
  try {
    const buf = fs.readFileSync(fn);
    return hashBuffer(buf);
  } catch (err) {
    return 'nofile';
  }
}

/**
 * hashBuffer
 * @param {Buffer} buf - buffer
 * @return {string} str - str
 */
function hashBuffer(buf) {
  try {
    const sha256 = crypto.createHash('sha256');
    return sha256
        .update(buf)
        .digest('base64')
        .replace(/\//g, '_')
        .replace(/=/g, '');
  } catch (err) {
    return 'hasherr';
  }
}

/**
 * copyFile
 * @param {string} srcfn - source filename
 * @param {string} targetfn - target filename
 */
function copyFile(srcfn, targetfn) {
  try {
    const buf = fs.readFileSync(srcfn);
    fs.writeFileSync(targetfn, buf);
  } catch (err) {}
}

/**
 * isError
 * @param {object} e - Error
 * @return {boolean} isError - isError
 */
function isError(e) {
  return (
    e &&
    e.stack &&
    e.message &&
    typeof e.stack === 'string' &&
    typeof e.message === 'string'
  );
}

/**
 * printInfo - print infomation
 * @param {string} projname - project's name
 */
function printInfo(projname) {
  const proj = JSON.parse(
      fs.readFileSync(path.join(__dirname, '../package.json')),
  );

  console.log(projname + ' (jarviscrawlercore) v' + proj.version + '.');
  console.log('The project\'s url is https://github.com/zhs007/adarender .');
  console.log('Author is  Zerro Zhao (zerrozhao@gmail.com).');
}

exports.hashFile = hashFile;
exports.copyFile = copyFile;
exports.hashBuffer = hashBuffer;
exports.isError = isError;
exports.printInfo = printInfo;
