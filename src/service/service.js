const services = require('../../proto/adarender_grpc_pb');
const {loadConfig, checkConfig, isValidToken} = require('./config');

const grpc = require('grpc');

/**
 * startService
 * @param {string} cfgfile - config filename
 */
async function startService(cfgfile) {
  const cfg = loadConfig(cfgfile);
  const err = checkConfig(cfg);
  if (err) {
    console.log(err);

    return;
  }

  const server = new grpc.Server();

  server.addService(services.AdaRenderServiceService, {
    render: (call) => {
      if (!isValidToken(cfg, call.request.getToken())) {
        console.log('invalid token', call.request.getToken());

        call.end();

        return;
      }

      // callExportArticle(call);
    },
  });

  server.bind(cfg.servAddr, grpc.ServerCredentials.createInsecure());

  server.start();
}

exports.startService = startService;
