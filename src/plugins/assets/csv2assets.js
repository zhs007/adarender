'use strict';

const {loadCSV} = require('../../csv');
const {compileString} = require('../../ejs.utils');
const fs = require('fs');
const path = require('path');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'assets.ejs'));
const template = compileString(tmpbuf.toString());

/**
 * csv2assets - csv to assets
 * @param {string} csvfn - filename for csv
 * @param {string} id - id
 * @param {string} title - title
 * @param {string} subtext - subtext
 * @param {string} assetstitle - title of assets
 * @param {number} valoff - value offset
 * @return {string} str - YAML string
 */
function csv2assets(csvfn, id, title, subtext, assetstitle, valoff) {
  const lstmoney = [];
  const lstts = loadCSV(csvfn, (arrHead, arrData) => {
    const val = parseFloat(arrData[1]);

    lstmoney.push(val);

    return parseInt(arrData[0]);
  });

  const str = template({
    id: id,
    title: title,
    subtext: subtext,
    date: lstts,
    valoff: valoff,
    assets: {
      v: {
        title: assetstitle,
        val: lstmoney,
        mark: [],
      },
    },
  });

  return str;
}

/**
 * csv2assetsex - some csv files to assets
 * @param {object} csvobj - map[name] = {title, csvfn, mul}
 * @param {string} id - id
 * @param {string} title - title
 * @param {string} subtext - subtext
 * @param {number} valoff - value offset
 * @return {string} str - YAML string
 */
function csv2assetsex(csvobj, id, title, subtext, valoff) {
  const obj = {
    id: id,
    title: title,
    subtext: subtext,
    valoff: valoff,
    assets: {},
  };

  for (const key in csvobj) {
    if (Object.prototype.hasOwnProperty.call(csvobj, key)) {
      const curmul = csvobj[key].mul;
      const lstmoney = [];
      obj.date = loadCSV(csvobj[key].csvfn, (arrHead, arrData) => {
        const val = parseFloat(arrData[1]);

        lstmoney.push(val * curmul);

        return parseInt(arrData[0]);
      });

      obj.assets[key] = {
        title: csvobj[key].title,
        val: lstmoney,
        mark: [],
      };
    }
  }

  const str = template(obj);

  return str;
}

exports.csv2assets = csv2assets;
exports.csv2assetsex = csv2assetsex;
