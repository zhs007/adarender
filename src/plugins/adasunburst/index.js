'use strict';

const yaml = require('js-yaml');
const {compileString} = require('../../handlebarsutils');
const {makeBlockFunc} = require('../../mdutils');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.hbs'));
const template = compileString(tmpbuf.toString());

/**
 * recountValue - recount value
 * @param {object} obj - treemap object
 * @param {string} recounttype - [sum (default) | average]
 * @return {number} value - sum(all children value)
 */
function recountValue(obj, recounttype) {
  let v = 0;
  if (!(recounttype == 'sum' || recounttype == 'average')) {
    recounttype = 'sum';
  }
  if (Array.isArray(obj.children) && obj.children.length > 0) {
    for (let i = 0; i < obj.children.length; ++i) {
      obj.children[i].value = recountValue(obj.children[i], recounttype);

      v += obj.children[i].value;
    }

    if (recounttype == 'average') {
      obj.value = v / obj.children.length;
    } else {
      obj.value = v;
    }
  }

  if (typeof obj.value == 'number') {
    return obj.value;
  }

  return v;
}

//  颜色配置
const firstLevel = [
  '#da0d68',
  '#da1d23',
  '#ebb40f',
  '#187a2f',
  '#0aa3b5',
  '#c94930',
  '#ad213e',
  '#a87b64',
  '#e65832',
]; // 9
const secondLevel = [
  ['#975e6d', '#e0719c', '#f37674', '#e75b68', '#d0545f'], // 2
  ['#dd4c51', '#c94a44', '#dd4c51', '#f7a128', '#ddaf61'], // 4
  ['#e1c315', '#b09733', '#794752', '#cc3d41', '#b14d57'], // 2
  ['#a2b029', '#718933', '#3aa255', '#5e9a80', '#9db2b7'], // 4
  ['#9db2b7', '#76c0cb', '#ddaf61', '#975e6d', '#e0719c'], // 3
  ['#caa465', '#dfbd7e', '#be8663', '#ddaf61', '#c78869'], // 3
  ['#794752', '#cc3d41', '#b14d57', '#a2b029', '#718933'], // 3
  ['#c78869', '#bb764c', '#9db2b7', '#76c0cb', '#794752'], // 2
  ['#d45a59', '#f89a80', '#f37674', '#e75b68', '#d0545f'], // 5
];
const thirdLevel = [
  [
    '#f99e1c',
    '#ef5a78',
    '#f7f1bd',
    '#f68a5c',
    '#baa635',
    '#f26355',
    '#e2631e',
    '#fde404',
  ], // 3
  [
    '#3e0317',
    '#e62969',
    '#6569b0',
    '#ef2d36',
    '#b53b54',
    '#a5446f',
    '#f2684b',
    '#e73451',
  ], // 18
  [
    '#9ea718',
    '#94a76f',
    '#d0b24f',
    '#8eb646',
    '#faef07',
    '#c1ba07',
    '#8f1c53',
    '#b34039',
  ], // 10
  [
    '#a2bb2b',
    '#62aa3c',
    '#03a653',
    '#038549',
    '#28b44b',
    '#a3a830',
    '#7ac141',
    '#8b6439',
  ], // 7
  [
    '#8b8c90',
    '#beb276',
    '#fefef4',
    '#744e03',
    '#a3a36f',
    '#c9b583',
    '#978847',
    '#9d977f',
  ], // 16
  [
    '#b9a449',
    '#899893',
    '#a1743b',
    '#894810',
    '#b7906f',
    '#eb9d5f',
    '#f89a1c',
    '#aeb92c',
  ], // 6
  [
    '#c78936',
    '#8c292c',
    '#e5762e',
    '#a16c5a',
    '#80a89d',
    '#def2fd',
    '#7a9bae',
    '#039fb8',
  ], // 4
  [
    '#d4ad12',
    '#9d5433',
    '#c89f83',
    '#692a19',
    '#470604',
    '#db646a',
    '#120c0c',
    '#cc7b6a',
  ], // 5
  [
    '#310d0f',
    '#ae341f',
    '#d78823',
    '#da5c1f',
    '#7eb138',
    '#e65656',
    '#ba9232',
    '#4eb849',
  ], // 4
];

/**
 * renderBar - render for sunburst
 * @param {string} content - token.content
 * @return {string} str - HTML string
 */
function renderSunburst(content) {
  try {
    const treemap = yaml.safeLoad(content);
    if (treemap && treemap.treemap && Array.isArray(treemap.treemap)) {
      for (let i = 0; i < treemap.treemap.length; ++i) {
        for (let j = 0; j < treemap.treemap[i].data.length; ++j) {
          treemap.treemap[i].data[j].value = recountValue(
              treemap.treemap[i].data[j],
              treemap.recounttype,
          );
          // 第一层颜色
          if (j < firstLevel.length) {
            treemap.treemap[i].data[j].itemStyle = {
              color: firstLevel[j],
            };
          } else {
            treemap.treemap[i].data[j].itemStyle = {
              color: firstLevel[parseInt(firstLevel.length * Math.random())],
            };
          }
          // 第二层颜色，当数据过多，颜色随机
          for (let k = 0; k < treemap.treemap[i].data[j].children.length; k++) {
            if (j < firstLevel.length && k < secondLevel[0].length + 1) {
              treemap.treemap[i].data[j].children[k].itemStyle = {
                color: secondLevel[j][k],
              };
            } else {
              treemap.treemap[i].data[j].children[k].itemStyle = {
                color:
                  secondLevel[parseInt(secondLevel.length * Math.random())][
                      parseInt(secondLevel[0].length * Math.random())
                  ],
              };
            }
            // 第三层颜色
            if (treemap.treemap[i].data[j].children[k].children) {
              for (
                let l = 0;
                l < treemap.treemap[i].data[j].children[k].children.length;
                l++
              ) {
                if (
                  j < firstLevel.length &&
                  k < secondLevel[0].length &&
                  l < thirdLevel[0].length
                ) {
                  treemap.treemap[i].data[j].children[k].children[
                      l
                  ].itemStyle = {
                    color: thirdLevel[k][l],
                  };
                } else {
                  treemap.treemap[i].data[j].children[k].children[
                      l
                  ].itemStyle = {
                    color:
                      thirdLevel[parseInt(thirdLevel.length * Math.random())][
                          parseInt(thirdLevel[0].length * Math.random())
                      ],
                  };
                }
              }
            }
          }
        }
        treemap.treemap[i].jsondata = JSON.stringify(treemap.treemap[i].data);
      }
      if (Array.isArray(treemap.legenddata) && treemap.legenddata.length > 0) {
        treemap.legenddataselected = [];
        for (let i = 0; i < treemap.legenddata.length; ++i) {
          treemap.legenddataselected.push({
            name: treemap.legenddata[i],
            selected: i == 0,
          });
        }
      }
      const html = template(treemap);
      return html;
    }
  } catch (err) {
    console.log('renderSunburst ' + err);
  }

  return '';
}

/**
 * markdownitAdaSunburst
 * @param {object} md - MarkdownIt
 * @param {object} config - {input, output, onlyname, vfs}
 */
function markdownitAdaSunburst(md, config) {
  config = config || {};

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'ada.sunburst') {
      return renderSunburst(token.content);
    }

    return oldRule(tokens, idx, options, env, slf);
  };

  const adasunburstblock = makeBlockFunc(
      '$$ada.sunburst$$',
      '$$ada.sunburst$$',
      'adasunburst_block',
      'adasunburst',
  );

  md.block.ruler.after('blockquote', 'adasunburst_block', adasunburstblock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
  md.renderer.rules.adasunburst_block = (tokens, idx) => {
    return renderSunburst(tokens[idx].content);
  };
}

module.exports = markdownitAdaSunburst;
