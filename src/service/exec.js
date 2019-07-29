const {startService} = require('./service');

/**
 * serviceexec
 * @param {object} program - program
 * @param {string} version - version
 */
async function execStartService(program, version) {
  program
      .command('startservice [cfgfile]')
      .description('start a grpc service')
      .action(function(cfgfile, options) {
        console.log('version is ', version);

        if (!cfgfile) {
          console.log(
              'command wrong, please type ' + 'adarender startservice --help'
          );

          return;
        }

        console.log('cfgfile - ', cfgfile);

        (async () => {
          await startService(cfgfile);
        })().catch((err) => {
          console.log('catch a err ', err);

          if (headless) {
            process.exit(-1);
          }
        });
      });
}

exports.execStartService = execStartService;
