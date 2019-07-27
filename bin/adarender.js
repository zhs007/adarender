const program = require('commander');
const fs = require('fs');
const {execExportMD} = require('../src/export/exec');

const package = JSON.parse(fs.readFileSync('package.json'));
const VERSION = package.version;

program.version(VERSION);

execExportMD(program, VERSION);

program.parse(process.argv);
