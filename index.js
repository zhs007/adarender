'use strict';

// const pluginEncodeImgName = require('../plugins/encode-imgname');
const markdownitAdaDataset = require('./src/plugins/adadataset');
const markdownitAdaPie = require('./src/plugins/adapie');
const markdownitAdaLine = require('./src/plugins/adaline');
const markdownitAdaBar = require('./src/plugins/adabar');
const markdownitAdaTreeMap = require('./src/plugins/adatreemap');
const markdownitAdaTable = require('./src/plugins/adatable');
const markdownitAdaSunburst = require('./src/plugins/adasunburst');

/**
 * registerAllPlugins
 * @param {object} md - markdown-it object
 * @param {object} cfg - config
 */
function registerAllPlugins(md, cfg) {
  md.use(markdownitAdaDataset, {});
  md.use(markdownitAdaPie, {});
  md.use(markdownitAdaLine, {});
  md.use(markdownitAdaBar, {});
  md.use(markdownitAdaTreeMap, {});
  md.use(markdownitAdaTable, {});
  md.use(markdownitAdaSunburst, {});
}

exports.registerAllPlugins = registerAllPlugins;
