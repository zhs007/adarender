# Ada Render Sample

This is a ``markdown`` file.

``` js
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
      .option('-o, --output [filename]', 'export output file')
      .option('-t, --template [filename]', 'template file')
      .action(function(markdownfile, options) {
        console.log('version is ', version);

        if (!markdownfile || !options.output || !options.template) {
          console.log(
              'command wrong, please type ' + 'adarender exportmd --help'
          );

          return;
        }

        console.log('markdown file - ', markdownfile);
        console.log('template file - ', options.template);

        const mdstr = fs.readFileSync(markdownfile).toString();
        console.log(mdstr);

        const tmpstr = fs.readFileSync(options.template).toString();

        const ret = exportMarkdown(mdstr, tmpstr);

        console.log('--- ' + ret.title + ' ---');
        console.log(ret.html);

        fs.writeFileSync(options.output, ret.html);
      });
}

exports.execExportMD = execExportMD;
```