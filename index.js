'use strict';

// const pluginEncodeImgName = require('../plugins/encode-imgname');
const markdownitAdaDataset = require('./src/plugins/adadataset');
const markdownitAdaPie = require('./src/plugins/adapie');
const markdownitAdaLine = require('./src/plugins/adaline');
const markdownitAdaBar = require('./src/plugins/adabar');
const markdownitAdaTreeMap = require('./src/plugins/adatreemap');
const markdownitAdaTable = require('./src/plugins/adatable');
const markdownitAdaTable2 = require('./src/plugins/adatable2');
const markdownitAdaSunburst = require('./src/plugins/adasunburst');
const markdownitCenterInfo = require('./src/plugins/cinfo');
const markdownitAdaEmptyLine = require('./src/plugins/emptyline');
const markdownitMermaid = require('./src/plugins/mermaid');

/**
 * registerAllPlugins
 * @param {object} md - markdown-it object
 * @param {object} cfg - config
 */
function registerAllPlugins(md, cfg) {
  md.use(markdownitAdaDataset, cfg.adadataset);
  md.use(markdownitAdaPie, cfg.adapie);
  md.use(markdownitAdaLine, cfg.adaline);
  md.use(markdownitAdaBar, cfg.adabar);
  md.use(markdownitAdaTreeMap, cfg.adatreemap);
  md.use(markdownitAdaTable, cfg.adatable);
  md.use(markdownitAdaTable2, cfg.adatable2);
  md.use(markdownitAdaSunburst, cfg.adasunburst);
  md.use(markdownitMermaid, cfg.adamermaid);
  md.use(markdownitCenterInfo, cfg.cinfo);
  md.use(markdownitAdaEmptyLine, cfg.emptyline);
}

exports.registerAllPlugins = registerAllPlugins;
