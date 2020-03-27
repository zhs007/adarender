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
 * @param {number} valoff - value offset
 * @param {string} markstate - 'none' | 'state' | 'value'
 * @return {string} str - YAML string
 */
function csv2pnl(csvfn, id, title, subtext, assetstitle, valoff, markstate) {
  const lstmoney = [];
  const mark = [];
  const lstts = loadCSV(csvfn, (arrHead, arrData) => {
    const val = parseFloat(arrData[2]);

    if (markstate == 'state' || markstate == 'value') {
      const buy = parseFloat(arrData[3]);
      const sell = parseFloat(arrData[4]);
      if (buy > 0 && sell > 0) {
        if (buy > sell) {
          buy -= sell;

          mark.push({
            name: 'buy',
            value: markstate == 'value' ? buy : '1',
            xAxis: lstmoney.length,
            yAxis: val,
          });
        } else if (buy < sell) {
          sell -= buy;

          mark.push({
            name: 'sell',
            value: markstate == 'value' ? -sell : '-1',
            xAxis: lstmoney.length,
            yAxis: val,
          });
        }
      } else if (buy > 0) {
        mark.push({
          name: 'buy',
          value: markstate == 'value' ? buy : '1',
          xAxis: lstmoney.length,
          yAxis: val,
        });
      } else if (sell > 0) {
        mark.push({
          name: 'sell',
          value: markstate == 'value' ? -sell : '-1',
          xAxis: lstmoney.length,
          yAxis: val,
        });
      }
    }

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
        mark: JSON.stringify(mark),
      },
    },
  });

  return str;
}

/**
 * csv2pnlex - some csv files to pnl
 * @param {object} csvobj - map[name] = {title, csvfn, markstate}
 * @param {string} id - id
 * @param {string} title - title
 * @param {string} subtext - subtext
 * @param {number} valoff - value offset
 * @return {string} str - YAML string
 */
function csv2pnlex(csvobj, id, title, subtext, valoff) {
  const obj = {
    id: id,
    title: title,
    subtext: subtext,
    valoff: valoff,
    assets: {},
  };

  for (const key in csvobj) {
    if (Object.prototype.hasOwnProperty.call(csvobj, key)) {
      const lstmoney = [];
      const mark = [];
      const markstate = csvobj[key].markstate;
      obj.date = loadCSV(csvobj[key].csvfn, (arrHead, arrData) => {
        const val = parseFloat(arrData[2]);

        if (markstate == 'state' || markstate == 'value') {
          const buy = parseFloat(arrData[3]);
          const sell = parseFloat(arrData[4]);
          if (buy > 0 && sell > 0) {
            if (buy > sell) {
              buy -= sell;

              mark.push({
                name: 'buy',
                value: markstate == 'value' ? buy : '1',
                xAxis: lstmoney.length,
                yAxis: val,
              });
            } else if (buy < sell) {
              sell -= buy;

              mark.push({
                name: 'sell',
                value: markstate == 'value' ? -sell : '-1',
                xAxis: lstmoney.length,
                yAxis: val,
              });
            }
          } else if (buy > 0) {
            mark.push({
              name: 'buy',
              value: markstate == 'value' ? buy : '1',
              xAxis: lstmoney.length,
              yAxis: val,
            });
          } else if (sell > 0) {
            mark.push({
              name: 'sell',
              value: markstate == 'value' ? -sell : '-1',
              xAxis: lstmoney.length,
              yAxis: val,
            });
          }
        }

        lstmoney.push(val);

        return parseInt(arrData[0]);
      });

      obj.assets[key] = {
        title: csvobj[key].title,
        val: lstmoney,
        mark: JSON.stringify(mark),
      };
    }
  }

  const str = template(obj);

  return str;
}

exports.csv2pnl = csv2pnl;
exports.csv2pnlex = csv2pnlex;
