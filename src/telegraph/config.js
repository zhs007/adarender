'use strict';

const yaml = require('js-yaml');
const fs = require('fs');

/**
 * load config
 * @param {string} cfgfile - cfgfile
 * @return {object} cfg - config | error
 */
function loadConfig(cfgfile) {
  const fd = fs.readFileSync(cfgfile);
  if (fd) {
    try {
      const cfg = yaml.load(fd);
      const err = checkConfig(cfg);
      if (err) {
        return err;
      }

      return cfg;
    } catch (err) {
      return err;
    }
  }

  return new Error('telegraph.loadConfig readFileSync no file. ' + cfgfile);
}

/**
 * check config
 * @param {object} cfg - config
 * @return {Error} err - error
 */
function checkConfig(cfg) {
  if (!cfg) {
    return new Error('telegraph.checkConfig cfg undefined');
  }

  if (!cfg.shortname) {
    return new Error('telegraph.checkConfig no config.shortname');
  }

  if (!cfg.authorname) {
    return new Error('telegraph.checkConfig no config.authorname');
  }

  if (!cfg.timeout) {
    cfg.timeout = 30 * 1000;
  }

  if (!cfg.outputpath) {
    cfg.outputpath = './telegraphdata';
  }

  return undefined;
}

exports.loadConfig = loadConfig;
