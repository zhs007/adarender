const {MarkdownStream} = require('./markdownstream');
const {HTMLStream} = require('./htmlstream');

/**
 * renderMarkdown
 * @param {object} client - grpc client
 * @param {object} mddata - object
 * @param {string} token - token
 * @param {function} cb - function (err, htmldata)
 */
function renderMarkdown(client, mddata, token, cb) {
  const mdstream = new MarkdownStream();
  const htmlstream = new HTMLStream();

  const call = client.render();
  call.on('data', (res) => {
    const err = htmlstream.onData(res);
    if (err) {
      cb(err);
    }
  });

  call.on('end', () => {
    const err = htmlstream.onEnd();
    if (err) {
      cb(err);

      return;
    }

    if (htmlstream.err) {
      cb(htmlstream.err);

      return;
    }

    if (htmlstream.htmlobj) {
      cb(undefined, htmlstream.htmlobj);
    }
  });

  call.on('error', (err) => {
    cb(err);
  });

  mdstream.sendMarkdownData(call, mddata, token);
}

exports.renderMarkdown = renderMarkdown;
