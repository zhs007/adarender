'use strict';

const {exportMarkdown} = require('./exportmd');
const fs = require('fs');
const path = require('path');

/**
 * execExportMD
 * @param {object} program - program
 * @param {string} version - version
 */
function execExportMD(program, version) {
  program
      .command('exportmd [markdownfile]')
      .description('export markdown file')
      .option('-i, --inputpath [inputpath]', 'inport path')
      .option('-o, --output [filename]', 'export output file')
      .option('-p, --path [path]', 'export path')
      .option('-t, --template [filename]', 'template file')
      .action(function(markdownfile, options) {
        console.log('version is ', version);

        if (!markdownfile || !options.output || !options.template) {
          console.log(
              'command wrong, please type ' + 'adarender exportmd --help',
          );

          return;
        }

        console.log('markdown file - ', markdownfile);
        console.log('template file - ', options.template);

        const mdstr = fs
            .readFileSync(path.join(options.inputpath, markdownfile))
            .toString();
        console.log(mdstr);

        const tmpstr = fs.readFileSync(options.template).toString();

        const ret = exportMarkdown(
            mdstr,
            tmpstr,
            options.inputpath,
            options.path,
        );

        console.log('--- ' + ret.title + ' ---');
        console.log(ret.html);

        fs.writeFileSync(options.output, ret.html);
      });
}

exports.execExportMD = execExportMD;
