'use strict';

const services = require('../../proto/adarender_grpc_pb');
const {renderMarkdown} = require('./clientcore');
const {buildMarkdownData} = require('./utils');
// const fs = require('fs');

const grpc = require('grpc');

const TOKEN = 'RVhVrt13P6i5xCrL5Fc3GcuHC03kaunA';

/**
 * render
 * @param {string} servAddr - service addr
 * @param {string} inpath - input path
 * @param {string} fn - filename
 * @param {string} tempname - template name
 */
function render(servAddr, inpath, fn, tempname) {
  const client = new services.AdaRenderServiceClient(
      servAddr,
      grpc.credentials.createInsecure(),
  );

  const md = buildMarkdownData(inpath, fn);
  md.templateName = tempname;

  renderMarkdown(client, md, TOKEN, (err, htmldata) => {
    if (err) {
      console.log('err:', err);
    }

    if (htmldata) {
      console.log('htmldata:', JSON.stringify(htmldata.toObject()));
    }
  });
}

render('127.0.0.1:7052', './samples', 'sample001.md', 'default');
