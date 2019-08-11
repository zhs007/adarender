'use strict';

const yaml = require('js-yaml');
const handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.hbs'));
const template = handlebars.compile(tmpbuf.toString());

/**
 * renderPie - render for pie
 * @param {string} content - token.content
 * @return {string} str - HTML string
 */
function renderPie(content) {
  try {
    const pie = yaml.safeLoad(content);
    if (pie) {
    //   const params = {
    //     datasetname: dataset.name,
    //     datasetval: {},
    //   };

      //   for (const k in dataset.data) {
      //     if (Object.prototype.hasOwnProperty.call(dataset.data, k)) {
      //       if (Array.isArray(dataset.data[k])) {
      //         params.datasetval[k] = JSON.stringify(dataset.data[k]);
      //       }
      //     }
      //   }

      const html = template(pie);

      return html;
    }
  } catch (err) {

  }

  return '';
}

/**
 * markdownitAdaPie
 * @param {object} md - MarkdownIt
 * @param {object} config - {input, output, onlyname, vfs}
 */
function markdownitAdaPie(md, config) {
  config = config || {};

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'ada.pie') {
      return renderPie(token.content);
    }

    return oldRule(tokens, idx, options, env, slf);
  };
}

module.exports = markdownitAdaPie;
