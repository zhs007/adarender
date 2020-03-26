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
 * @return {string} str - YAML string
 */
function csv2pnl(csvfn, id, title, subtext) {
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
    val: lstmoney,
    // date: JSON.stringify(lstts),
    // val: JSON.stringify(lstmoney),
  });

  return str;
}

exports.csv2pnl = csv2pnl;
