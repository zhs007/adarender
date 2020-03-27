'use strict';

const {loadCSV} = require('../../csv');
const {compileString} = require('../../ejs.utils');
const fs = require('fs');
const path = require('path');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'pnl.ejs'));
const template = compileString(tmpbuf.toString());

/**
 * csv2pnl - csv to pnl
 * @param {string} csvfn - filename for csv
 * @param {string} id - id
 * @param {string} title - title
 * @param {string} subtext - subtext
 * @param {string} assetstitle - title of assets
 * @return {string} str - YAML string
 */
function csv2pnl(csvfn, id, title, subtext, assetstitle) {
  const lstmoney = [];
  const lstts = loadCSV(csvfn, (arrHead, arrData) => {
    lstmoney.push(parseFloat(arrData[2]));

    return parseInt(arrData[0]);
  });

  const str = template({
    id: id,
    title: title,
    subtext: subtext,
    date: lstts,
    assets: {
      v: {
        title: assetstitle,
        val: lstmoney,
      },
    },
  });

  return str;
}

/**
 * csv2pnlex - some csv files to pnl
 * @param {object} csvobj - map[name] = {title, csvfn}
 * @param {string} id - id
 * @param {string} title - title
 * @param {string} subtext - subtext
 * @return {string} str - YAML string
 */
function csv2pnlex(csvobj, id, title, subtext) {
  const obj = {id: id, title: title, subtext: subtext, assets: {}};

  for (const key in csvobj) {
    if (Object.prototype.hasOwnProperty.call(csvobj, key)) {
      const lstmoney = [];
      obj.date = loadCSV(csvobj[key].csvfn, (arrHead, arrData) => {
        lstmoney.push(parseFloat(arrData[2]));

        return parseInt(arrData[0]);
      });

      obj.assets[key] = {
        title: csvobj[key].title,
        val: lstmoney,
      };
    }
  }

  const str = template(obj);

  return str;
}

exports.csv2pnl = csv2pnl;
exports.csv2pnlex = csv2pnlex;
