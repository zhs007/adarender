'use strict';

const yaml = require('js-yaml');
const {compileString} = require('../../handlebarsutils');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.hbs'));
const template = compileString(tmpbuf.toString());

/**
 * recountValue - recount value
 * @param {object} obj - treemap object
 * @return {number} value - sum(all children value)
 */
function recountValue(obj) {
  let v = 0;

  if (Array.isArray(obj.children) && obj.children.length > 0) {
    for (let i = 0; i < obj.children.length; ++i) {
      obj.children[i].value = recountValue(obj.children[i]);

      v += obj.children[i].value;
    }

    obj.value = v;
  }

  if (typeof obj.value == 'number') {
    return obj.value;
  }

  return v;
}

/**
 * renderBar - render for bar
 * @param {string} content - token.content
 * @return {string} str - HTML string
 */
function renderTreeMap(content) {
  try {
    const treemap = yaml.safeLoad(content);
    if (treemap && treemap.treemap && Array.isArray(treemap.treemap)) {
      for (let i = 0; i < treemap.treemap.length; ++i) {
        for (let j = 0; j < treemap.treemap[i].data.length; ++j) {
          treemap.treemap[i].data[j].value = recountValue(
              treemap.treemap[i].data[j]
          );
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
    console.log('renderTreeMap ' + err);
  }

  return '';
}

/**
 * markdownitAdaTreeMap
 * @param {object} md - MarkdownIt
 * @param {object} config - {input, output, onlyname, vfs}
 */
function markdownitAdaTreeMap(md, config) {
  config = config || {};

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'ada.treemap') {
      return renderTreeMap(token.content);
    }

    return oldRule(tokens, idx, options, env, slf);
  };
}

module.exports = markdownitAdaTreeMap;
