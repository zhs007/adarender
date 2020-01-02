'use strict';

const ejs = require('ejs');

/**
 * compileString - compile string
 * @param {string} str - template string
 * @return {object} template - ejs template
 */
function compileString(str) {
  return ejs.compile(str);
}

exports.compileString = compileString;
