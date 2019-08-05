const services = require('../../proto/adarender_grpc_pb');
const {renderMarkdown} = require('./clientcore');
const fs = require('fs');

const grpc = require('grpc');

const TOKEN = 'RVhVrt13P6i5xCrL5Fc3GcuHC03kaunA';

/**
 * render
 * @param {string} servAddr - service addr
 * @param {string} mdstr - markdown string
 * @param {string} tempname - template name
 */
function render(servAddr, mdstr, tempname) {
  const client = new services.AdaRenderServiceClient(
      servAddr,
      grpc.credentials.createInsecure()
  );

  renderMarkdown(
      client,
      {strData: mdstr, templateName: tempname},
      TOKEN,
      (err, htmldata) => {
        if (err) {
          console.log('err:', err);
        }

        if (htmldata) {
          console.log('htmldata:', JSON.stringify(htmldata.toObject()));
        }
      }
  );
}

render(
    '127.0.0.1:7052',
    fs.readFileSync('./samples/sample001.md').toString(),
    'default'
);
