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
const markdownitAdaCommodity = require('./src/plugins/commodity');
const markdownitAdaPNL = require('./src/plugins/pnl');

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
  md.use(markdownitAdaCommodity, cfg.commodity);
  md.use(markdownitAdaPNL, cfg.pnl);
}

const {telegraph} = require('./src/telegraph');

exports.registerAllPlugins = registerAllPlugins;
exports.telegraph = telegraph;

const {csv2pnl} = require('./src/plugins/pnl/csv2pnl');

exports.csv2pnl = csv2pnl;
