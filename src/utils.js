'use strict';

const crypto = require('crypto');
const fs = require('fs');

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
        .replace(/=/g, '-');
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

exports.hashFile = hashFile;
exports.copyFile = copyFile;
exports.hashBuffer = hashBuffer;
