#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const {execExportMD} = require('../src/export/exec');
const {execStartService} = require('../src/service/exec');

const package = JSON.parse(fs.readFileSync('package.json'));
const VERSION = package.version;

program.version(VERSION);

execExportMD(program, VERSION);
execStartService(program, VERSION);

program.parse(process.argv);
