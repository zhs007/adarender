'use strict';

const yaml = require('js-yaml');
const {compileString} = require('../../handlebars.utils');
const {makeBlockFunc} = require('../../md.utils');
const path = require('path');
const fs = require('fs');

const tmpbuf = fs.readFileSync(path.join(__dirname, 'template.hbs'));
const template = compileString(tmpbuf.toString());

/**
 * renderDataset - render for dataset
 * @param {string} content - token.content
 * @return {string} str - HTML string
 */
function renderDataset(content) {
  try {
    const dataset = yaml.safeLoad(content);
    if (dataset && dataset.name && dataset.data) {
      const params = {
        datasetname: dataset.name,
        datasetval: {},
      };

      for (const k in dataset.data) {
        if (Object.prototype.hasOwnProperty.call(dataset.data, k)) {
          if (Array.isArray(dataset.data[k])) {
            params.datasetval[k] = JSON.stringify(dataset.data[k]);
          }
        }
      }

      const html = template(params);

      return html;
    }
  } catch (err) {}

  return '';
}

/**
 * markdownitAdaDataset
 * @param {object} md - MarkdownIt
 * @param {object} config - {}
 */
function markdownitAdaDataset(md, config) {
  config = config || {};

  const oldRule = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = token.info.trim();
    if (info === 'ada.dataset') {
      return renderDataset(token.content);
    }

    return oldRule(tokens, idx, options, env, slf);
  };

  const adadatasetblock = makeBlockFunc(
      '$$ada.dataset$$',
      '$$ada.dataset$$',
      'adadataset_block',
      'adadataset',
  );

  md.block.ruler.after('blockquote', 'adadataset_block', adadatasetblock, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });
  md.renderer.rules.adadataset_block = (tokens, idx) => {
    return renderDataset(tokens[idx].content);
  };
}

module.exports = markdownitAdaDataset;
