'use strict';

const services = require('../../proto/adarender_grpc_pb');
const {
  loadConfig,
  checkConfig,
  isValidToken,
  getTemplate,
} = require('./config');
const {MarkdownStream} = require('./markdownstream');
const {HTMLStream} = require('./htmlstream');
const {exportMarkdown} = require('../export/exportmd');
const {newVFSFromMarkdownData} = require('../vfs');
const {buildHTMLData} = require('./utils');

const grpc = require('grpc');

/**
 * procMarkdownData
 * @param {object} cfg - config
 * @param {object} call - grpc call
 * @param {HTMLStream} htmlstream - HTMLStream
 * @param {object} mddata - adarender.MarkdownData
 */
async function procMarkdownData(cfg, call, htmlstream, mddata) {
  let temp = '{{{html}}}';

  const vfs = newVFSFromMarkdownData(mddata);

  const tempname = mddata.getTemplatename();
  if (tempname) {
    temp = getTemplate(cfg, tempname);
  } else {
    const tempdata = mddata.getTemplatedata();
    if (tempdata) {
      temp = tempdata;
    }
  }

  const mdstr = mddata.getStrdata();
  if (mdstr) {
    const ret = exportMarkdown(mdstr, temp, './', './', vfs);

    if (ret.err) {
      await htmlstream.sendErr(call, ret.err);

      return;
    }

    // vfs.export('./output');

    await htmlstream.sendHTMLData(call, buildHTMLData(vfs, ret.html));

    return;
  }

  await htmlstream.sendErr(call, 'non-data');
}

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
      const mdstream = new MarkdownStream();
      const htmlstream = new HTMLStream();

      call.on('data', async (markdownstream) => {
        // console.log('get data.');

        if (!isValidToken(cfg, markdownstream.getToken())) {
          await htmlstream.sendErr(
              call,
              'invalid token ',
              markdownstream.getToken()
          );

          return;
        }

        const err = mdstream.onData(markdownstream);
        if (err) {
          await htmlstream.sendErr(call, err);

          return;
        }
      });

      call.on('end', async () => {
        // console.log('get end.');

        const err = mdstream.onEnd();
        if (err) {
          await htmlstream.sendErr(call, err);

          return;
        }

        if (mdstream.mdobj) {
          await procMarkdownData(cfg, call, htmlstream, mdstream.mdobj);
        }
      });
    },
  });

  server.bind(cfg.servAddr, grpc.ServerCredentials.createInsecure());

  server.start();
}

exports.startService = startService;
