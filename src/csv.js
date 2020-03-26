'use strict';

const fs = require('fs');

/**
 * loadCSV
 * @param {string} fn - filename
 * @param {function} onRow - obj onRow(arrHead, arrData)
 * @return {array} objs - [obj]
 */
function loadCSV(fn, onRow) {
  try {
    const buf = fs.readFileSync(fn);
    const str = buf.toString();
    const arr = str.split('\r\n');
    if (arr.length <= 1) {
      return undefined;
    }

    const objs = [];
    const heads = arr[0].split(',');
    for (let i = 1; i < arr.length; ++i) {
      if (arr[i] == '') {
        continue;
      }

      const cd = arr[i].split(',');
      const obj = onRow(heads, cd);
      if (obj) {
        objs.push(obj);
      }
    }

    return objs;
  } catch (err) {
    return undefined;
  }
}

exports.loadCSV = loadCSV;
