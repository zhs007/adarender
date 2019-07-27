const {exportMarkdown} = require('./exportmd');
const fs = require('fs');

/**
 * execExportMD
 * @param {object} program - program
 * @param {string} version - version
 */
function execExportMD(program, version) {
  program
      .command('exportmd [markdownfile]')
      .description('export markdown file')
      .action(function(markdownfile, options) {
        console.log('version is ', version);

        if (!markdownfile) {
          console.log(
              'command wrong, please type ' + 'adarender exportmd --help'
          );

          return;
        }

        console.log('markdownfile - ', markdownfile);

        const mdstr = fs.readFileSync(markdownfile).toString();
        console.log(mdstr);

        const htmlstr = exportMarkdown(mdstr);

        console.log('---');
        console.log(htmlstr);
      });
}

exports.execExportMD = execExportMD;
